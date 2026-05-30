import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";
import aboutGlobal from "@/assets/global-network.jpg";


type Kind = "about" | "service" | "faq";

const SERVICE = {
  eyebrow: "Service · 서비스",
  title: "Tech Support + Reference Access",
  intro:
    "단순 공급을 넘어 소재 선정·사양 검토·맞춤 가공·레퍼런스 자료까지 — 실무에 필요한 전 과정을 지원합니다.",
  sections: [
    { h: "맞춤 입도 주문 제작", b: "고객이 요구하는 순도(99~99.9%)와 입도 사양에 맞춰 천연 규석 및 첨단 소재를 주문 제작 공급합니다." },
    { h: "엔지니어 기술지원", b: "용도·공정에 적합한 소재 선정 컨설팅과 샘플 평가, 적용 후 트러블슈팅까지 전담 엔지니어가 지원합니다." },
    { h: "레퍼런스 자료 제공", b: "산업별 실제 적용 사례, 사양서(TDS), MSDS 등 의사결정에 필요한 자료를 제공합니다." },
    { h: "안정적인 공급망", b: "광산 직영 운영과 글로벌 협력 네트워크를 통해 장기 공급의 안정성을 보장합니다." },
  ],
};

const FAQ = {
  eyebrow: "FAQ · 자주 묻는 질문",
  title: "자주 묻는 질문",
  intro: "고객이 자주 문의하시는 내용을 정리했습니다. 더 궁금한 점은 언제든 편하게 문의해 주세요.",
  sections: [
    {
      h: "Q. 목록에 없는 제품도 공급 가능한가요?",
      b: "네, 문의하여 주십시오. 공급 여부에 따라 소재의 동향에 대해서도 상담이 가능하며, 적절한 의견을 전달해 드리겠습니다.",
    },
    {
      h: "Q. 최소 주문 수량(MOQ)이 있나요?",
      b: "제품마다 기본 포장 단위가 있습니다 (예: 10kg · 25kg · 1ton 등). 다만 연구 목적 등 특수한 경우에는 유연하게 대응해 드리고 있습니다.",
    },
    {
      h: "Q. 샘플 제공이 가능한가요?",
      b: "자체 보유 재고 또는 현지 생산 재고가 있는 품목은 대부분 소량 샘플 제공이 가능합니다.",
    },
    {
      h: "Q. 제품의 품질은 어떻게 보증하나요?",
      b: "제품을 생산하는 제조사는 대부분 품질경영시스템 인증을 받은 기업이거나 해당 분야에서 이미 검증된 기업입니다. 또한 투명한 생산 공정을 거쳐 발급된 QC 성적서를 기본으로 품질을 보증합니다.",
    },
    {
      h: "Q. 납기는 얼마나 걸리나요?",
      b: "수량과 운송 방법에 따라 다소 차이가 있습니다. 재고 보유 품목은 물류 방식에 따라 약 5~15일이 소요되며, 별도 생산이 필요한 경우 수량에 따라 4~6주가 소요됩니다.",
    },
    {
      h: "Q. 자료에 의하면 여기에 이 제품이 필요하다고 하는데 맞나요?",
      b: "적용 사례나 실제 구현된 사례를 통하여 기술자문을 확보할 수 있습니다.",
    },
  ],
};

const InquiryCTA = () => (
  <div className="mt-16 flex flex-col items-start justify-between gap-4 border border-border bg-muted/40 p-7 md:flex-row md:items-center">
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-ink">Inquiry</div>
      <h3 className="mt-1 text-lg font-medium text-ink">제품·견적·기술 문의를 환영합니다</h3>
    </div>
    <Link to="/#contact" className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-accent">
      문의하기
    </Link>
  </div>
);

