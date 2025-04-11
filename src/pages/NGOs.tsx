
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NGOCard from "@/components/NGOCard";
import NGOFilter from "@/components/NGOFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

// This would come from Supabase in a real app
const mockNGOs = [
  {
    id: "1",
    name: "Children First Foundation",
    category: "Children & Youth",
    description: "Supporting underprivileged children with education and healthcare",
    location: "Mumbai, Maharashtra",
    logo: "/placeholder.svg",
    donorsCount: 120,
    fundingGoal: 500000,
    amountRaised: 320000,
    verified: true
  },
  {
    id: "2",
    name: "EcoLife Initiative",
    category: "Environment",
    description: "Working towards a sustainable future through conservation efforts",
    location: "Bengaluru, Karnataka",
    logo: "/placeholder.svg",
    donorsCount: 85,
    fundingGoal: 300000,
    amountRaised: 150000,
    verified: true
  },
  {
    id: "3",
    name: "Healthcare For All",
    category: "Healthcare",
    description: "Providing medical assistance to underserved communities",
    location: "Delhi, NCR",
    logo: "/placeholder.svg",
    donorsCount: 95,
    fundingGoal: 400000,
    amountRaised: 275000,
    verified: true
  },
  {
    id: "4",
    name: "Women Empowerment Trust",
    category: "Women Empowerment",
    description: "Empowering women through education and skill development",
    location: "Jaipur, Rajasthan",
    logo: "/placeholder.svg",
    donorsCount: 70,
    fundingGoal: 250000,
    amountRaised: 180000,
    verified: true
  },
  {
    id: "5",
    name: "Rural Development Initiative",
    category: "Rural Development",
    description: "Improving infrastructure and livelihoods in rural areas",
    location: "Lucknow, Uttar Pradesh",
    logo: "/placeholder.svg",
    donorsCount: 45,
    fundingGoal: 200000,
    amountRaised: 95000,
    verified: true
  }
];

// Simulated API call to fetch NGOs - in a real app this would be a Supabase query
const fetchNGOs = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNGOs;
};

const NGOs = () => {
  const { getVerifiedNGOs } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredNGOs, setFilteredNGOs] = useState([]);

  // Use React Query to fetch NGOs
  const { data: ngos, isLoading, error } = useQuery({
    queryKey: ['ngos'],
    queryFn: fetchNGOs,
  });

  // Filter NGOs based on search and categories
  useEffect(() => {
    if (!ngos) return;

    let filtered = ngos;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(ngo => 
        ngo.name.toLowerCase().includes(search.toLowerCase()) ||
        ngo.description.toLowerCase().includes(search.toLowerCase()) ||
        ngo.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(ngo => 
        selectedCategories.includes(ngo.category)
      );
    }

    // Only include verified NGOs
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
