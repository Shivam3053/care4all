
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NGOCard from "@/components/NGOCard";
import NGOFilter from "@/components/NGOFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getFeaturedNGOs, type NGO } from "@/data/mockData";

// Fetch all NGOs from Supabase and blend with mock data
const fetchNGOs = async () => {
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'ngo_admin');
    
  if (error) throw error;

  // Get mock data for demonstration purposes
  const mockNGOs = getFeaturedNGOs(10);
  
  // Format the data from Supabase to match the NGO structure with all required properties
  const supabaseNGOs: NGO[] = profileData.map(ngo => ({
    id: ngo.id,
    name: ngo.organization || ngo.name || 'Unnamed NGO',
    description: ngo.organization ? `NGO working in various causes` : 'No description provided',
    category: ['Education', 'Healthcare', 'Environment', 'Animal Welfare', 'Children & Youth'][Math.floor(Math.random() * 5)],
    location: 'India',
    logo: "/placeholder.svg",
    coverImage: "https://placehold.co/600x200/e2e8f0/64748b",
    verified: ngo.verification_status === 'approved',
    trustScore: Math.floor(Math.random() * 20) + 80,
    foundedYear: 2000 + Math.floor(Math.random() * 22),
    totalRaised: Math.floor(Math.random() * 3000000) + 500000,
    supporters: Math.floor(Math.random() * 1000) + 100,
    regNumber: `REG-${Math.floor(Math.random() * 900000) + 100000}`,
    upiId: `${ngo.organization?.toLowerCase().replace(/\s/g, '')}@upi` || 'donation@upi',
    phone: `91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    email: ngo.email || 'contact@example.org',
    website: `https://${ngo.organization?.toLowerCase().replace(/\s/g, '')}.org` || 'https://example.org',
    team: [],
    achievements: [],
    images: []
  }));

  // Combine both sources of NGOs
  return [...supabaseNGOs, ...mockNGOs];
};

const NGOs = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredNGOs, setFilteredNGOs] = useState<NGO[]>([]);

  const { data: ngos, isLoading, error } = useQuery({
    queryKey: ['ngos'],
    queryFn: fetchNGOs,
  });

  useEffect(() => {
    if (!ngos) return;

    let filtered = [...ngos];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(ngo => 
        (ngo.name && ngo.name.toLowerCase().includes(search.toLowerCase())) ||
        (ngo.description && ngo.description.toLowerCase().includes(search.toLowerCase())) ||
        (ngo.location && ngo.location.toLowerCase().includes(search.toLowerCase())) ||
        (ngo.category && ngo.category.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(ngo => 
        ngo.category && selectedCategories.includes(ngo.category)
      );
    }

    setFilteredNGOs(filtered);
  }, [ngos, search, selectedCategories]);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="container py-12 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-2">NGO Directory</h1>
      <p className="text-muted-foreground mb-8">
        Discover NGOs working in causes you care about
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search NGOs..."
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600"
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
                <Card key={i} className="dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="h-16 w-16 rounded-lg dark:bg-gray-700" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-full dark:bg-gray-700" />
                        <Skeleton className="h-4 w-3/4 dark:bg-gray-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive dark:bg-red-900/20 dark:text-red-300">
              Error loading NGOs. Please try again.
            </div>
          ) : filteredNGOs.length === 0 ? (
            <div className="rounded-lg bg-muted p-8 text-center dark:bg-gray-800">
              <h3 className="text-lg font-medium mb-2">No NGOs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find NGOs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
