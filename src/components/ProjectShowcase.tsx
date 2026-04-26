// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
// import { Link } from "react-router-dom";

// // Define the project interface matching the Marketplace structure
// interface FeaturedProject {
//   id: string;
//   title: string;
//   type: string;
//   location: string;
//   credits: number;
//   pricePerCredit: number;
//   vintage: number;
//   verifier: string;
//   status: "verified" | "pending" | "retired";
//   // New property for the image URL
//   imageUrl: string;
// }

// const ProjectShowcase = () => {
//   // Featured projects data - REPLACE placeholder imageUrl with your real images
//   const featuredProjects: FeaturedProject[] = [
//     {
//       id: "FT-001",
//       title: "Rooftop Solar Installation - Mumbai",
//       type: "Rooftop Solar",
//       location: "Mumbai",
//       credits: 450,
//       pricePerCredit: 850,
//       vintage: 2024,
//       verifier: "Gold Standard",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-002",
//       title: "Afforestation Project - Uttarakhand",
//       type: "Afforestation",
//       location: "Uttarakhand",
//       credits: 1200,
//       pricePerCredit: 920,
//       vintage: 2022,
//       verifier: "Gold Standard",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-003",
//       title: "Wind Farm Project - Rajasthan",
//       type: "Wind Energy",
//       location: "Rajasthan",
//       credits: 950,
//       pricePerCredit: 870,
//       vintage: 2023,
//       verifier: "Verra",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800",
//     },
//     // New Projects - Added 6 more
//     {
//       id: "FT-004",
//       title: "Biogas Plant - Rural Tamil Nadu",
//       type: "Biogas",
//       location: "Tamil Nadu",
//       credits: 750,
//       pricePerCredit: 780,
//       vintage: 2023,
//       verifier: "Verra",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1631711898379-6a94eda8db78?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-005",
//       title: "Waste-to-Energy Plant - Bangalore",
//       type: "Waste-to-Energy",
//       location: "Karnataka",
//       credits: 920,
//       pricePerCredit: 890,
//       vintage: 2024,
//       verifier: "Climate Action Reserve",
//       status: "pending",
//       imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-006",
//       title: "Hydroelectric Project - Himachal Pradesh",
//       type: "Hydroelectric",
//       location: "Himachal Pradesh",
//       credits: 1850,
//       pricePerCredit: 920,
//       vintage: 2022,
//       verifier: "Climate Action Reserve",
//       status: "retired",
//       imageUrl: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-007",
//       title: "Energy Efficiency Program - Delhi NCR",
//       type: "Energy Efficiency",
//       location: "Delhi",
//       credits: 680,
//       pricePerCredit: 820,
//       vintage: 2024,
//       verifier: "Verra",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-008",
//       title: "Biomass Power Generation - Maharashtra",
//       type: "Biomass",
//       location: "Maharashtra",
//       credits: 540,
//       pricePerCredit: 860,
//       vintage: 2023,
//       verifier: "Gold Standard",
//       status: "pending",
//       imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800",
//     },
//     {
//       id: "FT-009",
//       title: "Community Solar Thermal - Gujarat",
//       type: "Solar Thermal",
//       location: "Gujarat",
//       credits: 390,
//       pricePerCredit: 830,
//       vintage: 2024,
//       verifier: "Verra",
//       status: "verified",
//       imageUrl: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=800",
//     },
//   ];

//   // Function to render status badge (copied from Marketplace)
//   const getStatusBadge = (status: string) => {
//     const variants = {
//       verified: { variant: "default" as const, icon: CheckCircle2, label: "Verified" },
//       pending: { variant: "secondary" as const, icon: CheckCircle2, label: "Pending" },
//       retired: { variant: "outline" as const, icon: CheckCircle2, label: "Retired" }
//     };
//     const config = variants[status as keyof typeof variants] || variants.verified;
//     const Icon = config.icon;

//     return (
//       <Badge variant={config.variant} className="gap-1">
//         <Icon className="w-3 h-3" />
//         {config.label}
//       </Badge>
//     );
//   };

//   return (
//     <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-10 sm:mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Featured Carbon Projects</h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             Explore high-impact, verified carbon credit projects from across India. Each credit represents a real,
//             measurable reduction in greenhouse gas emissions.
//           </p>
//           <Link to="/marketplace">
//             <Button variant="link" className="mt-2 text-primary font-semibold">
//               View all proj ects in Marketplace →
//             </Button>
//           </Link>
//         </div>

