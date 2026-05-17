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
      const invokeKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const resp = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${invokeKey}`,
          "apikey": invokeKey,
        },
        body: JSON.stringify({
          templateName: "contact-notification",
          idempotencyKey: `contact-${inserted.id}`,
          templateData: { company, name, email, phone: phone || "", category: category || "", message },
        }),
      });
      if (!resp.ok) {
        const t = await resp.text();
        console.warn("Email enqueue failed:", resp.status, t);
      }
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
