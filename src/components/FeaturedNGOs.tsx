
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getFeaturedNGOs, type NGO } from "@/data/mockData";
import NGOCard from "./NGOCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedNGOs = () => {
  const [ngos, setNgos] = useState<NGO[]>([]);

  useEffect(() => {
    // Get 3 featured NGOs from our mock data
    setNgos(getFeaturedNGOs(3));
  }, []);

  return (
    <section className="bg-secondary/50 py-16 dark:bg-gray-800/50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Featured NGOs
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover verified NGOs making significant impacts in various sectors.
            These organizations have demonstrated transparency and effectiveness
            in their work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ngos.map((ngo) => (
            <NGOCard key={ngo.id} ngo={ngo} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/ngos" className="group">
              View All NGOs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNGOs;
