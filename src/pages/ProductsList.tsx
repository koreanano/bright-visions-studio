import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { CATEGORIES, getCategory, slugify } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const ProductsList = () => {
  const { categoryKey } = useParams();
  const category = categoryKey ? getCategory(categoryKey) : null;

  const items = category
    ? category.items.map((p) => ({ ...p, _cat: category }))
    : CATEGORIES.flatMap((c) => c.items.map((p) => ({ ...p, _cat: c })));

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CategoryNav />

      <section className="pt-10 pb-8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {category ? category.en : "All Products"}
            </span>
            <h1 className="text-balance text-3xl font-medium tracking-tight text-ink md:text-4xl">
              {category ? category.kr : "전체 제품"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              총 {items.length}개 제품 · 파트너사 전 제품 공급 가능 — 목록에 없는 소재도 문의해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {items.map((p, i) => {
              const cat = (p as any)._cat;
              const img = getProductImage(p.name);
              return (
                <Link
                  key={`${cat.key}-${i}-${p.name}`}
                  to={`/products/${cat.key}/${slugify(p.name)}`}
                  className="group flex overflow-hidden border border-border bg-background transition-all hover:border-accent hover:shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
                >
                  {/* Left: text */}
                  <div className="flex w-1/2 flex-col p-5">
                    <span className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                      {cat.kr}
                    </span>
                    <h3 className="mb-1.5 text-base font-semibold leading-snug text-ink">
                      {p.name}
                    </h3>
                    <div className="mb-3 font-mono text-xs text-muted-foreground">{p.formula}</div>
                    <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-ink/70">
                      {p.desc}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="bg-muted px-2 py-0.5 text-[10px] font-medium text-accent"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                  </div>
                  {/* Right: image (half) */}
                  <div className="relative w-1/2 overflow-hidden bg-white">
                    {img ? (
                      <img
                        src={img}
                        alt={p.name}
                        loading="lazy"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                        {p.formula}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductsList;
