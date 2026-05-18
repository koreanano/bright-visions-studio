import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import networkImg from "@/assets/about-global.jpg";

const statements = [
  "전문성과 신뢰로 산업의 한계를 극복합니다.",
  "안정적인 원료 공급, 검증된 전문성으로 완성합니다.",
  "기술과 시장을 연결하는 글로벌 파트너.",
  "데이터와 경험으로 최적의 공급망을 구축합니다.",
  "품질 중심의 공급 전략으로 경쟁력을 만듭니다.",
  "고객 맞춤형 공급 솔루션의 새로운 기준.",
];

const CompanyIntro = () => {
  return (
    <section className="bg-background py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="text-xs font-semibold tracking-[0.3em] text-ink/60 md:text-sm">
            ABOUT US
          </div>
          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            축적된 경험으로<br />공급의 기준을 새롭게 만듭니다.
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-5 md:gap-10 lg:gap-12">
          {/* Image side */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={networkImg}
                alt="글로벌 공급 네트워크"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <Link
              to="/about#top"
              className="inline-flex w-full items-center justify-between gap-2 rounded-2xl bg-ink px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent hover:text-ink"
            >
              회사소개서 바로보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Statements side */}
          <ul className="md:col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {statements.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-border bg-muted/40 px-5 py-5 text-sm leading-relaxed text-ink/80 md:text-base"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
