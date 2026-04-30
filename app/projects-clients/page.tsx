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
      <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <h1 className="text-3xl font-bold text-primary mb-6">
        Projects & Clients
      </h1>
      
      <p>Projects and clients content placeholder...</p>
      
    </div>
    </PageTransition>
  );
}
