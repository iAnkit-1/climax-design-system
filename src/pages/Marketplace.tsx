import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, MapPin, Calendar, CheckCircle2, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuickBuyModal } from "@/components/marketplace/QuickBuyModal";

interface CarbonCredit {
  id: string;
  title: string;
  seller: string;
  type: string;
  location: string;
  credits: number;
  pricePerCredit: number;
  vintage: number;
  verifier: string;
  status: "verified" | "pending" | "retired";
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectType, setProjectType] = useState("all");
  const [verifier, setVerifier] = useState("all");
  const [location, setLocation] = useState("all");
  const [vintageYear, setVintageYear] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(null);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  
  const itemsPerPage = 9;

  // Mock data - expanded
  const listings: CarbonCredit[] = [
    {
      id: "MKT-001",
      title: "Rooftop Solar Installation - Mumbai",
      seller: "Green Energy Co.",
      type: "Rooftop Solar",
      location: "Mumbai",
      credits: 450,
      pricePerCredit: 850,
      vintage: 2024,
      verifier: "Gold Standard",
      status: "verified"
    },
    {
      id: "MKT-002",
      title: "Biogas Plant - Rural Tamil Nadu",
      seller: "EcoFarm Solutions",
      type: "Biogas",
      location: "Tamil Nadu",
      credits: 320,
      pricePerCredit: 780,
      vintage: 2023,
      verifier: "Verra",
      status: "verified"
    },
    {
      id: "MKT-003",
      title: "Afforestation Project - Uttarakhand",
      seller: "Forest Revival NGO",
      type: "Afforestation",
      location: "Uttarakhand",
      credits: 1200,
      pricePerCredit: 920,
      vintage: 2022,
      verifier: "Gold Standard",
      status: "verified"
    },
    {
      id: "MKT-004",
      title: "Waste-to-Energy Plant - Bangalore",
      seller: "WasteTech Pvt Ltd",
      type: "Waste-to-Energy",
      location: "Karnataka",
      credits: 780,
      pricePerCredit: 890,
      vintage: 2024,
      verifier: "Climate Action Reserve",
      status: "pending"
    },
    {
      id: "MKT-005",
      title: "Wind Farm Project - Rajasthan",
      seller: "WindPower India",
      type: "Wind Energy",
      location: "Rajasthan",
      credits: 950,
      pricePerCredit: 870,
      vintage: 2023,
      verifier: "Verra",
      status: "verified"
    },
    {
      id: "MKT-006",
      title: "Community Solar - Kerala",
      seller: "Solar Kerala Initiative",
      type: "Rooftop Solar",
      location: "Kerala",
      credits: 380,
      pricePerCredit: 840,
      vintage: 2024,
      verifier: "Gold Standard",
      status: "verified"
    },
    {
      id: "MKT-007",
      title: "Hydroelectric Project - Himachal Pradesh",
      seller: "HydroGreen Solutions",
      type: "Hydroelectric",
      location: "Himachal Pradesh",
      credits: 650,
      pricePerCredit: 900,
      vintage: 2022,
      verifier: "Climate Action Reserve",
      status: "retired"
    },
    {
      id: "MKT-008",
      title: "Energy Efficiency - Delhi NCR",
      seller: "Efficiency First",
      type: "Energy Efficiency",
      location: "Delhi",
      credits: 420,
      pricePerCredit: 820,
      vintage: 2024,
      verifier: "Verra",
      status: "verified"
    },
    {
      id: "MKT-009",
      title: "Biomass Power - Maharashtra",
      seller: "BioPower Corp",
      type: "Biomass",
      location: "Maharashtra",
      credits: 540,
      pricePerCredit: 860,
      vintage: 2023,
      verifier: "Gold Standard",
      status: "pending"
    },
    {
      id: "MKT-010",
      title: "Solar Thermal - Gujarat",
      seller: "SunHeat Technologies",
      type: "Solar Thermal",
      location: "Gujarat",
      credits: 390,
      pricePerCredit: 830,
      vintage: 2024,
      verifier: "Verra",
      status: "verified"
    }
  ];

  const filteredListings = listings
    .filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = projectType === "all" || listing.type === projectType;
      const matchesVerifier = verifier === "all" || listing.verifier === verifier;
      const matchesLocation = location === "all" || listing.location === location;
      const matchesVintage = vintageYear === "all" || listing.vintage.toString() === vintageYear;
      const matchesPrice = listing.pricePerCredit >= priceRange[0] && listing.pricePerCredit <= priceRange[1];
      
      return matchesSearch && matchesType && matchesVerifier && matchesLocation && matchesVintage && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.pricePerCredit - b.pricePerCredit;
        case "price-desc":
          return b.pricePerCredit - a.pricePerCredit;
        case "credits-asc":
          return a.credits - b.credits;
        case "credits-desc":
          return b.credits - a.credits;
        case "vintage-asc":
          return a.vintage - b.vintage;
        case "vintage-desc":
          return b.vintage - a.vintage;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueVerifiers = ["all", ...Array.from(new Set(listings.map(l => l.verifier)))];
  const uniqueLocations = ["all", ...Array.from(new Set(listings.map(l => l.location)))];
  const uniqueVintages = ["all", ...Array.from(new Set(listings.map(l => l.vintage.toString())))];

  const handleBuyClick = (listing: CarbonCredit) => {
    setSelectedProject(listing);
    setBuyModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: { variant: "default" as const, icon: CheckCircle2, label: "Verified" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      retired: { variant: "outline" as const, icon: Award, label: "Retired" }
    };
    const config = variants[status as keyof typeof variants] || variants.verified;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">Carbon Credit Marketplace</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Browse verified carbon credits from sustainable projects
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-4 sm:mb-6">
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Search and Sort Row */}
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 min-h-[44px]"
                    />
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-[200px] min-h-[44px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="credits-asc">Credits: Low to High</SelectItem>
                      <SelectItem value="credits-desc">Credits: High to Low</SelectItem>
                      <SelectItem value="vintage-asc">Vintage: Oldest</SelectItem>
                      <SelectItem value="vintage-desc">Vintage: Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Rooftop Solar">Rooftop Solar</SelectItem>
                      <SelectItem value="Biogas">Biogas</SelectItem>
                      <SelectItem value="Afforestation">Afforestation</SelectItem>
                      <SelectItem value="Waste-to-Energy">Waste-to-Energy</SelectItem>
                      <SelectItem value="Wind Energy">Wind Energy</SelectItem>
                      <SelectItem value="Hydroelectric">Hydroelectric</SelectItem>
                      <SelectItem value="Energy Efficiency">Energy Efficiency</SelectItem>
                      <SelectItem value="Biomass">Biomass</SelectItem>
                      <SelectItem value="Solar Thermal">Solar Thermal</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={verifier} onValueChange={setVerifier}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Verifier" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueVerifiers.map(v => (
                        <SelectItem key={v} value={v}>
                          {v === "all" ? "All Verifiers" : v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueLocations.map(l => (
                        <SelectItem key={l} value={l}>
                          {l === "all" ? "All Locations" : l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={vintageYear} onValueChange={setVintageYear}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Vintage Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueVintages.map(y => (
                        <SelectItem key={y} value={y}>
                          {y === "all" ? "All Years" : y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Price Range per Credit</span>
                    <span className="text-sm text-muted-foreground">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing {paginatedListings.length} of {filteredListings.length} projects
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {paginatedListings.map((listing) => (
              <Card key={listing.id} variant="project" className="overflow-hidden group cursor-pointer">
                <Link to={`/marketplace/${listing.id}`} className="block">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
                
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                    <Link to={`/marketplace/${listing.id}`} className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg hover:text-primary transition-colors line-clamp-2">
                        {listing.title}
                      </CardTitle>
                    </Link>
                    {getStatusBadge(listing.status)}
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Vintage {listing.vintage}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary" className="text-xs">{listing.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Verifier:</span>
                      <span className="font-medium text-xs truncate max-w-[60%]">{listing.verifier}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{listing.credits.toLocaleString()} tCO₂e</span>
                    </div>
                    
                    <div className="pt-2 sm:pt-3 border-t space-y-2 sm:space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Price/credit:</span>
                        <div className="text-right">
                          <span className="text-xl sm:text-2xl font-bold text-foreground">₹{listing.pricePerCredit}</span>
                          <span className="text-xs text-muted-foreground ml-1">/ tCO₂e</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          className="flex-1 min-h-[44px]" 
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBuyClick(listing);
                          }}
                        >
                          Buy 10 tCO₂e
                        </Button>
                        <Link to={`/marketplace/${listing.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full min-h-[44px]">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {paginatedListings.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setProjectType("all");
                    setVerifier("all");
                    setLocation("all");
                    setVintageYear("all");
                    setPriceRange([0, 1000]);
                    setCurrentPage(1);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />

      {selectedProject && (
        <QuickBuyModal
          open={buyModalOpen}
          onOpenChange={setBuyModalOpen}
          projectTitle={selectedProject.title}
          pricePerCredit={selectedProject.pricePerCredit}
          availableCredits={selectedProject.credits}
        />
      )}
    </div>
  );
};

export default Marketplace;
