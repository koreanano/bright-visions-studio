import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

type State = "loading" | "valid" | "already" | "invalid" | "done" | "error" | "submitting";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) return setState("invalid");
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) return setState("error");
      if ((data as any)?.success) setState("done");
      else if ((data as any)?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-foreground">이메일 수신 거부</h1>
        <div className="mt-6 text-sm text-muted-foreground">
          {state === "loading" && "확인 중..."}
          {state === "valid" && "아래 버튼을 클릭하면 향후 알림 이메일 수신이 중단됩니다."}
          {state === "submitting" && "처리 중..."}
          {state === "done" && "✅ 수신 거부가 완료되었습니다."}
          {state === "already" && "이미 수신 거부 처리된 이메일입니다."}
          {state === "invalid" && "유효하지 않거나 만료된 링크입니다."}
          {state === "error" && "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
        </div>
        {state === "valid" && (
          <button
            onClick={confirm}
            className="mt-6 w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-ink hover:bg-accent/90"
          >
            수신 거부 확인
          </button>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
