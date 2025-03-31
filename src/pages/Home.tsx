
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedNGOs from "@/components/FeaturedNGOs";
import CategoriesSection from "@/components/CategoriesSection";
import Testimonials from "@/components/Testimonials";
import ImpactStats from "@/components/ImpactStats";
import NewsletterSection from "@/components/NewsletterSection";
import ExtensionPromo from "@/components/ExtensionPromo";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedNGOs />
      <ExtensionPromo />
      <CategoriesSection />
      <ImpactStats />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default Home;
