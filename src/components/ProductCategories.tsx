import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, type CategoryKey } from "@/data/products";
import imgQuartz from "@/assets/cat-quartz.jpg";
import imgRareearth from "@/assets/cat-rareearth.jpg";
import imgZirconia from "@/assets/cat-zirconia.jpg";
import imgAlumina from "@/assets/cat-alumina.jpg";
import imgCarbide from "@/assets/cat-carbide.jpg";
import imgMetal from "@/assets/cat-metal.jpg";
import imgNano from "@/assets/cat-nano.jpg";
import imgOthers from "@/assets/cat-others.jpg";

const CAT_IMG: Record<CategoryKey, string> = {
  quartz: imgQuartz,
  rareearth: imgRareearth,
  zirconia: imgZirconia,
  alumina: imgAlumina,
  carbide: imgCarbide,
  metal: imgMetal,
  nano: imgNano,
  others: imgOthers,
};

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.key}
              to={`/products/${c.key}`}
              className="group flex flex-col overflow-hidden border border-border bg-background transition-all duration-300 hover:border-accent hover:shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src={CAT_IMG[c.key]}
                  alt={`${c.kr} ${c.en}`}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 bg-background/85 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-ink backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {c.en}
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-ink">
                  {c.kr}
                </h3>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold text-ink">
                      {String(c.items.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground">products</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/products"
            className="group flex min-h-[260px] flex-col justify-between gradient-prism p-8 transition-all hover:opacity-90"
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
