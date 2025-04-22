import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedNGOs from "@/components/FeaturedNGOs";
import CategoriesSection from "@/components/CategoriesSection";
import Testimonials from "@/components/Testimonials";
import ImpactStats from "@/components/ImpactStats";
import NewsletterSection from "@/components/NewsletterSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedNGOs />
      <CategoriesSection />
      <ImpactStats />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default Home;
