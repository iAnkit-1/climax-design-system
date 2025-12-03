import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Heart, TrendingUp, Users } from "lucide-react";

const Careers = () => {
  const positions = [
    {
      title: "Blockchain Engineer",
      department: "Engineering",
      location: "Bengaluru / Remote",
      type: "Full-time",
    },
    {
      title: "MRV Auditor",
      department: "Verification",
      location: "Mumbai / Hybrid",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bengaluru",
      type: "Full-time",
    },
    {
      title: "Marketing Lead",
      department: "Growth",
      location: "Remote",
      type: "Full-time",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Work with Purpose",
      description: "Contribute to climate action and make a real environmental impact every day.",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Learn cutting-edge technologies and advance your career in climate tech.",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate professionals committed to solving climate challenges.",
    },
    {
      icon: Briefcase,
      title: "Competitive Benefits",
      description: "Comprehensive health insurance, flexible work, and equity options.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Mission</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us build India's most transparent carbon credit marketplace and accelerate the transition to a sustainable economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <benefit.icon className="w-10 h-10 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant="outline">{position.location}</Badge>
                          <Badge>{position.type}</Badge>
                        </div>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-muted">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Don't see the right role?</h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for talented individuals passionate about climate action.
              </p>
              <Button variant="outline">Send General Application</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
