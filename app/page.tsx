import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties";
import WhyChooseUs from "@/components/why-choose-us";
import LatestBlog from "@/components/latest-blog";
import ContactCTA from "@/components/contact-cta";
import PropertyCategories from "@/components/property-categories";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <Hero />
      <PropertyCategories />
      <FeaturedProperties />
      <WhyChooseUs />
      <LatestBlog />
      <ContactCTA />
    </div>
  );
}