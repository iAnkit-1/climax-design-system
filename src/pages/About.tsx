import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Globe, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About ClimaX</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              India's first transparent, blockchain-powered carbon credit exchange platform empowering MSMEs and citizens in the fight against climate change.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              ClimaX democratizes access to carbon markets by providing a trusted, transparent platform where small and medium enterprises can monetize their environmental efforts. We believe every ton of CO₂ reduced matters, and every business deserves the opportunity to participate in climate action.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Why ClimaX?</h2>
            <p className="text-muted-foreground mb-6">
              Traditional carbon credit markets are complex, expensive, and inaccessible to smaller players. ClimaX changes this by leveraging blockchain technology to create an immutable, transparent ledger of verified carbon credits. Our streamlined verification process and competitive pricing make climate action economically viable for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  To make India a global leader in transparent carbon markets by 2030, enabling millions of businesses to contribute to climate goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                <p className="text-muted-foreground">
                  Built by climate tech experts, blockchain engineers, and sustainability professionals committed to democratizing carbon markets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
                <p className="text-muted-foreground">
                  Aligned with UN Sustainable Development Goals and India's commitment to net-zero emissions by 2070.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Record</h3>
                <p className="text-muted-foreground">
                  Successfully facilitated verification and trading of carbon credits representing real environmental impact across India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
