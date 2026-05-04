import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

const ProductCategories = () => {
  return (
    <section id="products" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Product Categories · 취급 소재
              </span>
            </div>
            <h2 className="text-balance text-4xl font-medium leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
              NANOKOREA <span className="text-ink-soft">취급 소재</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            카테고리를 선택하면 해당 제품 목록을 확인할 수 있습니다. 글로벌 첨단소재
            제조사의 정식 파트너로서 검증된 원료를 안정적으로 공급합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.key}
              to={`/products/${c.key}`}
              className="group relative flex min-h-[260px] flex-col justify-between bg-background p-8 transition-colors duration-500 hover:bg-ink"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                  {c.en}
                </div>
                <h3 className="mb-3 text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-white">
                  {c.kr}
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-ink transition-colors group-hover:text-accent">
                    {String(c.items.length).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground transition-colors group-hover:text-white/40">
                    products
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/products"
            className="group relative flex min-h-[260px] flex-col justify-between gradient-prism p-8 transition-all hover:opacity-90"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs font-semibold tracking-widest text-ink/70">
                ALL
              </span>
              <ArrowUpRight className="h-5 w-5 text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <div>
              <h3 className="mb-3 text-3xl font-semibold tracking-tight text-ink">
                전체 제품<br />보기
              </h3>
              <p className="text-sm text-ink/70">
                ※ 파트너사 전 제품 공급 가능 — 목록에 없는 소재도 문의해 주세요.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
