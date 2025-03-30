
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Book, Heart, Leaf, Users, User, Home, Sparkles, AlertCircle, Cloud, HandHeart } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Education": <Book className="h-6 w-6" />,
  "Healthcare": <Heart className="h-6 w-6" />,
  "Environment": <Leaf className="h-6 w-6" />,
  "Animal Welfare": <Sparkles className="h-6 w-6" />,
  "Children": <Users className="h-6 w-6" />,
  "Women Empowerment": <User className="h-6 w-6" />,
  "Elderly Care": <Home className="h-6 w-6" />,
  "Disability Support": <HandHeart className="h-6 w-6" />,
  "Disaster Relief": <AlertCircle className="h-6 w-6" />,
  "Poverty Alleviation": <Cloud className="h-6 w-6" />,
};

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Explore by Category
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find NGOs working in areas you're passionate about.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/ngos?category=${category}`}
              className="block h-full"
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    {categoryIcons[category] || <Leaf className="h-6 w-6" />}
                  </div>
                  <span className="text-sm font-medium">{category}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link to="/ngos">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
