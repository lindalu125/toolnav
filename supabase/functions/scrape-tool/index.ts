
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ScrapeRequest {
  url: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { url }: ScrapeRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // 创建抓取任务
    const { data: task, error: taskError } = await supabase
      .from('scrape_tasks')
      .insert([{ url, status: 'running' }])
      .select()
      .single();

    if (taskError) throw taskError;

    try {
      // 抓取网页内容
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ToolScraper/1.0)'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      // 简单的HTML解析提取元数据
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
      const iconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/i);
      
      const result = {
        title: titleMatch ? titleMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : '',
        favicon: iconMatch ? iconMatch[1] : '',
        url: url,
        scraped_at: new Date().toISOString()
      };

      // 更新任务状态
      await supabase
        .from('scrape_tasks')
        .update({
          status: 'completed',
          result: result,
          completed_at: new Date().toISOString()
        })
        .eq('id', task.id);

      console.log('Scraping completed:', result);

      return new Response(
        JSON.stringify({ task_id: task.id, result }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );

    } catch (scrapeError) {
      // 更新任务为失败状态
      await supabase
        .from('scrape_tasks')
        .update({
          status: 'failed',
          error_message: scrapeError instanceof Error ? scrapeError.message : String(scrapeError),
          completed_at: new Date().toISOString()
        })
        .eq('id', task.id);

      throw scrapeError;
    }

  } catch (error: any) {
    console.error("Error in scrape-tool function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
