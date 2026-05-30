import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import SEO from "@/components/SEO";
import { CATEGORIES, getCategory, slugify } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const ProductsList = () => {
  const { categoryKey } = useParams();
  const location = useLocation();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();
  const category = categoryKey ? getCategory(categoryKey) : null;

  if (categoryKey && !category) {
    return (
      <main className="min-h-screen bg-background">
        <SEO
          pageName="삭제된 제품 카테고리"
          detail="현재 등록된 제품이 없는 이전 카테고리 주소입니다. 전체 제품 목록에서 최신 제품 정보를 확인하세요."
          path={location.pathname}
          noIndex
        />
        <Navigation />
        <section className="pt-32 pb-32 text-center">
          <h1 className="text-4xl font-medium text-ink">404</h1>
          <p className="mt-4 text-muted-foreground">삭제되었거나 현재 사용하지 않는 제품 카테고리입니다.</p>
          <Link to="/products" className="mt-4 inline-block text-ink underline underline-offset-4">
            전체 제품 보기
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

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

  const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
    carbonates: {
      title: "탄산염 (Carbonates) | 나노코리아",
      description: "고순도 탄산염 나노소재. 탄산리튬, 탄산칼슘 등 산업용 탄산염 소재를 공급합니다.",
    },
    fluorides: {
      title: "불화물 (Fluorides) | 나노코리아",
      description: "고순도 불화물 나노소재. 불화리튬, 불화칼슘 등 산업용 불화물 소재를 공급합니다.",
    },
    manganese: {
      title: "망간 소재 (Manganese) | 나노코리아",
      description: "고순도 망간 나노소재. 배터리 및 전자 산업용 망간 소재를 공급합니다.",
    },
    battery: {
      title: "배터리 소재 (Battery Materials) | 나노코리아",
      description: "2차전지·배터리용 나노소재. 양극재, 음극재 등 배터리 핵심 소재를 공급합니다.",
    },
    corundum: {
      title: "코런덤 (Corundum) | 나노코리아",
      description: "고순도 코런덤(산화알루미늄) 나노소재. 반도체·광학 산업용 소재를 공급합니다.",
    },
    carbides: {
      title: "탄화물 (Carbides) | 나노코리아",
      description: "고순도 탄화물 나노소재. 탄화규소, 탄화붕소 등 산업용 탄화물 소재를 공급합니다.",
    },
    nitrides: {
      title: "질화물 (Nitrides) | 나노코리아",
      description: "고순도 질화물 나노소재. 질화규소, 질화붕소 등 산업용 질화물 소재를 공급합니다.",
    },
    metals: {
      title: "금속 분말 (Metals) | 나노코리아",
      description: "고순도 금속 나노분말. 구리, 니켈, 은 등 산업용 금속 나노소재를 공급합니다.",
    },
    rareearth: {
      title: "희토류 (Rare Earth) | 나노코리아",
      description: "고순도 희토류 나노소재. 산화세륨, 산화란타넘 등 희토류 소재를 공급합니다.",
    },
    quartz: {
      title: "쿼츠 (Quartz) | 나노코리아",
      description: "고순도 쿼츠(석영) 소재. 반도체·광학 산업용 쿼츠 제품을 공급합니다.",
    },
    hpa: {
      title: "고순도 알루미나 (HPA) | 나노코리아",
      description: "99.99% 이상 고순도 알루미나(HPA). LED·배터리·반도체 산업용 소재를 공급합니다.",
    },
    nano: {
      title: "나노소재 (Nano Materials) | 나노코리아",
      description: "다양한 나노소재 제품군. 산화물, 복합소재 등 첨단 나노소재를 공급합니다.",
    },
    others: {
      title: "기타 제품 (Others) | 나노코리아",
      description: "나노코리아의 기타 특수 소재 제품군. 다양한 산업용 특수 소재를 공급합니다.",
    },
    oxides: {
      title: "산화물 (Oxides) | 나노코리아",
      description: "고순도 산화물 나노소재. 산업별 맞춤형 산화물 원료를 공급합니다.",
    },
    silicagel: {
      title: "실리카겔 (Silica Gel) | 나노코리아",
      description: "고순도 실리카겔 소재. 다양한 산업 응용을 위한 실리카겔 제품을 공급합니다.",
    },
  };

  const explicitSeo = category ? CATEGORY_SEO[category.key] : undefined;
  const pageTitle = q
    ? `"${q}" 검색결과 | 나노코리아`
    : !category
    ? "전체 제품 목록 | 나노코리아"
    : explicitSeo?.title;
  const pageDescription = q
    ? `나노코리아에서 "${q}" 키워드와 관련된 제품 정보를 확인하세요.`
    : !category
    ? "나노코리아의 전체 제품 카테고리를 확인하세요. 탄산염, 불화물, 배터리소재, 희토류 등 다양한 나노소재를 공급합니다."
    : explicitSeo?.description;

  const pageName = q
    ? `"${q}" 검색결과`
    : category
    ? `${category.kr} (${category.en})`
    : "전체 제품";
  const path = q
    ? `/products?q=${encodeURIComponent(q)}`
    : category
    ? `/products/${category.key}`
    : "/products";
  const detail = category
    ? `${category.kr} 카테고리의 주요 제품과 사양을 확인하세요.`
    : q
    ? `"${q}" 키워드와 관련된 제품 정보를 확인하세요.`
    : "탄산염·불화물·산화물·질화물·희토류 등 전체 제품 라인업을 확인하세요.";

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        pageName={pageName}
        detail={detail}
        path={path}
      />
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
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
                        alt={`나노코리아 ${p.name}`}
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
