import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { company, name, email, phone, category, message } = body ?? {};

    if (!company || !name || !email || !message) {
      return new Response(JSON.stringify({ error: "필수 항목이 누락되었습니다." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1) Persist
    const { data: inserted, error: dbErr } = await supabase
      .from("contact_submissions")
      .insert({
        company, name, email,
        phone: phone || null,
        category: category || null,
        message,
      })
      .select("id")
      .single();
    if (dbErr) {
      console.error("DB insert error", dbErr);
      return new Response(JSON.stringify({ error: "저장에 실패했습니다." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Send notification email via transactional template
    try {
      const { error: mailErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `contact-${inserted.id}`,
          templateData: { company, name, email, phone: phone || "", category: category || "", message },
        },
      });
      if (mailErr) console.warn("Email enqueue failed:", mailErr);
    } catch (e) {
      console.warn("Email send error:", e);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "서버 오류" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
