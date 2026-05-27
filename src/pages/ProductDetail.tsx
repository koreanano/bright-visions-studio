import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { slugify } from "@/data/products";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import SEO from "@/components/SEO";
import { findProduct, getCategory } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const ProductDetail = () => {
  const { categoryKey, slug } = useParams();
  const category = categoryKey ? getCategory(categoryKey) : null;
  const product = categoryKey && slug ? findProduct(categoryKey, slug) : null;

  if (!category || !product) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-32 text-center">
          <p className="text-muted-foreground">제품을 찾을 수 없습니다.</p>
          <Link to="/products" className="mt-4 inline-block text-ink">전체 제품 보기</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const parts = product.name.split("/").map((s) => s.trim());
  const titleName = parts.length > 1 ? `${parts[0]} (${parts.slice(1).join(" / ")})` : product.name;
  const pageTitle = `${titleName} | 나노코리아`;
  const rawDesc = product.desc.replace(/\s+/g, " ").trim();
  const metaDesc = rawDesc.length > 158 ? rawDesc.slice(0, 157) + "…" : rawDesc;
  const canonical = `https://nano-korea.co.kr/products/${category.key}/${slugify(product.name)}`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="product" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDesc} />
      </Helmet>
      <Navigation />
      <CategoryNav />
      <section className="pt-10 pb-20">

        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <Link
            to={`/products/${category.key}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> {category.kr} 목록으로
          </Link>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink">
                {category.en} · {product.cat}
              </div>
              <h1 className="text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
                {product.name}
              </h1>
              <div className="mt-3 text-base text-muted-foreground">{product.formula}</div>
            </div>
            {getProductImage(product.name) ? (
              <div className="overflow-hidden border border-border bg-white">
                <img
                  src={getProductImage(product.name)}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center overflow-hidden border border-border bg-muted/40 p-8">
                <span className="text-balance text-center text-6xl font-black tracking-tight text-ink md:text-7xl lg:text-8xl">
                  {product.formula}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="bg-muted px-3 py-1.5 text-xs font-medium text-ink">
                {t}
              </span>
            ))}
          </div>

          <p className="mt-10 text-lg leading-relaxed text-ink/80">{product.desc}</p>

          {product.details?.features && (
            <div className="mt-14 border-t border-border pt-10">
              <h2 className="mb-8 text-2xl font-medium text-ink">제품 특성</h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {product.details.features.map((f, i) => (
                  <article key={f.title} className="rounded-2xl border border-border bg-muted/40 p-6">
                    <div className="mb-3 flex items-baseline gap-3">
                      <span className="text-xs font-semibold text-accent">0{i + 1}</span>
                      <h3 className="text-base font-medium text-ink">{f.title}</h3>
                    </div>
                    <ul className="space-y-2 text-sm leading-relaxed text-ink/75">
                      {f.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {product.details?.appSections && (
            <div className="mt-14 border-t border-border pt-10">
              <h2 className="mb-8 text-2xl font-medium text-ink">분야별 활용</h2>
              <div className="space-y-8">
                {product.details.appSections.map((sec) => {
                  const hasNote = sec.rows.some((r) => r.note);
                  return (
                    <section key={sec.title}>
                      <h3 className="mb-2 text-base font-medium text-ink">{sec.title}</h3>
                      {sec.intro && <p className="mb-3 text-sm text-ink/65">{sec.intro}</p>}
                      <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-ink/70">
                            <tr>
                              <th className="w-1/3 px-4 py-3 font-medium">적용 분야</th>
                              <th className="px-4 py-3 font-medium">역할</th>
                              {hasNote && <th className="px-4 py-3 font-medium">비고</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {sec.rows.map((r) => (
                              <tr key={r.use} className="border-t border-border">
                                <td className="px-4 py-3 align-top text-ink">{r.use}</td>
                                <td className="px-4 py-3 align-top text-ink/75">{r.role}</td>
                                {hasNote && <td className="px-4 py-3 align-top text-ink/65">{r.note ?? ""}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          )}

          {product.details?.sizingTable && (
            <div className="mt-14 border-t border-border pt-10">
              <h2 className="mb-3 text-2xl font-medium text-ink">{product.details.sizingTable.title}</h2>
              {product.details.sizingTable.intro && (
                <p className="mb-6 text-sm text-ink/70">{product.details.sizingTable.intro}</p>
              )}
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-ink/70">
                    <tr>
                      {product.details.sizingTable.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.details.sizingTable.rows.map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        {row.map((c, j) => (
                          <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-medium text-ink whitespace-nowrap" : "text-ink/75"}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-medium text-ink">주요 적용 분야</h2>
            <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
              {product.apps.map((a) => (
                <li key={a} className="flex items-start gap-3 bg-background p-5 text-sm text-ink/80">
                  <span className="mt-0.5 text-ink">→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-border bg-muted/40 p-8 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink">Inquiry</div>
              <h3 className="mt-1 text-xl font-medium text-ink">이 제품에 대한 견적·샘플 문의</h3>
            </div>
            <Link
              to={`/#contact`}
              className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-accent"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductDetail;
