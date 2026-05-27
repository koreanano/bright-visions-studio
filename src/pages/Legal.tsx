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

  return (
    <main className="min-h-screen bg-background">
      <SEO
        pageName={title}
        detail={`나노코리아 ${title} 안내 페이지입니다.`}
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
