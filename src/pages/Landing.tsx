import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCards } from "@/components/FeatureCards";
import ProjectShowcase from "@/components/ProjectShowcase";
import RegistriesSection from "@/components/RegistriesSection";
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <ProjectShowcase />
        <RegistriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;