import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PalestrasSection from "@/components/PalestrasSection";
import CursosSection from "@/components/CursosSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PalestrasSection />
      <CursosSection />
      <DiferenciaisSection />
      <Footer />
    </div>
  );
};

export default Index;
