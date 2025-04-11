
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Filter by Category</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox 
              id={`category-${category}`} 
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) => 
                handleCategoryChange(category, checked === true)
              }
            />
            <Label 
              htmlFor={`category-${category}`}
              className="text-sm cursor-pointer"
            >
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOFilter;
