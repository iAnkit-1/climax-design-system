import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Understanding Carbon Credits: A Beginner's Guide",
      excerpt: "Learn the fundamentals of carbon credits, how they work, and why they matter for businesses and the environment.",
      category: "Education",
      date: "March 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "How Blockchain Ensures Transparency in Carbon Markets",
      excerpt: "Explore how blockchain technology prevents double-counting and fraud in carbon credit trading.",
      category: "Technology",
      date: "March 10, 2024",
      readTime: "7 min read",
    },
    {
      title: "MSMEs and Climate Action: Success Stories from India",
      excerpt: "Real stories of small businesses that turned sustainability into profitable ventures through carbon credits.",
      category: "Case Study",
      date: "March 5, 2024",
      readTime: "6 min read",
    },
    {
      title: "The MRV Process: Ensuring Quality Carbon Credits",
      excerpt: "A deep dive into Measurement, Reporting, and Verification standards that guarantee credit authenticity.",
      category: "Standards",
      date: "February 28, 2024",
      readTime: "8 min read",
    },
    {
      title: "India's Path to Net-Zero: Role of Carbon Markets",
      excerpt: "How voluntary carbon markets can accelerate India's climate commitments and economic growth.",
      category: "Policy",
      date: "February 20, 2024",
      readTime: "6 min read",
    },
    {
      title: "Getting Started: Submit Your First Carbon Project",
      excerpt: "Step-by-step guide for businesses ready to monetize their environmental initiatives on ClimaX.",
      category: "Tutorial",
      date: "February 15, 2024",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ClimaX Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights on carbon markets, climate tech, and sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
