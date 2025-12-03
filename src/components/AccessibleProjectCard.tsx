import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, CheckCircle2, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface AccessibleProjectCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  credits: number;
  pricePerCredit: number;
  vintage: number;
  verifier: string;
  status: "verified" | "pending" | "retired";
  seller: string;
  onBuyClick: (id: string) => void;
}

/**
 * Accessible ProjectCard component with proper ARIA labels, keyboard navigation,
 * and semantic HTML structure.
 * 
 * Touch target size: 44x44px minimum
 * Keyboard accessible: Tab navigation + Enter to activate
 * Screen reader friendly: Descriptive ARIA labels and roles
 */
export const AccessibleProjectCard: React.FC<AccessibleProjectCardProps> = ({
  id,
  title,
  location,
  type,
  credits,
  pricePerCredit,
  vintage,
  verifier,
  status,
  seller,
  onBuyClick,
}) => {
  const getStatusConfig = (status: string) => {
    const variants = {
      verified: { variant: "default" as const, icon: CheckCircle2, label: "Verified" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending Verification" },
      retired: { variant: "outline" as const, icon: Award, label: "Retired" }
    };
    return variants[status as keyof typeof variants] || variants.verified;
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;
  const totalPrice = credits * pricePerCredit;

  return (
    <article 
      className="h-full"
      role="article"
      aria-label={`Carbon credit project: ${title}, ${credits} credits available at ₹${pricePerCredit} per credit`}
    >
      <Card variant="project" className="h-full flex flex-col">
        <Link 
          to={`/marketplace/${id}`}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-t-[var(--radius)]"
          aria-label={`View details for ${title}`}
        >
          <div 
            className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden group"
            role="img"
            aria-label={`Project visualization for ${title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-primary" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Link>

        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-3">
            <Link 
              to={`/marketplace/${id}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <CardTitle className="text-lg hover:text-primary transition-colors">
                {title}
              </CardTitle>
            </Link>
            <Badge 
              variant={statusConfig.variant}
              className="gap-1 shrink-0"
              aria-label={`Project status: ${statusConfig.label}`}
            >
              <StatusIcon className="w-3 h-3" aria-hidden="true" />
              <span className="sr-only">Status: </span>
              {statusConfig.label}
            </Badge>
          </div>

          <dl className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Location:</dt>
              <dd>{location}</dd>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Vintage year:</dt>
              <dd>Vintage {vintage}</dd>
            </div>
          </dl>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <dl className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">Type:</dt>
              <dd>
                <Badge variant="secondary">{type}</Badge>
              </dd>
            </div>

            <div className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">Verifier:</dt>
              <dd className="font-medium text-xs">{verifier}</dd>
            </div>

            <div className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">Available:</dt>
              <dd className="font-medium">
                <span className="sr-only">{credits} tons of CO2 equivalent</span>
                <span aria-hidden="true">{credits.toLocaleString()} tCO₂e</span>
              </dd>
            </div>
          </dl>

          <div className="pt-3 border-t space-y-3">
            <div className="flex items-baseline justify-between">
              <dt className="text-sm text-muted-foreground">Price per credit:</dt>
              <dd className="text-right">
                <span className="text-2xl font-bold text-foreground">
                  <span className="sr-only">{pricePerCredit} rupees</span>
                  <span aria-hidden="true">₹{pricePerCredit}</span>
                </span>
                <span className="text-xs text-muted-foreground ml-1" aria-hidden="true">/ tCO₂e</span>
              </dd>
            </div>

            <Button
              className="w-full min-h-[44px]"
              onClick={(e) => {
                e.preventDefault();
                onBuyClick(id);
              }}
              aria-label={`Buy 10 carbon credits from ${title} for ₹${(pricePerCredit * 10).toLocaleString()}`}
            >
              Buy 10 tCO₂e
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
