import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import CompanyIntro from "@/components/CompanyIntro";
import ProductCategories from "@/components/ProductCategories";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
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
