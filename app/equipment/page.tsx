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
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Available Equipment
      </h1>
      <p>Equipment content placeholder.</p>
    </PageTransition>
  );
}
