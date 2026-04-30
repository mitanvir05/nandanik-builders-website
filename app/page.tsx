import PageTransition from "@/components/ui/PageTransition";
import HeroCarousel from "@/components/ui/HeroCarousel";
import EquipmentSelectionGuide from "@/components/sections/EquipmentSelectionGuide";
import TechnicalCapabilities from "@/components/sections/TechnicalCapabilities";
import PrecastAdvantages from "@/components/sections/PrecastAdvantages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ImpactStatistics from "@/components/sections/ImpactStatistics"; // <-- Add this
import TrustedClients from "@/components/sections/TrustedClients";
import EquipmentSpecifications from "@/components/sections/EquipmentSpecifications";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Carousel */}
      <HeroCarousel />
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
    </PageTransition>
  );
}
