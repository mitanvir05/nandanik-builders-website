import PageTransition from "@/components/ui/PageTransition";
import HeroCarousel from "@/components/ui/HeroCarousel";
import EquipmentSelectionGuide from "@/components/sections/EquipmentSelectionGuide";
import TechnicalCapabilities from "@/components/sections/TechnicalCapabilities";
import PrecastAdvantages from "@/components/sections/PrecastAdvantages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ImpactStatistics from "@/components/sections/ImpactStatistics";
import TrustedClients from "@/components/sections/TrustedClients";
import EquipmentSpecifications from "@/components/sections/EquipmentSpecifications";
import CompanyIntro from "@/components/sections/CompanyIntro";

// 1. Import your server action
import { getSlides } from "@/actions/carousel.actions";

// 2. Add Edge Caching (ISR) - Refreshes the cache every hour (3600 seconds)
export const revalidate = 3600;

// 3. Make the main function async so it can await database calls
export default async function Home() {
  // 4. Fetch the slides on the server before the page even loads
  let featuredSlides = [];
  try {
    const data = await getSlides();
    featuredSlides = data.filter((slide: any) => slide.isFeatured);
  } catch (error) {
    console.error("Failed to fetch slides for homepage:", error);
  }

  return (
    <PageTransition>
      <main className="overflow-x-hidden w-full">
        {/* 5. Pass the fetched data directly into the client component */}
        <HeroCarousel slides={featuredSlides} />

        {/* Company Introduction */}
        <CompanyIntro />

        {/* Detailed Specs Tables */}
        <EquipmentSpecifications />

        {/* Equipment Selection Matrix Section */}
        <EquipmentSelectionGuide />

        {/* Technical Capabilities Section */}
        <TechnicalCapabilities />

        {/* Why Precast Piles Advantages Grid */}
        <PrecastAdvantages />

        {/* Why Choose Us / Strengths Section */}
        <WhyChooseUs />

        {/* Map & Statistics Section */}
        <ImpactStatistics />

        {/* Infinite Scrolling Client Logos */}
        <TrustedClients />
      </main>
    </PageTransition>
  );
}
