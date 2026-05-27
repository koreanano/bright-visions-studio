import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import CompanyIntro from "@/components/CompanyIntro";
import ProductCategories from "@/components/ProductCategories";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        path="/"
        detail="반도체·디스플레이·이차전지용 고순도 첨단 무기소재 공급 전문, 글로벌 공급망 기반."
      />
      <Navigation />
      <div id="top" />
      <HeroSlider />
      <CompanyIntro />
      <ProductCategories />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
