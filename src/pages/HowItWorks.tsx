import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Upload, ShieldCheck, ShoppingCart, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Submit Your Project",
      description: "Sellers register sustainability projects with complete documentation and baseline emissions data.",
      color: "text-primary"
    },
    {
      icon: ShieldCheck,
      title: "Independent Verification",
      description: "ACVA-certified auditors verify your project against MRV standards and issue verified carbon credits.",
      color: "text-success"
    },
    {
      icon: ShoppingCart,
      title: "List on Marketplace",
      description: "Approved projects are listed on the marketplace where buyers can purchase verified carbon credits.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Track Impact",
      description: "Monitor your carbon offset portfolio and generate reports for compliance and transparency.",
      color: "text-info"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">How ClimaX Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A transparent, verified carbon credit marketplace connecting sustainability projects with conscious buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="hover-card">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <span className="text-3xl font-bold text-muted-foreground">0{index + 1}</span>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/get-started">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
