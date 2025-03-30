
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories, locations } from "@/data/mockData";
import { Search } from "lucide-react";

interface NGOFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    location: string;
    verifiedOnly: boolean;
  }) => void;
}

const NGOFilter = ({ onFilterChange }: NGOFilterProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    onFilterChange({
      search,
      category,
      location,
      verifiedOnly,
    });
  }, [search, category, location, verifiedOnly, onFilterChange]);

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Find NGOs</h3>
        <div className="relative">
          <Input
            placeholder="Search NGOs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="location">Location</Label>
        <Select
          value={location}
          onValueChange={setLocation}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
        />
        <Label htmlFor="verified">Verified NGOs only</Label>
      </div>
    </div>
  );
};

export default NGOFilter;
