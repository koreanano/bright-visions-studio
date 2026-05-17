import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import TrustMarquee from "@/components/TrustMarquee";
import ProductCategories from "@/components/ProductCategories";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div id="top" />
      <HeroSlider />
      <TrustMarquee />
      <ProductCategories />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
