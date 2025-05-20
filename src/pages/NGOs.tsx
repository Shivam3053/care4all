
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getFeaturedNGOs, type NGO } from "@/data/mockData";

const NGOs = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [filteredNGOs, setFilteredNGOs] = useState<NGO[]>([]);
  
  // Categories based on the image
  const categories = [
    "Children & Youth",
    "Education",
    "Environment",
    "Healthcare",
    "Women Empowerment",
    "Animal Welfare",
    "Elderly Care",
    "Disaster Relief",
    "Rural Development",
    "Disability Support"
  ];

  // Fetch sample NGOs
  useEffect(() => {
    // Get 10 featured NGOs from our mock data
    const mockNGOs = getFeaturedNGOs(10);
    setNgos(mockNGOs);
    setFilteredNGOs(mockNGOs);
  }, []);

  // Filter NGOs based on search and category
  useEffect(() => {
    let filtered = [...ngos];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(ngo => 
        (ngo.name && ngo.name.toLowerCase().includes(search.toLowerCase())) ||
        (ngo.description && ngo.description.toLowerCase().includes(search.toLowerCase())) ||
        (ngo.location && ngo.location.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(ngo => 
        ngo.category === selectedCategory
      );
    }

    setFilteredNGOs(filtered);
  }, [ngos, search, selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  return (
    <div className="container py-8 bg-background dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar with search and filters */}
        <div className="lg:w-1/4">
          <Card className="p-6 bg-secondary/30 dark:bg-gray-800/50">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NGOs..."
                className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Filter by Category</h3>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    className="text-primary focus:ring-primary"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right side with NGO listings */}
        <div className="lg:w-3/4">
          {filteredNGOs.length === 0 ? (
            <div className="text-center p-8 bg-secondary/30 rounded-md">
              <p>No NGOs found matching your search criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNGOs.map((ngo) => (
                <NGOListItem key={ngo.id} ngo={ngo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// NGO List Item Component
const NGOListItem = ({ ngo }: { ngo: NGO }) => {
  return (
    <a href={`/ngo/${ngo.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={ngo.coverImage || "https://placehold.co/600x200/e2e8f0/64748b"} 
            alt={`${ngo.name} cover image`}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x200/e2e8f0/64748b";
            }}
          />
          
          <div className="absolute left-4 top-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={ngo.logo || "/placeholder.svg"} 
                alt={`${ngo.name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
          
          {ngo.verified && (
            <div className="absolute right-2 top-2 bg-white rounded-full p-1">
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          
          <div className="absolute left-4 bottom-4 bg-green-500/90 text-white px-2 py-1 text-xs rounded">
            Trust Score: {ngo.trustScore}
          </div>
          
          <div className="absolute right-4 bottom-4 text-xs text-white">
            Since {ngo.foundedYear}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{ngo.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{ngo.location}</p>
            </div>
            <span className="bg-secondary/50 text-xs px-2 py-1 rounded">
              {ngo.category}
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {ngo.description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default NGOs;
