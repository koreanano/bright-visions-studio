import partnershipImg from "@/assets/partnership-trust.jpg";

const StatsBand = () => {
  return (
    <section className="relative bg-ink py-20 lg:py-24">
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 lg:px-12">
        <div className="overflow-hidden">
          <img
            src={partnershipImg}
            alt="나노코리아 신뢰 기반 비즈니스 파트너십"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1280}
            height={1024}
          />
        </div>

        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
            About · 회사 소개
          </div>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl">
            신뢰로 잇는<br />안정적인 비즈니스 파트너
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            NANOKOREA는 글로벌 첨단소재 공급 파트너로서, 검증된 품질과 안정적인
            공급망을 바탕으로 고객과 함께 성장하는 신뢰받는 기업을 지향합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
