
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ToolInfo {
  title: string;
  description: string;
  favicon: string;
  screenshots?: string[];
  features?: string[];
  pricing?: string;
  category?: string;
}

function extractMetadata(html: string): ToolInfo {
  // Create a simple HTML parser using regex patterns
  const titleMatch = html.match(/<title[^>]*>([^<]+)</i) || 
                    html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i) ||
                    html.match(/<h1[^>]*>([^<]+)</i);
  
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) ||
                   html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i);
  
  const faviconMatch = html.match(/<link[^>]*rel="icon"[^>]*href="([^"]+)"/i) ||
                      html.match(/<link[^>]*rel="shortcut icon"[^>]*href="([^"]+)"/i);
  
  const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
  
  // Extract features from common patterns
  const features: string[] = [];
  const featurePatterns = [
    /<li[^>]*>([^<]{10,100})</g,
    /<div[^>]*class="[^"]*feature[^"]*"[^>]*>([^<]{10,100})</g,
    /<p[^>]*class="[^"]*benefit[^"]*"[^>]*>([^<]{10,100})</g
  ];
  
  featurePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null && features.length < 5) {
      const text = match[1].trim().replace(/\s+/g, ' ');
      if (text.length >= 10 && text.length <= 100 && !features.includes(text)) {
        features.push(text);
      }
    }
  });

  return {
    title: titleMatch?.[1]?.trim() || '',
    description: descMatch?.[1]?.trim() || '',
    favicon: faviconMatch?.[1] || '',
    screenshots: ogImageMatch?.[1] ? [ogImageMatch[1]] : [],
    features: features.slice(0, 5),
  };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping URL:', url);

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const toolInfo = extractMetadata(html);

    console.log('Extracted tool info:', toolInfo);

    return new Response(
      JSON.stringify({ success: true, data: toolInfo }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scraping tool:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
