import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  BookOpen, 
  FileQuestion, 
  Shield, 
  CreditCard,
  PlayCircle,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Get Started' in the navigation menu. You'll need to provide basic information and complete KYC verification. For organizations, you'll also need to submit business registration documents. The verification process typically takes 24-48 hours."
      },
      {
        question: "What is KYC and why is it required?",
        answer: "KYC (Know Your Customer) is a verification process to confirm your identity. It's required to maintain trust, prevent fraud, and comply with regulations. You'll need to upload a government-issued ID and, for organizations, business registration documents."
      },
      {
        question: "How do I switch between buyer and seller roles?",
        answer: "Your account supports multiple roles. Navigate to your Dashboard and use the role selector to switch between buyer and seller views. Each role has its own dedicated dashboard with relevant features and tools."
      }
    ]
  },
  {
    id: "submitting-projects",
    title: "Submitting Projects",
    icon: FileQuestion,
    color: "text-accent",
    bgColor: "bg-accent/10",
    faqs: [
      {
        question: "What types of projects can I submit?",
        answer: "We accept various sustainability projects including: Renewable Energy (Solar, Wind, Hydro), Energy Efficiency, Afforestation & Reforestation, Waste Management, Biogas, and Industrial Process Improvements. Each project must demonstrate measurable carbon emission reductions."
      },
      {
        question: "What documentation is required?",
        answer: "Required documents include: Project description and methodology, Baseline emissions calculations, Monitoring plan, Evidence of project implementation (photos, IoT data, invoices), Location details and maps, and Environmental impact assessments if applicable."
      },
      {
        question: "How long does the verification process take?",
        answer: "The verification timeline varies by project complexity: Initial review (2-3 days), Auditor assignment and site inspection (1-2 weeks), MRV report preparation (1 week), Final approval and credit issuance (2-3 days). On average, expect 3-4 weeks for complete verification."
      },
      {
        question: "Can I track my project's verification status?",
        answer: "Yes! Your Seller Dashboard provides real-time status updates. You'll receive notifications at each stage: submission received, under review, auditor assigned, inspection scheduled, MRV report ready, and credits issued. You can also view the detailed timeline in your project details page."
      }
    ]
  },
  {
    id: "verification",
    title: "Verification & MRV",
    icon: Shield,
    color: "text-success",
    bgColor: "bg-success/10",
    faqs: [
      {
        question: "What is MRV?",
        answer: "MRV stands for Monitoring, Reporting, and Verification. It's a systematic process to measure carbon emission reductions, report the findings transparently, and have an independent third party verify the claims. This ensures the credibility of carbon credits."
      },
      {
        question: "Who performs the audits?",
        answer: "All audits are performed by certified third-party auditors accredited by recognized standards bodies (Gold Standard, Verra, UNFCCC). Our platform maintains a list of verified auditors who follow strict protocols to ensure unbiased verification."
      },
      {
        question: "How can I request additional MRV support?",
        answer: "Use the 'Request MRV Support' button in the Help Center or on your project page. Our MRV specialists will reach out within 24 hours to discuss your specific needs, whether it's methodology selection, monitoring setup, or documentation assistance."
      },
      {
        question: "What happens if my project is rejected?",
        answer: "If a project is rejected, you'll receive a detailed report explaining the reasons. Common issues include: incomplete documentation, insufficient emission reduction proof, or methodology concerns. You can resubmit after addressing the feedback. Our team is available to help you improve your submission."
      }
    ]
  },
  {
    id: "payments",
    title: "Payments & Transactions",
    icon: CreditCard,
    color: "text-info",
    bgColor: "bg-info/10",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer: "For buyers: UPI, Credit/Debit cards, Net Banking, and Razorpay integration. For sellers: Direct bank transfer, UPI withdrawals. All transactions are secured with bank-grade encryption and processed through certified payment gateways."
      },
      {
        question: "How do I withdraw my earnings?",
        answer: "Sellers can withdraw earnings from their Wallet page. Click 'Withdraw', enter the amount, and provide bank details. Withdrawals are processed within 3-5 business days. Minimum withdrawal amount is ₹1,000. You'll receive email confirmation once processed."
      },
      {
        question: "What are the transaction fees?",
        answer: "Platform fees: Sellers pay 5% commission on credit sales. Buyers pay no additional fees beyond the credit price. Payment gateway charges: 2-3% for card transactions, free for UPI. Withdrawal fees: Free for amounts above ₹5,000, ₹50 for smaller amounts."
      },
      {
        question: "How long do credit purchases take to reflect?",
        answer: "Instant for verified payments. Once your payment is confirmed, credits are immediately added to your wallet. You'll receive a confirmation email with transaction details and a receipt. You can view all transactions in your Wallet's transaction history."
      }
    ]
  }
];

const tutorials = [
  {
    id: "1",
    title: "Getting Started with ClimaX",
    description: "Learn the basics of carbon credits and how to navigate the platform",
    duration: "5 min",
    type: "video",
    thumbnail: "🎥"
  },
  {
    id: "2",
    title: "Submitting Your First Project",
    description: "Step-by-step guide to project submission and documentation",
    duration: "8 min",
    type: "video",
    thumbnail: "🎥"
  },
  {
    id: "3",
    title: "Understanding MRV Process",
    description: "Deep dive into Monitoring, Reporting, and Verification",
    duration: "6 min",
    type: "text",
    thumbnail: "📄"
  },
  {
    id: "4",
    title: "Marketplace Best Practices",
    description: "Tips for buyers to find and purchase quality carbon credits",
    duration: "4 min",
    type: "video",
    thumbnail: "🎥"
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0 || searchQuery === "");

  const displayCategories = selectedCategory 
    ? filteredCategories.filter(cat => cat.id === selectedCategory)
    : filteredCategories;

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent successfully!",
        description: "Our support team will respond within 24 hours. Check your email for updates.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us at support@climax.com",
        variant: "destructive",
      });
    }
  };

  const handleMRVSupport = () => {
    toast({
      title: "MRV Support Request Received",
      description: "Our MRV specialist will contact you within 24 hours to discuss your project needs.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers, learn best practices, and get support for your carbon credit journey
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for answers... (e.g., 'How to submit a project')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedCategory === null ? "primary" : "outline"}
            onClick={() => setSelectedCategory(null)}
            size="lg"
          >
            All Topics
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="lg"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - FAQs */}
          <div className="lg:col-span-2 space-y-8">
            {displayCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}

            {filteredCategories.every(cat => cat.faqs.length === 0) && searchQuery && (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any FAQs matching "{searchQuery}". Try different keywords or contact our support team.
                  </p>
                  <Button variant="outline">Clear Search</Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* MRV Support */}
            <Card variant="credit">
              <CardHeader>
                <CardTitle className="text-lg">Need MRV Support?</CardTitle>
                <CardDescription>
                  Get expert help with your project verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleMRVSupport}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Request MRV Support
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Our MRV specialists will respond within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Tutorial Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tutorial Library</CardTitle>
                <CardDescription>
                  Video and text guides to help you succeed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-climax cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{tutorial.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground mb-1">
                          {tutorial.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {tutorial.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tutorial.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...register("name")}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      {...register("subject")}
                      aria-invalid={errors.subject ? "true" : "false"}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your question or issue in detail..."
                      rows={4}
                      {...register("message")}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2 animate-pulse" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
