import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Buyer",
      price: "Free",
      description: "Purchase verified carbon credits",
      features: [
        "Browse marketplace",
        "Purchase verified credits",
        "Transaction history",
        "Impact reports",
        "Email support"
      ]
    },
    {
      name: "Seller",
      price: "5%",
      description: "List your sustainability projects",
      features: [
        "Submit unlimited projects",
        "Professional verification",
        "Marketplace listing",
        "Real-time analytics",
        "Priority support",
        "ICM registry integration"
      ],
      popular: true
    },
    {
      name: "Auditor",
      price: "Custom",
      description: "Become a certified verifier",
      features: [
        "ACVA certification required",
        "Project assignment dashboard",
        "Digital signature tools",
        "Audit report templates",
        "Dedicated support"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your role in the carbon credit ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <Card key={index} className={`hover-card ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {plan.price}
                    {plan.name === "Seller" && <span className="text-lg text-muted-foreground"> commission</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "primary" : "outline"} asChild>
                    <Link to="/get-started">
                      {plan.name === "Auditor" ? "Apply Now" : "Get Started"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>All prices in Indian Rupees (₹). Enterprise solutions available.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
