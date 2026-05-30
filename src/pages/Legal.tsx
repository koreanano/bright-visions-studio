import termsText from "@/data/terms.txt?raw";
import privacyText from "@/data/privacy.txt?raw";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

type Props = { kind: "terms" | "privacy" };

const LegalPage = ({ kind }: Props) => {
  const isTerms = kind === "terms";
  const title = isTerms ? "이용약관" : "개인정보처리방침";
  const content = isTerms ? termsText : privacyText;
  const seoTitle = isTerms ? "이용약관 | 나노코리아" : "개인정보처리방침 | 나노코리아";
  const seoDesc = isTerms
    ? "나노코리아 웹사이트 이용약관입니다."
    : "나노코리아의 개인정보 수집·이용·보관에 관한 처리방침입니다.";

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={isTerms ? "/terms" : "/privacy"}
      />
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <h1 className="mb-10 text-4xl font-medium tracking-tight text-ink md:text-5xl">{title}</h1>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-ink/80">
            {content}
          </pre>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LegalPage;
