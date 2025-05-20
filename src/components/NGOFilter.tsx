
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

export interface NGOFilterProps {
  onCategoryChange: (categories: string[]) => void;
}

const NGOFilter = ({ onCategoryChange }: NGOFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newSelected: string[];
    
    if (checked) {
      newSelected = [...selectedCategories, category];
    } else {
      newSelected = selectedCategories.filter(c => c !== category);
    }
    
    setSelectedCategories(newSelected);
    onCategoryChange(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    onCategoryChange([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> 
          Filter by Category
        </h3>
        {selectedCategories.length > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 group">
            <Checkbox 
              id={`category-${category}`} 
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) => 
                handleCategoryChange(category, checked === true)
              }
              className="border-gray-400 dark:border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={`category-${category}`}
              className="text-sm cursor-pointer group-hover:text-primary transition-colors"
            >
              {category}
            </Label>
          </div>
        ))}
      </div>
      
      <div className="pt-2 border-t dark:border-gray-700">
        <div className="text-xs text-muted-foreground">
          {selectedCategories.length === 0 
            ? "All categories shown" 
            : `${selectedCategories.length} ${selectedCategories.length === 1 ? 'category' : 'categories'} selected`}
        </div>
      </div>
    </div>
  );
};

export default NGOFilter;
