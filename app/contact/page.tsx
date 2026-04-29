import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nandanik Builders Ltd for your next construction or real estate project.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
      <p>Contact form and details placeholder.</p>
    </PageTransition>
  );
}
