import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-background py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold">ClimaX</span>
            </div>
            <p className="text-sm text-neutral-light">
              India's trusted carbon credit exchange platform. Empowering MSMEs and citizens in the fight against climate change.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Product</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <Link to="/how-it-works" className="hover:text-accent transition-climax">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-accent transition-climax">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-accent transition-climax">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/verification" className="hover:text-accent transition-climax">
                  Verification Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Company</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <Link to="/about" className="hover:text-accent transition-climax">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-climax">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-accent transition-climax">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-climax">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li>
                <Link to="/privacy" className="hover:text-accent transition-climax">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-climax">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-accent transition-climax">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-medium text-center text-sm text-neutral-light">
              <p>&copy; {new Date().getFullYear()} ClimaX. All rights reserved. Building a sustainable future together.</p>
       </div>
      </div>
    </footer>
  );
};
