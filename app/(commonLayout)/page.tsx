import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HeroSection } from "@/components/home/hero";
import { PopularPresentations } from "@/components/home/PopularPresentations";
import { HeroSection2 } from '../../components/home/Hero2';

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
