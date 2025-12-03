import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: March 2024</p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6 prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, including name, email address, business details, KYC documents, and transaction information when you register, submit projects, or trade carbon credits on ClimaX.
              </p>

              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                Your information is used to: verify your identity (KYC compliance), process transactions, maintain platform security, improve our services, communicate updates, and comply with legal obligations including carbon registry requirements.
              </p>

              <h2 className="text-xl font-semibold mb-3">3. Blockchain Transparency</h2>
              <p className="text-muted-foreground mb-4">
                Carbon credit transactions are recorded on blockchain for transparency and immutability. While transaction details are public, personal identity information is not directly linked to blockchain addresses without additional verification.
              </p>

              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal and business information. KYC documents are stored with bank-level security.
              </p>

              <h2 className="text-xl font-semibold mb-3">5. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We share information only with: verified MRV auditors for project verification, payment processors for transactions, regulatory authorities when legally required, and service providers under strict confidentiality agreements.
              </p>

              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal data, object to processing, request data portability, and withdraw consent. Contact us at privacy@climax.in to exercise these rights.
              </p>

              <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your information as long as your account is active or as needed to provide services. Transaction records are retained permanently for audit and regulatory compliance. KYC documents are retained per Indian regulatory requirements.
              </p>

              <h2 className="text-xl font-semibold mb-3">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use essential cookies for platform functionality, analytics cookies to improve user experience, and preference cookies to remember your settings. You can control cookie preferences in your browser.
              </p>

              <h2 className="text-xl font-semibold mb-3">9. International Transfers</h2>
              <p className="text-muted-foreground mb-4">
                Your data is primarily stored in India. If transferred internationally, we ensure adequate protection through standard contractual clauses and compliance with applicable data protection laws.
              </p>

              <h2 className="text-xl font-semibold mb-3">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this policy periodically. Material changes will be notified via email and platform notifications. Continued use after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy concerns or questions, contact our Data Protection Officer at privacy@climax.in or write to: ClimaX Privacy Office, Climate Innovation Hub, Bengaluru, Karnataka 560001, India.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
