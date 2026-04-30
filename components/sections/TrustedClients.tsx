"use client";

import { motion } from "framer-motion";
import { 
  FiGlobe, 
  FiBox, 
  FiTriangle, 
  FiHexagon, 
  FiCommand, 
  FiTarget, 
  FiHome, 
  FiLayers 
} from "react-icons/fi";

// Mock data for client logos using icons as placeholders
const clients = [
  { name: "Apex Infrastructure", icon: FiTriangle },
  { name: "Global Builders", icon: FiGlobe },
  { name: "Metro Developments", icon: FiBox },
  { name: "Summit Engineering", icon: FiHexagon },
  { name: "Pioneer Real Estate", icon: FiHome },
  { name: "National Grid", icon: FiCommand },
  { name: "Prime Foundations", icon: FiTarget },
  { name: "Dynamic Group", icon: FiLayers },
];

export default function TrustedClients() {
  // We duplicate the clients array so the infinite scroll loops seamlessly
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-sm font-semibold text-accent tracking-widest uppercase">
          Trusted by Leading Organizations
        </p>
      </div>

      {/* Ticker Container */}
      <div className="relative w-full flex items-center">
        
        {/* Left/Right Gradient Masks for smooth fade-in/out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 // Adjust this number to make it scroll faster or slower
          }}
          className="flex whitespace-nowrap items-center"
        >
          {duplicatedClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div 
                key={index} 
                className="flex items-center justify-center mx-8 md:mx-16 group grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-shadow duration-300 cursor-pointer"
              >
                {/* 
                  When you have real images, replace this icon/text block with:
                  <Image src={client.logoUrl} alt={client.name} width={120} height={60} className="object-contain" /> 
                */}
                <Icon className="size-8 md:size-10 text-primary mr-3" />
                <span className="text-xl md:text-2xl font-bold text-slate tracking-tight">
                  {client.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}