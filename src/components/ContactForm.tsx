import { useState } from "react";
import { Building2, Mail } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { CATEGORIES } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import contactBg from "@/assets/contact-bg.jpg";

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
      const { data: resp, error } = await supabase.functions.invoke("send-contact", {
        body: {
          company: parsed.data.company,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          category: parsed.data.category || "",
          message: parsed.data.message,
        },
      });
      if (error || (resp && (resp as any).error)) throw new Error("send failed");
      setDone(true);
      toast({ title: "문의가 접수되었습니다", description: "담당자가 빠른 시일 내에 연락드리겠습니다." });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({ title: "전송 실패", description: "잠시 후 다시 시도해 주세요.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-24 lg:py-32"
      style={{
        backgroundImage: `linear-gradient(rgba(7,17,33,0.88), rgba(7,17,33,0.92)), url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* LEFT — info */}
        <div className="text-white">
          <div className="mb-4 text-sm font-semibold tracking-wider text-ink">
            문의하기 / CONTACT
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
            프로젝트의 시작과 끝을<br />함께 합니다.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            제품 사양·견적·샘플 요청 등 어떤 문의든 환영합니다.
            담당자가 신속하게 답변드립니다.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border-t border-white/10 pt-6">
              <div className="mb-3 text-xs font-semibold tracking-widest text-white/50">
                주소 및 연락처
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center bg-accent/15 text-ink">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">NANOKOREA (나노코리아)</div>
                  <div className="mt-1 text-sm text-white/70">경기도 화성시 남양읍 화성로 1196</div>
                  <div className="text-sm text-white/70">주식회사 디솔루션</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="mb-3 text-xs font-semibold tracking-widest text-white/50">
                이메일 / EMAIL
              </div>
              <a href="mailto:info@nano-korea.co.kr" className="flex items-start gap-4 group">
                <div className="grid h-11 w-11 shrink-0 place-items-center bg-accent/15 text-ink">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                    info@nano-korea.co.kr
                  </div>
                  <div className="mt-1 text-sm text-white/70">클릭하시면 바로 메일을 보낼 수 있습니다</div>
                </div>
              </a>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="mb-3 text-xs font-semibold tracking-widest text-white/50">
                중국 주소 (CHINA)
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center bg-accent/15 text-xs font-bold text-ink">
                  CN
                </div>
                <div>
                  <div className="text-sm text-white/80">
                    公司地址：江苏徐州新沂经济开发区北京西路89号
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form card */}
        <div className="rounded-3xl bg-background p-7 shadow-2xl md:p-10">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="회사명 *">
              <input name="company" required maxLength={100} placeholder="(주)회사명" className={inputCls} />
            </Field>
            <Field label="담당자명 *">
              <input name="name" required maxLength={50} placeholder="홍길동" className={inputCls} />
            </Field>
            <Field label="이메일 *">
              <input name="email" type="email" required maxLength={255} placeholder="example@company.com" className={inputCls} />
            </Field>
            <Field label="연락처">
              <input name="phone" maxLength={30} placeholder="010-0000-0000" className={inputCls} />
            </Field>
            <Field label="관심 제품 카테고리" full>
              <select name="category" className={inputCls} defaultValue="">
                <option value="">선택해 주세요</option>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.kr}>{c.kr} ({c.en})</option>
                ))}
                <option value="전체 제품 라인 문의">전체 제품 라인 문의</option>
              </select>
            </Field>
            <Field label="문의 내용 *" full>
              <textarea
                name="message"
                required
                maxLength={2000}
                rows={6}
                placeholder="필요 제품명, 수량, 용도, 요구 사양 등을 기재해 주시면 보다 정확한 답변을 드릴 수 있습니다."
                className={`${inputCls} resize-none`}
              />
            </Field>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold tracking-wider text-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                <Mail className="h-4 w-4" />
                {loading ? "전송 중..." : "문의 보내기"}
              </button>
              {done && (
                <p className="mt-4 text-center text-sm text-ink">
                  ✅ 문의가 접수되었습니다! 담당자가 빠른 시일 내에 연락드리겠습니다.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const inputCls =
  "w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground focus:border-accent focus:bg-background focus:outline-none";

const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
    {children}
  </div>
);

export default ContactForm;
