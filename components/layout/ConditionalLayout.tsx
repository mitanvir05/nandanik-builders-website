"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we are on an admin or login route
  const isExcludedPage = pathname.startsWith("/admin") || pathname.startsWith("/login");

  // If it's an admin or login page, DO NOT render the public Navbar, Footer, or pt-20
  if (isExcludedPage) {
    return <>{children}</>;
  }

  // If it's a regular public page, render everything normally
  return (
    <>
      <Navbar />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
    </>
  );
}