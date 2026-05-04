import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { CATEGORIES } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  company: z.string().trim().min(1, "회사명을 입력해 주세요").max(100),
  name: z.string().trim().min(1, "담당자명을 입력해 주세요").max(50),
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  category: z.string().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "문의 내용을 입력해 주세요").max(2000),
});

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({ title: "입력 확인", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact", {
        body: parsed.data,
      });
      if (error) throw error;
      setDone(true);
      toast({ title: "문의가 접수되었습니다", description: "담당자가 빠른 시일 내에 연락드리겠습니다." });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({
        title: "전송 실패",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-muted/40 py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Contact · 문의하기
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="text-balance text-4xl font-medium leading-[1.1] tracking-tight text-ink md:text-5xl">
            제품 문의를 <span className="gradient-text-prism">남겨주세요</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            제품 사양·견적·샘플 요청 등 어떤 문의든 환영합니다. 담당자가 신속하게 답변드립니다.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 border border-border bg-background p-8 md:grid-cols-2 md:p-10">
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">회사명 *</label>
            <input name="company" required maxLength={100} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">담당자명 *</label>
            <input name="name" required maxLength={50} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">이메일 *</label>
            <input name="email" type="email" required maxLength={255} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">연락처</label>
            <input name="phone" maxLength={30} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">관심 제품 카테고리</label>
            <select name="category" className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none">
              <option value="">선택해 주세요</option>
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.kr}>{c.kr} ({c.en})</option>
              ))}
              <option value="전체 제품 라인 문의">전체 제품 라인 문의</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">문의 내용 *</label>
            <textarea name="message" required maxLength={2000} rows={6} className="w-full resize-none border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "전송 중..." : "문의 보내기"}
            </button>
            {done && (
              <p className="mt-4 text-center text-sm text-accent">
                ✅ 문의가 접수되었습니다! 담당자가 빠른 시일 내에 연락드리겠습니다.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
