
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NGOCard from "@/components/NGOCard";
import NGOFilter from "@/components/NGOFilter";
import { getNGOs, getNGOsByCategory, getVerifiedNGOs, type NGO } from "@/data/mockData";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NGOs = () => {
  const [searchParams] = useSearchParams();
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [filteredNgos, setFilteredNgos] = useState<NGO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get("category");
    
    if (category) {
      setNgos(getNGOsByCategory(category));
      setFilteredNgos(getNGOsByCategory(category));
    } else {
      setNgos(getNGOs());
      setFilteredNgos(getNGOs());
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const handleFilterChange = (filters: {
    search: string;
    category: string;
    location: string;
    verifiedOnly: boolean;
  }) => {
    let filtered = [...ngos];

    // Filter by search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (ngo) =>
          ngo.name.toLowerCase().includes(search) ||
          ngo.description.toLowerCase().includes(search)
      );
    }

    // Filter by category
    if (filters.category !== "All") {
      filtered = filtered.filter((ngo) => ngo.category === filters.category);
    }

    // Filter by location
    if (filters.location !== "All") {
      filtered = filtered.filter((ngo) => ngo.location === filters.location);
    }

    // Filter by verification
    if (filters.verifiedOnly) {
      filtered = filtered.filter((ngo) => ngo.verified);
    }

    setFilteredNgos(filtered);
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Discover NGOs
          </h1>
          <p className="text-muted-foreground">
            Browse through our verified NGOs and find causes you're passionate about.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <NGOFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredNgos.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNgos.map((ngo) => (
                  <NGOCard key={ngo.id} ngo={ngo} />
                ))}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No results found</AlertTitle>
                <AlertDescription>
                  Try adjusting your filters to find what you're looking for.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOs;