const AboutPage = () => (
  <>
    {/* Hero */}
    <section className="relative h-[60vh] min-h-[440px] w-full overflow-hidden">
      <img
        src={aboutHero}
        alt="나노코리아 첨단소재 연구 환경"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-end px-6 pb-16 lg:px-12">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">
          About · 회사소개
        </div>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
          신뢰를 기반으로 <br className="hidden md:block" />
          한국 산업의 공급망을 잇습니다.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          NANOKOREA — 글로벌 첨단소재 공급 파트너
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink">
            Our Story
          </div>
          <h2 className="mt-3 text-3xl font-medium leading-tight text-ink md:text-4xl">
            구조적 한계를<br />안정적인 공급망으로 극복합니다.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-ink/75 lg:col-span-8 lg:text-lg">
          <p>
            나노코리아는 반도체·디스플레이·이차전지 산업에 필요한 고순도 첨단 무기소재를 공급하는 전문 기업입니다.
          </p>
          <p>
            국내 산업 환경의 구조적 한계와 제한적인 자원 공급 문제를 해결하기 위해, 글로벌 소재 기업들과의 협력 기반 공급망을 구축해 왔으며, 안정적인 원료 수급과 품질 중심의 공급 체계를 바탕으로 고객의 다양한 산업 요구에 대응하고 있습니다.
          </p>
          <p>
            또한 축적된 시장 경험과 지속적인 정보 수집을 기반으로 변화하는 글로벌 시장에 유연하게 대응하며, 단순한 거래를 넘어 신뢰를 기반으로 한 장기적인 파트너십을 지향합니다.
          </p>
          <p>
            나노코리아는 앞으로도 지속적인 시장 조사와 글로벌 네트워크 확장을 통해 경쟁력 있는 소재 공급 체계를 구축하고, 고객과 함께 성장하는 신뢰받는 공급 파트너가 되겠습니다.
          </p>
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="border-y border-border bg-muted/40 py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink">
            Our Values
          </div>
          <h2 className="mt-3 text-3xl font-medium leading-tight text-ink md:text-4xl">
            세 가지 약속
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {[
            {
              n: "01",
              h: "신뢰 기반 파트너십",
              b: "단순한 거래를 넘어 장기적 신뢰 관계를 통해 안정적인 협력 구조를 구축합니다.",
            },
            {
              n: "02",
              h: "품질과 안정성 우선",
              b: "글로벌 소재 기업과의 긴밀한 협력으로 검증된 원료만을 공급합니다.",
            },
            {
              n: "03",
              h: "유연한 고객 대응",
              b: "끊임없는 시장 조사와 축적된 경험으로 고객의 다양한 요구에 유연하게 대응합니다.",
            },
          ].map((p) => (
            <div key={p.n} className="flex flex-col gap-4 bg-background p-8 md:p-10">
              <div className="text-xs font-semibold tracking-[0.2em] text-ink">{p.n}</div>
              <h3 className="text-xl font-semibold text-ink">{p.h}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Global */}
    <section className="py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <div className="overflow-hidden">
          <img
            src={aboutGlobal}
            alt="나노코리아 글로벌 공급 네트워크"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink">
            Global Network
          </div>
          <h2 className="mt-3 text-3xl font-medium leading-tight text-ink md:text-4xl">
            한국과 중국 거점을 통한<br />글로벌 공급망
          </h2>
          <div className="mt-8 space-y-5">
            <div className="border-l-2 border-accent pl-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Headquarters</div>
              <div className="mt-1 text-base text-ink">경기도 화성시 남양읍 화성로 1196</div>
              <div className="text-sm text-muted-foreground">주식회사 디솔루션</div>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">China Office</div>
              <div className="mt-1 text-base text-ink">江苏徐州新沂经济开发区北京西路89号</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="pb-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <InquiryCTA />
      </div>
    </section>
  </>
);

const SEO_MAP: Record<Kind, { title: string; description: string; path: string }> = {
  about: {
    title: "회사소개 | 나노코리아",
    description: "나노코리아는 첨단 나노소재 및 무기화합물을 전문으로 공급하는 B2B 기업입니다.",
    path: "/about",
  },
  service: {
    title: "서비스 안내 | 나노코리아",
    description: "맞춤 입도 주문 제작, 엔지니어 기술지원, 레퍼런스 자료 제공 등 나노코리아의 전문 서비스 안내.",
    path: "/service",
  },
  faq: {
    title: "자주 묻는 질문 (FAQ) | 나노코리아",
    description: "나노코리아 제품 및 서비스에 관한 자주 묻는 질문과 답변입니다.",
    path: "/faq",
  },
};

const InfoPage = ({ kind }: { kind: Kind }) => {
  const seo = SEO_MAP[kind];
  if (kind === "about") {
    return (
      <main className="min-h-screen bg-background">
        <SEO title={seo.title} description={seo.description} path={seo.path} />
        <Navigation />
        <AboutPage />
        <Footer />
      </main>
    );
  }
  const c = kind === "service" ? SERVICE : FAQ;
  return (
    <main className="min-h-screen bg-background">
      <SEO title={seo.title} description={seo.description} path={seo.path} />
      <Navigation />
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink">
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

          <InquiryCTA />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default InfoPage;