//         {/* Projects Grid - Now showing 9 projects */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {featuredProjects.map((project) => (
//             <Card key={project.id} variant="project" className="overflow-hidden group h-full flex flex-col">
//               {/* Card Image - USING imageUrl FROM DATA */}
//               <div className="h-48 overflow-hidden relative">
//                 <img
//                   src={project.imageUrl}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-3 right-3">
//                   {getStatusBadge(project.status)}
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>

//               <CardHeader className="pb-4 flex-grow-0">
//                 <div className="flex items-start justify-between gap-2 mb-3">
//                   <Link to={`/marketplace/${project.id}`} className="flex-1 min-w-0">
//                     <CardTitle className="text-lg hover:text-primary transition-colors line-clamp-2">
//                       {project.title}
//                     </CardTitle>
//                   </Link>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <MapPin className="w-4 h-4 shrink-0" />
//                     <span>{project.location}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4 shrink-0" />
//                     <span>Vintage {project.vintage}</span>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="pt-0 flex-grow">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Type:</span>
//                     <Badge variant="secondary">{project.type}</Badge>
//                   </div>

//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Verifier:</span>
//                     <span className="font-medium">{project.verifier}</span>
//                   </div>

//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Available:</span>
//                     <span className="font-medium">{project.credits.toLocaleString()} tCO₂e</span>
//                   </div>

//                   <div className="pt-4 border-t space-y-4 mt-4">
//                     <div className="flex items-baseline justify-between">
//                       <span className="text-sm text-muted-foreground">Price/credit:</span>
//                       <div className="text-right">
//                         <span className="text-2xl font-bold">₹{project.pricePerCredit}</span>
//                         <span className="text-sm text-muted-foreground ml-1">/ tCO₂e</span>
//                       </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <Link to={`/marketplace/${project.id}`} className="flex-1">
//                         <Button className="w-full">View Details</Button>
//                       </Link>
//                       <Link to="/marketplace" className="flex-1">
//                         <Button variant="outline" className="w-full">
//                           Explore Similar
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="mt-12 pt-8 border-t">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4">
//               <div className="text-3xl font-bold text-primary">9</div>
//               <div className="text-sm text-muted-foreground">Featured Projects</div>
//             </div>
//             <div className="text-center p-4">
//               <div className="text-3xl font-bold text-primary">6,910</div>
//               <div className="text-sm text-muted-foreground">Total Credits Available</div>
//             </div>
//             <div className="text-center p-4">
//               <div className="text-3xl font-bold text-primary">4</div>
//               <div className="text-sm text-muted-foreground">Indian States</div>
//             </div>
//             <div className="text-center p-4">
//               <div className="text-3xl font-bold text-primary">3</div>
//               <div className="text-sm text-muted-foreground">Verification Standards</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectShowcase;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ Define backend type
interface Project {
  _id: string;
  title: string;
  location: {
    state: string;
  };
  credits: number;
  pricePerCredit: number;
  status: "verified" | "pending" | "retired";
  documents: {
    url: string;
  }[];
  createdAt: string;
}

const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();

        // ✅ Filter ONLY verified projects
        const verifiedProjects = data.filter(
          (p: Project) => p.status === "verified",
        );

        setProjects(verifiedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ✅ Status badge
  const getStatusBadge = (status: string) => {
    const variants = {
      verified: {
        variant: "default" as const,
        icon: CheckCircle2,
        label: "Verified",
      },
      pending: {
        variant: "secondary" as const,
        icon: CheckCircle2,
        label: "Pending",
      },
      retired: {
        variant: "outline" as const,
        icon: CheckCircle2,
        label: "Retired",
      },
    };

    const config =
      variants[status as keyof typeof variants] || variants.verified;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  // ✅ Loading state
  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}{" "}
        <div className="text-center mb-10 sm:mb-12">
          {" "}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Featured Carbon Projects
          </h2>{" "}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {" "}
            Explore high-impact, verified carbon credit projects from across
            India. Each credit represents a real, measurable reduction in
            greenhouse gas emissions.{" "}
          </p>{" "}
          <Link to="/marketplace">
            {" "}
            <Button variant="link" className="mt-2 text-primary font-semibold">
              {" "}
              View all proj ects in Marketplace →{" "}
            </Button>{" "}
          </Link>{" "}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden group">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={`http://localhost:5000${project.documents?.[0]?.url}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(project.status)}
                </div>
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location?.state}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.createdAt).getFullYear()}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span>Credits:</span>
                  <span>{project.credits}</span>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span>Price:</span>
                  <span>₹{project.pricePerCredit}</span>
                </div>

                <Link to={`/marketplace/${project._id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center mt-10 text-muted-foreground">
            No verified projects found.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcase;
