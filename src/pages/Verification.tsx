import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileCheck, Shield, Users } from "lucide-react";

const Verification = () => {
  const steps = [
    {
      icon: FileCheck,
      title: "Document Submission",
      description: "Projects submit comprehensive documentation including baseline emissions data, monitoring reports, and evidence of carbon reduction activities.",
    },
    {
      icon: Users,
      title: "Third-Party Audit",
      description: "Certified MRV (Measurement, Reporting & Verification) auditors conduct thorough reviews to ensure compliance with international standards.",
    },
    {
      icon: Shield,
      title: "Blockchain Recording",
      description: "Verified credits are minted and recorded on blockchain for permanent, immutable tracking and transparency.",
    },
    {
      icon: CheckCircle2,
      title: "Market Listing",
      description: "Approved credits are listed on the marketplace with full audit trails and verification badges for buyer confidence.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Verification Process</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our rigorous verification process ensures every carbon credit on ClimaX represents real, measurable environmental impact.
            </p>
          </div>

          <div className="grid gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Step {index + 1}</div>
                      <div>{step.title}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Standards & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                All credits on ClimaX are verified against internationally recognized standards including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Gold Standard for Global Goals</li>
                <li>Verified Carbon Standard (VCS)</li>
                <li>Climate Action Reserve (CAR)</li>
                <li>Bureau of Energy Efficiency (BEE) Standards</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verification;
