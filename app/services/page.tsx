import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the expert construction, piling, and real estate services offered by Nandanik Builders Ltd.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h1>
      <p>Services overview content placeholder.</p>
      </div>
    </PageTransition>
  );
}