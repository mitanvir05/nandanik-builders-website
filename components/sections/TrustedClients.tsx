"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Marico", logoUrl: "/clients/marico.png" },
  { name: "Transcom Electronics", logoUrl: "/clients/transcom.png" },
  { name: "Walton", logoUrl: "/clients/walton.png" },
  { name: "Akij Group", logoUrl: "/clients/akij.png" },
  { name: "Bashundhara Group", logoUrl: "/clients/bashundhara.png" },
  { name: "City Group", logoUrl: "/clients/city-group.png" },
];

export default function TrustedClients() {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-sm font-semibold text-accent tracking-widest uppercase">
          Trusted by Leading Organizations
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex items-center gap-10 md:gap-16 min-w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={180}
                height={80}
                className="h-10 md:h-14 w-auto object-contain"
                priority={index < 6}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
