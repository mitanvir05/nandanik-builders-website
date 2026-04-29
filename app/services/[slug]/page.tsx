import { Metadata } from "next";
import { services } from "@/data/navigation";
import { notFound } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";

// 1. Update the type to expect a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. Make generateMetadata async and await the params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: `Details and information regarding our ${service.name} services at Nandanik Builders Ltd.`,
  };
}

// generateStaticParams remains the same
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 3. Make the page component async and await the params
export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <PageTransition>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.name}</h1>
      <p>Service detail content placeholder for {service.name}.</p>
    </PageTransition>
  );
}