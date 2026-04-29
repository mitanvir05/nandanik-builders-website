import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the expert construction, piling, and real estate services offered by Nandanik Builders Ltd.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h1>
      <p>Services overview content placeholder.</p>
    </PageTransition>
  );
}