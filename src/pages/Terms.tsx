import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: March 2024</p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6 prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using ClimaX, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>

              <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                You must be at least 18 years old and capable of forming binding contracts under applicable law. Business accounts must be authorized representatives with proper documentation. All users must complete KYC verification.
              </p>

              <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                You agree to provide accurate, current information during registration, maintain the security of your account credentials, notify us immediately of any unauthorized access, and accept responsibility for all activities under your account.
              </p>

              <h2 className="text-xl font-semibold mb-3">4. Carbon Credit Transactions</h2>
              <p className="text-muted-foreground mb-4">
                All carbon credit sales are final upon blockchain confirmation. Sellers guarantee they have legitimate rights to credits being sold. Buyers acknowledge that credits are verified by third-party auditors. Transaction fees apply as disclosed at time of trade.
              </p>

              <h2 className="text-xl font-semibold mb-3">5. Project Submission</h2>
              <p className="text-muted-foreground mb-4">
                Project submitters warrant that all information and documentation provided is accurate and complete. False information may result in account termination and legal action. Projects must meet minimum verification standards before listing.
              </p>

              <h2 className="text-xl font-semibold mb-3">6. Verification Process</h2>
              <p className="text-muted-foreground mb-4">
                ClimaX facilitates third-party MRV audits but does not directly verify projects. Auditor decisions are binding. We reserve the right to delist credits if verification standards are not met or if fraud is detected.
              </p>

              <h2 className="text-xl font-semibold mb-3">7. Fees and Payments</h2>
              <p className="text-muted-foreground mb-4">
                Platform fees are disclosed prior to transactions. Verification fees are separate and paid to auditors. Payment processing fees apply for withdrawals. All fees are in Indian Rupees (INR) unless otherwise stated.
              </p>

              <h2 className="text-xl font-semibold mb-3">8. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                Users may not: submit fraudulent projects, manipulate prices, double-sell credits, interfere with platform operations, violate intellectual property rights, or use the platform for money laundering or other illegal activities.
              </p>

              <h2 className="text-xl font-semibold mb-3">9. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                ClimaX and its content are protected by intellectual property laws. Users retain rights to their submitted content but grant ClimaX a license to display and process it. Blockchain records are publicly accessible per the nature of distributed ledgers.
              </p>

              <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                ClimaX is not liable for market fluctuations in carbon credit prices, third-party auditor decisions, blockchain network issues, or indirect damages. Our total liability is limited to fees paid by you in the past 12 months.
              </p>

              <h2 className="text-xl font-semibold mb-3">11. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                Disputes shall first be addressed through good-faith negotiation. If unresolved, disputes are subject to arbitration in Bengaluru, India under Indian Arbitration and Conciliation Act, 1996. Indian law governs these terms.
              </p>

              <h2 className="text-xl font-semibold mb-3">12. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may suspend or terminate accounts for violations of these terms, fraudulent activity, or legal requirements. You may close your account at any time, subject to completion of pending transactions. Blockchain records remain permanent.
              </p>

              <h2 className="text-xl font-semibold mb-3">13. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Material changes will be communicated via email and platform notifications. Continued use after changes constitutes acceptance.
              </p>

              <h2 className="text-xl font-semibold mb-3">14. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms, contact us at legal@climax.in or write to: ClimaX Legal Department, Climate Innovation Hub, Bengaluru, Karnataka 560001, India.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
