import { Metadata } from "next";
import { services } from "@/data/navigation";
import { notFound } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: `Details and information regarding our ${service.name} services at Nandanik Builders Ltd.`,
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

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
