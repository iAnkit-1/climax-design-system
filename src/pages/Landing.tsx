import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCards } from "@/components/FeatureCards";
import ProjectShowcase from "@/components/ProjectShowcase"; // Import the new component
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <ProjectShowcase /> 
      </main>
      <Footer />
    </div>
  );
};

export default Landing;