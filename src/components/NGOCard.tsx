
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type NGO } from "@/data/mockData";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NGOCardProps {
  ngo: NGO;
}

const NGOCard = ({ ngo }: NGOCardProps) => {
  const [coverImageError, setCoverImageError] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);
  
  // Fallback images
  const fallbackCover = "https://placehold.co/600x200/e2e8f0/64748b";
  const fallbackLogo = "/placeholder.svg";

  return (
    <Link to={`/ngo/${ngo.id}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={coverImageError ? fallbackCover : (ngo.coverImage || fallbackCover)}
            alt={`${ngo.name} cover`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setCoverImageError(true)}
          />
          <div className="absolute left-4 top-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800 dark:bg-gray-800">
            <img
              src={logoImageError ? fallbackLogo : (ngo.logo || fallbackLogo)}
              alt={`${ngo.name} logo`}
              className="h-full w-full object-cover"
              onError={() => setLogoImageError(true)}
            />
          </div>
          {ngo.verified && (
            <div className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md dark:bg-gray-800">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1">{ngo.name}</h3>
              <p className="text-sm text-muted-foreground">{ngo.location || "Unknown location"}</p>
            </div>
            <Badge variant="outline" className="bg-secondary dark:bg-gray-700">
              {ngo.category || "Uncategorized"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {ngo.description || "No description available"}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    ngo.trustScore > 90
                      ? "#10b981"
                      : ngo.trustScore > 80
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              ></div>
              <span className="text-xs font-medium">
                Trust Score: {ngo.trustScore || "N/A"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Since {ngo.foundedYear || "N/A"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NGOCard;
