
import CategoriesSection from "@/components/CategoriesSection";
import ExtensionPromo from "@/components/ExtensionPromo";
import FeaturedNGOs from "@/components/FeaturedNGOs";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ImpactStats from "@/components/ImpactStats";
import NewsletterSection from "@/components/NewsletterSection";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <ImpactStats />
      <HowItWorks />
      <FeaturedNGOs />
      <ExtensionPromo />
      <CategoriesSection />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default Home;
