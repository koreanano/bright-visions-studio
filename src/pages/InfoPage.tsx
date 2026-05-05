import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

type Kind = "about" | "service" | "faq";

const CONTENT: Record<Kind, { eyebrow: string; title: string; intro: string; sections: { h: string; b: React.ReactNode }[] }> = {
  about: {
    eyebrow: "About · 회사소개",
    title: "NANOKOREA — 첨단소재공급기업",
    intro:
      "나노코리아는 글로벌 첨단소재 제조사의 정식 파트너로서, 반도체·디스플레이·항공우주·세라믹 산업에 검증된 고순도 소재를 안정적으로 공급하는 B2B 전문 기업입니다.",
    sections: [
      { h: "비전", b: "정밀 제어된 소재로 한국 첨단 산업의 신뢰할 수 있는 공급 파트너가 되겠습니다." },
      { h: "사업 영역", b: "용융석영·규석, 희토류, 지르코니아, 알루미나, 탄화물·질화물, 고순도 금속, 나노소재, 기타 첨단 소재 등 8개 카테고리의 전 라인업을 공급합니다." },
      { h: "본사", b: "경기도 화성시 남양읍 수작이길 55, 2층 (주식회사 디솔루션)" },
      { h: "중국 사무소", b: "江苏徐州新沂经济开发区北京西路89号" },
    ],
  },
  service: {
    eyebrow: "Service · 서비스",
    title: "Tech Support + Reference Access",
    intro: "단순 공급을 넘어 소재 선정·사양 검토·맞춤 가공·레퍼런스 자료까지 — 실무에 필요한 전 과정을 지원합니다.",
    sections: [
      { h: "맞춤 입도 주문 제작", b: "고객이 요구하는 순도(99~99.9%)와 입도 사양에 맞춰 천연 규석 및 첨단 소재를 주문 제작 공급합니다." },
      { h: "엔지니어 기술지원", b: "용도·공정에 적합한 소재 선정 컨설팅과 샘플 평가, 적용 후 트러블슈팅까지 전담 엔지니어가 지원합니다." },
      { h: "레퍼런스 자료 제공", b: "산업별 실제 적용 사례, 사양서(TDS), MSDS 등 의사결정에 필요한 자료를 제공합니다." },
      { h: "안정적인 공급망", b: "광산 직영 운영과 글로벌 정식 파트너십을 통해 장기 공급의 안정성을 보장합니다." },
    ],
  },
  faq: {
    eyebrow: "FAQ · 자주 묻는 질문",
    title: "자주 묻는 질문",
    intro: "고객이 자주 문의하시는 내용을 정리했습니다. 더 궁금한 점은 언제든 문의해 주세요.",
    sections: [
      { h: "Q. 최소 주문 수량(MOQ)이 있나요?", b: "소재와 사양에 따라 상이합니다. 샘플 단위부터 톤 단위 대량 공급까지 가능하니 문의해 주세요." },
      { h: "Q. 목록에 없는 소재도 공급 가능한가요?", b: "네, 파트너사 전 제품 라인 공급이 가능합니다. 필요 소재명·사양을 알려주시면 견적을 회신 드립니다." },
      { h: "Q. 샘플 요청은 어떻게 하나요?", b: "문의하기 폼에서 회사·담당자·필요 소재·사양을 기재해 주시면 담당자가 빠르게 회신 드립니다." },
      { h: "Q. 납기는 얼마나 걸리나요?", b: "재고 보유 품목은 1~3일, 주문 제작 품목은 사양에 따라 2~6주가 소요됩니다." },
      { h: "Q. 해외 배송도 가능한가요?", b: "한국·중국 거점을 통해 글로벌 공급이 가능합니다." },
    ],
  },
};

const InfoPage = ({ kind }: { kind: Kind }) => {
  const c = CONTENT[kind];
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {c.eyebrow}
          </div>
          <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">{c.intro}</p>

          <div className="mt-12 space-y-8">
            {c.sections.map((s, i) => (
              <div key={i} className="border-t border-border pt-6">
                <h2 className="mb-3 text-xl font-semibold text-ink">{s.h}</h2>
                <div className="text-base leading-relaxed text-ink/75">{s.b}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border border-border bg-muted/40 p-7 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Inquiry</div>
              <h3 className="mt-1 text-lg font-medium text-ink">제품·견적·기술 문의를 환영합니다</h3>
            </div>
            <Link to="/#contact" className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-accent">
              문의하기
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default InfoPage;
