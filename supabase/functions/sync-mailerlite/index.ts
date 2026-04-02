import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SyncRequest {
  email: string;
  nome: string;
  source: string; // "newsletter" | "contato" | "curso_gestao" | "curso_pics"
  fields?: Record<string, string>;
  group_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAILERLITE_API_TOKEN = Deno.env.get("MAILERLITE_API_TOKEN");
    if (!MAILERLITE_API_TOKEN) {
      throw new Error("MAILERLITE_API_TOKEN not configured");
    }

    const body: SyncRequest = await req.json();
    const { email, nome, source, fields, group_id } = body;

    if (!email || !nome || !source) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, nome, source" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build MailerLite subscriber payload
    const subscriberPayload: Record<string, unknown> = {
      email,
      fields: {
        name: nome,
        last_name: "",
        ...(fields?.status_funil ? { status_funil: fields.status_funil } : {}),
        ...Object.fromEntries(Object.entries(fields || {}).filter(([k]) => k !== "status_funil")),
      },
      groups: group_id ? [group_id] : [],
    };

    // Create/update subscriber in MailerLite
    const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
      },
      body: JSON.stringify(subscriberPayload),
    });

    const mlData = await mlResponse.json();

    if (!mlResponse.ok) {
      console.error("MailerLite API error:", JSON.stringify(mlData));
      return new Response(
        JSON.stringify({ error: "MailerLite sync failed", details: mlData }),
        { status: mlResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`MailerLite sync OK: ${email} [source=${source}]`);

    return new Response(
      JSON.stringify({ success: true, subscriber_id: mlData.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("sync-mailerlite error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
