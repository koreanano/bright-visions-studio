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
        title="나노코리아 | 첨단나노소재 B2B 전문공급"
        description="첨단세라믹, 나노소재, 무기화합물 B2B 전문 공급업체 나노코리아. 반도체·배터리·항공 산업용 소재를 공급합니다."
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
