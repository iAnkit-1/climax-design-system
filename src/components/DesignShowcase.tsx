import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Upload, TrendingUp, MapPin, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export const DesignShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 py-12">
          <h1 className="text-foreground">ClimaX Design System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern, trustworthy design system for Green FinTech applications. 
            Built with sustainability and accessibility at its core.
          </p>
        </header>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-foreground">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="h-24 rounded-[var(--radius)] bg-primary shadow-climax-md"></div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Primary</p>
                <p className="text-muted-foreground">Deep Teal - Trust & Sustainability</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-[var(--radius)] bg-accent shadow-climax-md"></div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Accent</p>
                <p className="text-muted-foreground">Lime - Growth & Energy</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-[var(--radius)] bg-neutral-dark shadow-climax-md"></div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Neutral Dark</p>
                <p className="text-muted-foreground">Text & Contrast</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-24 rounded-[var(--radius)] bg-muted border border-border shadow-climax-md"></div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Muted</p>
                <p className="text-muted-foreground">Backgrounds & Surfaces</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="default">Primary Action</Button>
            <Button variant="secondary" size="default">Secondary Action</Button>
            <Button variant="ghost" size="default">Ghost Action</Button>
            <Button variant="accent" size="default">Accent Action</Button>
            <Button variant="outline" size="default">Outline Action</Button>
            <Button variant="destructive" size="default">Delete</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="default">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="icon"><Wallet /></Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>
        </section>

        {/* Inputs & Validation */}
        <section className="space-y-6">
          <h2 className="text-foreground">Form Inputs & Validation States</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <Input placeholder="Default input" />
            <Input placeholder="Email address" type="email" />
            <Input 
              placeholder="Validated input" 
              success="This field is valid!"
            />
            <Input 
              placeholder="Invalid input" 
              error="This field is required"
            />
            <Input 
              placeholder="Warning state" 
              warning="Please double-check this value"
            />
            <Input placeholder="Disabled input" disabled />
          </div>
        </section>

        {/* Card Variants */}
        <section className="space-y-6">
          <h2 className="text-foreground">Card Variants</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Project Card */}
            <Card variant="project">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Solar Farm Initiative
                    </CardTitle>
                    <CardDescription>Renewable energy project in Kenya</CardDescription>
                  </div>
                  <Shield className="w-5 h-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbon Offset</span>
                    <span className="font-semibold text-primary">5,240 tons/year</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment Goal</span>
                    <span className="font-semibold">$250,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified by Auditor</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" className="w-full">Invest Now</Button>
              </CardFooter>
            </Card>

            {/* Credit Card */}
            <Card variant="credit">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2 text-accent-foreground">
                      <Wallet className="w-5 h-5 text-accent-dark" />
                      Carbon Credit Certificate
                    </CardTitle>
                    <CardDescription>Tradable emission reduction</CardDescription>
                  </div>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Certificate ID</span>
                    <span className="font-mono font-semibold">CC-2024-1547</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits</span>
                    <span className="font-semibold text-accent-dark">100 tCO₂e</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market Value</span>
                    <span className="font-semibold">$2,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="accent" className="w-full">Trade Credits</Button>
              </CardFooter>
            </Card>

            {/* Auditor Card */}
            <Card variant="auditor">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle>EcoVerify International</CardTitle>
                    <CardDescription>Certified Climate Auditor</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">152 Projects Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Global Coverage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Member since 2018</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardFooter>
            </Card>

            {/* Transaction Row */}
            <Card variant="transaction">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Credit Purchase</p>
                      <p className="text-sm text-muted-foreground">Solar Farm Initiative</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">+50 tCO₂e</p>
                    <p className="text-sm text-muted-foreground">$1,250.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Icons */}
        <section className="space-y-6">
          <h2 className="text-foreground">Icon Set</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <Wallet className="w-8 h-8 text-primary" />
              <span className="text-xs text-center text-muted-foreground">Wallet</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <Shield className="w-8 h-8 text-success" />
              <span className="text-xs text-center text-muted-foreground">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <Upload className="w-8 h-8 text-primary" />
              <span className="text-xs text-center text-muted-foreground">Upload</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <TrendingUp className="w-8 h-8 text-accent-dark" />
              <span className="text-xs text-center text-muted-foreground">Analytics</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="text-xs text-center text-muted-foreground">Location</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius)] bg-muted">
              <Calendar className="w-8 h-8 text-primary" />
              <span className="text-xs text-center text-muted-foreground">Calendar</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-foreground">Typography Scale</h2>
          <div className="space-y-4 p-8 rounded-[var(--radius)] bg-card shadow-climax-md">
            <h1 className="text-foreground">Heading 1 - 48px</h1>
            <h2 className="text-foreground">Heading 2 - 36px</h2>
            <h3 className="text-foreground">Heading 3 - 30px</h3>
            <h4 className="text-foreground">Heading 4 - 24px</h4>
            <h5 className="text-foreground">Heading 5 - 20px</h5>
            <h6 className="text-foreground">Heading 6 - 18px</h6>
            <p className="text-foreground">Body text - 16px. The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-muted-foreground">Small text - 14px. Secondary information and captions.</p>
          </div>
        </section>

        {/* Spacing & Shadows */}
        <section className="space-y-6">
          <h2 className="text-foreground">Elevation & Shadows</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-[var(--radius)] bg-card shadow-climax-sm">
              <p className="text-sm font-semibold text-foreground">Small</p>
              <p className="text-xs text-muted-foreground mt-2">shadow-climax-sm</p>
            </div>
            <div className="p-6 rounded-[var(--radius)] bg-card shadow-climax-md">
              <p className="text-sm font-semibold text-foreground">Medium</p>
              <p className="text-xs text-muted-foreground mt-2">shadow-climax-md</p>
            </div>
            <div className="p-6 rounded-[var(--radius)] bg-card shadow-climax-lg">
              <p className="text-sm font-semibold text-foreground">Large</p>
              <p className="text-xs text-muted-foreground mt-2">shadow-climax-lg</p>
            </div>
            <div className="p-6 rounded-[var(--radius)] bg-card shadow-climax-xl">
              <p className="text-sm font-semibold text-foreground">Extra Large</p>
              <p className="text-xs text-muted-foreground mt-2">shadow-climax-xl</p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="text-center py-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              All components follow WCAG 2.1 AA accessibility standards with proper contrast ratios and focus states.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Design System: ClimaX Green FinTech · Built with Lovable
          </p>
        </footer>
      </div>
    </div>
  );
};
