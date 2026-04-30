import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about the history, mission, and vision of Nandanik Builders Ltd.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
      <p>About content placeholder.</p>
      </div>
    </PageTransition>
  );
}
