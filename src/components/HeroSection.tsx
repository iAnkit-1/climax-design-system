import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                ClimaX — India's carbon credit exchange.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Register projects, verify credits, trade securely — built for MSMEs & citizens.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild className="group">
                <Link to="/get-started">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>

            {/* Social Proof */}
        
          </div>

          {/* Right: Illustration */}
          <div className="relative animate-fade-in lg:order-last order-first">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-climax-xl">
              <img
                src={heroImage}
                alt="ClimaX carbon credit exchange platform illustration showing renewable energy and blockchain technology"
                className="w-full h-auto"
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card shadow-climax-lg rounded-[var(--radius)] p-4 border border-success/20 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Trusted Platform</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
