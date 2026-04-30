import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Available Equipment",
  description:
    "Browse the heavy machinery and construction equipment available at Nandanik Builders Ltd.",
};

export default function EquipmentPage() {
  return (
    <PageTransition>
      <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Available Equipment
      </h1>
      <p>Equipment content placeholder.</p>
      </div>
    </PageTransition>
  );
}
