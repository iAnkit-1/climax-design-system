import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileNav } from "@/components/MobileNav";
import Landing from "./pages/Landing";
import GetStarted from "./pages/GetStarted";
import Dashboard from "./pages/Dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ProjectSubmission from "./pages/ProjectSubmission";
import AuditorDashboard from "./pages/AuditorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectDetails from "./pages/admin/AdminProjectDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRegistry from "./pages/admin/AdminRegistry";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Wallet from "./pages/Wallet";
import HowItWorks from "./pages/HowItWorks";
import HelpCenter from "./pages/HelpCenter";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Verification from "./pages/Verification";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Compliance from "./pages/Compliance";
import VerifyCCC from "./pages/VerifyCCC";
import ScrollToTop from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Skip to main content
        </a>
        <main id="main-content" className="pb-20 md:pb-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/registries" element={<Landing />} />
            <Route path="/design-system" element={<Index />} />

            {/* General Logged-In Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<ProductDetail />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/verify-ccc" element={<VerifyCCC />} />
              <Route path="/verification" element={<Verification />} />
            </Route>

            {/* Buyer Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
            </Route>

            {/* Seller Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
              <Route path="/dashboard/seller" element={<SellerDashboard />} />
              <Route path="/project-submission" element={<ProjectSubmission />} />
            </Route>

            {/* Auditor Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['auditor']} />}>
              <Route path="/auditor-dashboard" element={<AuditorDashboard />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/projects/:projectId" element={<AdminProjectDetails />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/registry" element={<AdminRegistry />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <MobileNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
