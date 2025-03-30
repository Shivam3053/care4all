
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0 opacity-90"></div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Make Your Giving{" "}
            <span className="text-impact-500">Impactful & Transparent</span>
          </h1>
          <p className="mb-8 text-lg text-white/90">
            Connect with verified NGOs and track your impact in real-time.
            Support causes you care about with confidence and see how your
            donations are making a difference.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" asChild className="bg-white text-care-700 hover:bg-white/90">
              <Link to="/ngos">
                <Search className="mr-2 h-5 w-5" />
                Find NGOs
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/about">
                <Heart className="mr-2 h-5 w-5" />
                Why Care4All
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 -right-24 z-0 h-96 w-96 rounded-full bg-care-500 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 z-0 h-64 w-64 rounded-full bg-impact-500 opacity-40 blur-3xl"></div>
    </div>
  );
};

export default Hero;
