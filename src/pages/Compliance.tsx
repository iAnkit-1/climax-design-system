import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileCheck, Lock, Globe } from "lucide-react";

const Compliance = () => {
  const standards = [
    {
      icon: Shield,
      title: "KYC/AML Compliance",
      description: "Full Know Your Customer and Anti-Money Laundering compliance as per RBI guidelines and PMLA regulations.",
      status: "Certified",
    },
    {
      icon: FileCheck,
      title: "Carbon Standards",
      description: "Credits verified against Gold Standard, VCS, CAR, and Bureau of Energy Efficiency standards.",
      status: "Verified",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Compliance with DPDPA 2023 (Digital Personal Data Protection Act) and international data privacy standards.",
      status: "Compliant",
    },
    {
      icon: Globe,
      title: "International Standards",
      description: "Aligned with Paris Agreement Article 6, CORSIA, and voluntary carbon market best practices.",
      status: "Aligned",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Compliance & Standards</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ClimaX adheres to the highest standards of regulatory compliance, carbon verification, and data protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {standards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <standard.icon className="w-10 h-10 text-primary" />
                    <Badge variant="secondary">{standard.status}</Badge>
                  </div>
                  <CardTitle className="mt-4">{standard.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{standard.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Regulatory Framework</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Indian Regulations</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Reserve Bank of India (RBI) payment gateway compliance</li>
                  <li>Prevention of Money Laundering Act (PMLA) adherence</li>
                  <li>Digital Personal Data Protection Act (DPDPA) 2023 compliance</li>
                  <li>Bureau of Energy Efficiency (BEE) carbon standards</li>
                  <li>Ministry of Environment, Forest and Climate Change guidelines</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">International Standards</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Gold Standard for Global Goals certification</li>
                  <li>Verified Carbon Standard (Verra) methodology</li>
                  <li>Climate Action Reserve protocols</li>
                  <li>ISO 14064 greenhouse gas accounting</li>
                  <li>Paris Agreement Article 6 alignment</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Audit & Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                ClimaX undergoes regular third-party security audits and compliance reviews. All carbon credit transactions are recorded on blockchain for complete transparency and immutability.
              </p>
              <p className="text-muted-foreground">
                Our verification process follows internationally recognized MRV (Measurement, Reporting, and Verification) protocols conducted by certified auditors.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Questions about Compliance?</h3>
              <p className="text-muted-foreground">
                For detailed compliance documentation or specific regulatory inquiries, contact our compliance team at compliance@climax.in
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compliance;
