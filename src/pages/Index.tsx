import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PalestrasSection from "@/components/PalestrasSection";
import CursosSection from "@/components/CursosSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import ContatoSection from "@/components/ContatoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <DiferenciaisSection />
      <ContatoSection />
      <PalestrasSection />
      <CursosSection />
      <BlogPreviewSection />
      <Footer />
    </div>
  );
};

export default Index;
