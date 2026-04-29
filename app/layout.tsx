import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nandanikbuilders.com"),
  title: {
    default: "Nandanik Builders Ltd",
    template: "%s | Nandanik Builders Ltd",
  },
  description:
    "Leading construction, precast pile driving, and real estate development company.",
  keywords: [
    "Construction",
    "Pile Driving",
    "Precast Square Pile",
    "Pile Testing",
    "Real Estate",
    "Nandanik Builders",
  ],
  openGraph: {
    title: "Nandanik Builders Ltd",
    description: "Leading construction and pile driving company",
    url: "https://nandanikbuilders.com",
    siteName: "Nandanik Builders Ltd",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nandanik Builders Ltd",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nandanik Builders Ltd",
    description: "Leading construction and pile driving company",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-bg text-slate antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
