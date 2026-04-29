import type { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Projects & Clients",
  description:
    "View our portfolio of successful construction projects and our trusted corporate clients.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Projects & Clients
      </h1>
      <p>Projects and clients content placeholder.</p>
    </PageTransition>
  );
}
