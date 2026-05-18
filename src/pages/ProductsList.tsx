import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { CATEGORIES, getCategory, slugify } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const ProductsList = () => {
  const { categoryKey } = useParams();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();
  const category = categoryKey ? getCategory(categoryKey) : null;

  const base = category
    ? category.items.map((p) => ({ ...p, _cat: category }))
    : CATEGORIES.flatMap((c) => c.items.map((p) => ({ ...p, _cat: c })));
  const items = q
    ? base.filter((p) =>
        [p.name, p.formula, p.desc, p.cat, ...(p.tags || []), ...(p.apps || [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
    : base;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CategoryNav />

      <section className="pt-10 pb-8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink">
              {q ? "Search Results" : category ? category.en : "All Products"}
            </span>
            <h1 className="text-balance text-3xl font-medium tracking-tight text-ink md:text-4xl">
              {q ? `"${q}" 검색결과` : category ? category.kr : "전체 제품"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              총 {items.length}개 제품
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {items.map((p, i) => {
              const cat = (p as any)._cat;
              const img = getProductImage(p.name);
              return (
                <Link
                  key={`${cat.key}-${i}-${p.name}`}
                  to={`/products/${cat.key}/${slugify(p.name)}`}
                  className="group flex flex-col overflow-hidden border border-border bg-background transition-all hover:border-accent hover:shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {img ? (
                      <img
                        src={img}
                        alt={p.name}
                        loading="lazy"
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/40 p-4">
                        <span className="text-center text-2xl font-black tracking-tight text-ink sm:text-3xl">
                          {p.formula}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink">
                      {cat.kr}
                    </span>
                    <h3 className="mb-1 text-sm font-semibold leading-snug text-ink">
                      {p.name}
                    </h3>
                    <div className="mb-2 text-[10px] text-muted-foreground">{p.formula}</div>
                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-ink/70">
                      {p.desc}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="bg-muted px-1.5 py-0.5 text-[10px] font-medium text-ink"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
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
