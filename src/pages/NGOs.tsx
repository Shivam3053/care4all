import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NGOCard from "@/components/NGOCard";
import NGOFilter from "@/components/NGOFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

import { getFeaturedNGOs, mockNGOs as allNGOs } from "@/data/mockData";

const fetchNGOs = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return allNGOs;
};

const NGOs = () => {
  const { getVerifiedNGOs } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredNGOs, setFilteredNGOs] = useState([]);

  const { data: ngos, isLoading, error } = useQuery({
    queryKey: ['ngos'],
    queryFn: fetchNGOs,
  });

  useEffect(() => {
    if (!ngos) return;

    let filtered = ngos;

    if (search) {
      filtered = filtered.filter(ngo => 
        ngo.name.toLowerCase().includes(search.toLowerCase()) ||
        ngo.description.toLowerCase().includes(search.toLowerCase()) ||
        ngo.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(ngo => 
        selectedCategories.includes(ngo.category)
      );
    }

    filtered = filtered.filter(ngo => ngo.verified === true);

    setFilteredNGOs(filtered);
  }, [ngos, search, selectedCategories]);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">NGO Directory</h1>
      <p className="text-muted-foreground mb-8">
        Discover verified NGOs working in causes you care about
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search NGOs..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <NGOFilter onCategoryChange={handleCategoryChange} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="h-16 w-16 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
              Error loading NGOs. Please try again.
            </div>
          ) : filteredNGOs.length === 0 ? (
            <div className="rounded-lg bg-muted p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No NGOs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find NGOs.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNGOs.map((ngo) => (
                <NGOCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOs;
