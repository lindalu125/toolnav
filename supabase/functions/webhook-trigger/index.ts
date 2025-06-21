
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  event: string;
  data: any;
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

    const { event, data }: WebhookPayload = await req.json();

    // 获取活跃的webhook配置
    const { data: webhooks, error } = await supabase
      .from('webhooks')
      .select('*')
      .eq('is_active', true)
      .contains('events', [event]);

    if (error) throw error;

    const results = [];

    for (const webhook of webhooks || []) {
      try {
        const payload = {
          event,
          data,
          timestamp: new Date().toISOString(),
          webhook_id: webhook.id
        };

        // 如果配置了secret，生成签名
        let headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'User-Agent': 'ToolSite-Webhook/1.0'
        };

        if (webhook.secret) {
          const encoder = new TextEncoder();
          const keyData = encoder.encode(webhook.secret);
          const messageData = encoder.encode(JSON.stringify(payload));
          
          const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
          );
          
          const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
          const signatureHex = Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
          
          headers['X-Webhook-Signature'] = `sha256=${signatureHex}`;
        }

        const response = await fetch(webhook.url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        results.push({
          webhook_id: webhook.id,
          webhook_name: webhook.name,
          status: response.status,
          success: response.ok
        });

        console.log(`Webhook ${webhook.name} called:`, response.status);

      } catch (webhookError) {
        console.error(`Error calling webhook ${webhook.name}:`, webhookError);
        results.push({
          webhook_id: webhook.id,
          webhook_name: webhook.name,
          error: webhookError instanceof Error ? webhookError.message : String(webhookError),
          success: false
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        event,
        webhooks_triggered: results.length,
        results 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in webhook-trigger function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
