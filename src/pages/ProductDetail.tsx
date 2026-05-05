import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
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
          <Link to="/products" className="mt-4 inline-block text-accent">전체 제품 보기</Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
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
              <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {category.en} · {product.cat}
              </div>
              <h1 className="text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
                {product.name}
              </h1>
              <div className="mt-3 font-mono text-base text-muted-foreground">{product.formula}</div>
            </div>
            {getProductImage(product.name) && (
              <div className="overflow-hidden border border-border bg-white">
                <img
                  src={getProductImage(product.name)}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="bg-muted px-3 py-1.5 text-xs font-medium text-accent">
                {t}
              </span>
            ))}
          </div>

          <p className="mt-10 text-lg leading-relaxed text-ink/80">{product.desc}</p>

          <div className="mt-14 border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-medium text-ink">주요 적용 분야</h2>
            <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
              {product.apps.map((a) => (
                <li key={a} className="flex items-start gap-3 bg-background p-5 text-sm text-ink/80">
                  <span className="mt-0.5 text-accent">→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-border bg-muted/40 p-8 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Inquiry</div>
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
