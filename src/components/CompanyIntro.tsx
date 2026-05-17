import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import networkImg from "@/assets/global-network.jpg";

const statements = [
  "축적된 경험으로 공급의 기준을 새롭게 만듭니다.",
  "전문성과 신뢰로 산업의 한계를 극복합니다.",
  "안정적인 원료 공급, 검증된 전문성으로 완성합니다.",
  "기술과 시장을 연결하는 글로벌 파트너.",
  "데이터와 경험으로 최적의 공급망을 구축합니다.",
  "품질 중심의 공급 전략으로 경쟁력을 만듭니다.",
  "고객 맞춤형 공급 솔루션의 새로운 기준.",
];

const CompanyIntro = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-6 md:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={networkImg}
            alt="글로벌 공급 네트워크"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
            축적된 경험으로<br />공급의 기준을 새롭게 만듭니다.
          </h2>

          <ul className="mt-8 grid grid-cols-1 gap-3">
            {statements.slice(1).map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-ink/80 md:text-base"
              >
                {s}
              </li>
            ))}
          </ul>

          <Link
            to="/about#top"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent hover:text-ink"
          >
            회사소개서 바로보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
