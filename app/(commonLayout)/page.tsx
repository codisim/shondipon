import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroSection } from "@/components/home/hero";
import { PopularPresentations } from "@/components/home/PopularPresentations";

export default function Home() {
  return (
   <>
      <HeroSection />
      {/* <HeroSection2 /> */}
      <FeaturedCategories />
      <PopularPresentations />
    </>
  );
}
