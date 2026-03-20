import { supabase } from "@/integrations/supabase/client";

const NEWSLETTER_GROUP_ID = "181769184201409927";

interface SyncParams {
  email: string;
  nome: string;
  source: "newsletter" | "contato" | "curso_gestao" | "curso_pics";
  fields?: Record<string, string>;
}

export async function syncToMailerLite({ email, nome, source, fields }: SyncParams) {
  try {
    const group_id = source === "newsletter" ? NEWSLETTER_GROUP_ID : undefined;

    await supabase.functions.invoke("sync-mailerlite", {
      body: { email, nome, source, fields, group_id },
    });
  } catch (err) {
    // Fire-and-forget: don't block the main form flow
    console.error("MailerLite sync error:", err);
  }
}
