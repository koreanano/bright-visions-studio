import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT = "cscomm@naver.com";

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
    const { error: dbErr } = await supabase.from("contact_submissions").insert({
      company, name, email,
      phone: phone || null,
      category: category || null,
      message,
    });
    if (dbErr) {
      console.error("DB insert error", dbErr);
      return new Response(JSON.stringify({ error: "저장에 실패했습니다." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Try email via Lovable transactional email (if email domain configured)
    try {
      const html = `
<h2>새로운 문의가 접수되었습니다</h2>
<table style="border-collapse:collapse">
  <tr><td><b>회사명</b></td><td>${escapeHtml(company)}</td></tr>
  <tr><td><b>담당자</b></td><td>${escapeHtml(name)}</td></tr>
  <tr><td><b>이메일</b></td><td>${escapeHtml(email)}</td></tr>
  <tr><td><b>연락처</b></td><td>${escapeHtml(phone || "-")}</td></tr>
  <tr><td><b>관심 카테고리</b></td><td>${escapeHtml(category || "-")}</td></tr>
</table>
<h3>문의 내용</h3>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          to: RECIPIENT,
          subject: `[NANOKOREA 문의] ${company} - ${name}`,
          html,
          purpose: "transactional",
          idempotency_key: crypto.randomUUID(),
          reply_to: email,
        },
      });
    } catch (e) {
      console.warn("Email send skipped or failed (domain may not be configured):", e);
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

function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
