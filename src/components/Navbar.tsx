import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-semibold text-foreground">ClimaX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-climax">
              How It Works
            </Link>
            <Link to="/marketplace" className="text-foreground hover:text-primary transition-climax">
              Marketplace
            </Link>
            
            <Link to="/verify-ccc" className="text-foreground hover:text-primary transition-climax">
              Verify CCC
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-climax">
              Pricing
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-climax"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/how-it-works"
              className="block py-2 text-foreground hover:text-primary transition-climax"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/marketplace"
              className="block py-2 text-foreground hover:text-primary transition-climax"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/registries"
              className="block py-2 text-foreground hover:text-primary transition-climax"
              onClick={() => setMobileMenuOpen(false)}
            >
              Registries
            </Link>
            <Link
              to="/verify-ccc"
              className="block py-2 text-foreground hover:text-primary transition-climax"
              onClick={() => setMobileMenuOpen(false)}
            >
              Verify CCC
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-foreground hover:text-primary transition-climax"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-4 space-y-3 border-t border-border">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button variant="primary" className="w-full" asChild>
                <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
