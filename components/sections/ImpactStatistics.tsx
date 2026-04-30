"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// --- ANIMATED COUNTER HELPER ---
function AnimatedCounter({
  from = 0,
  to,
  duration = 2.5,
}: {
  from?: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Intl.NumberFormat("en-US").format(
            Math.floor(value),
          );
        }
      },
    });
    return () => controls.stop();
  }, [from, to, inView, duration]);

  return <span ref={nodeRef}>{from}</span>;
}

// --- DATA ---
const statsData = [
  { value: 48, suffix: " +", label: "Professionals in our team" },
  { value: 10, suffix: " +", label: "Years of Experience" },
  { value: 102, suffix: " +", label: "Complete Projects" },
  { value: 80000, suffix: " +", label: "Pile Driven" },
];

// Major project hubs (Longitude, Latitude)
// Major project hubs across Bangladesh (Longitude, Latitude)
const markers = [
  // Divisional Headquarters
  { name: "Dhaka", coordinates: [90.4125, 23.8103], projects: 42 },
  { name: "Chittagong", coordinates: [91.8315, 22.3569], projects: 28 },
  { name: "Khulna", coordinates: [89.5403, 22.8456], projects: 15 },
  { name: "Sylhet", coordinates: [91.8687, 24.8949], projects: 12 },
  { name: "Rajshahi", coordinates: [88.6011, 24.3636], projects: 8 },
  { name: "Barisal", coordinates: [90.3563, 22.701], projects: 6 },
  { name: "Rangpur", coordinates: [89.25, 25.75], projects: 5 },
  { name: "Mymensingh", coordinates: [90.4, 24.75], projects: 7 },

  // Major Industrial & Commercial Hubs
  { name: "Narayanganj", coordinates: [90.5, 23.6333], projects: 14 },
  { name: "Gazipur", coordinates: [90.4125, 24.0], projects: 18 },
  { name: "Comilla", coordinates: [91.1802, 23.4607], projects: 9 },
  { name: "Bogra", coordinates: [89.3667, 24.85], projects: 6 },
  { name: "Jessore", coordinates: [89.2167, 23.1667], projects: 4 },

  // Important Regional Districts
  { name: "Dinajpur", coordinates: [88.6333, 25.6333], projects: 3 },
  { name: "Pabna", coordinates: [89.25, 24.0167], projects: 4 },
  { name: "Tangail", coordinates: [89.9167, 24.25], projects: 5 },
  { name: "Faridpur", coordinates: [89.8333, 23.6], projects: 3 },
  { name: "Cox's Bazar", coordinates: [91.9833, 21.4333], projects: 7 }, // High coastal development
  { name: "Brahmanbaria", coordinates: [91.1167, 23.9667], projects: 2 },
  { name: "Jamalpur", coordinates: [89.9333, 24.9333], projects: 2 },
  { name: "Kushtia", coordinates: [89.1333, 23.9], projects: 3 },
  { name: "Noakhali", coordinates: [91.1, 22.8667], projects: 4 },
  { name: "Patuakhali", coordinates: [90.3333, 22.3667], projects: 5 }, // Payra port area
  { name: "Rangamati", coordinates: [92.1833, 22.6333], projects: 1 },
];

// This is a reliable, open-source CDN link for the TopoJSON of Bangladesh
const geoUrl =
  "https://raw.githubusercontent.com/ifahimreza/bangladesh-geojson/master/bangladesh.geojson";

export default function ImpactStatistics() {
  const [tooltip, setTooltip] = useState("");

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: INTERACTIVE MAP */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center bg-bg rounded-3xl p-4 border border-gray-100"
          >
            {/* Tooltip Overlay */}
            {tooltip && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-primary text-white px-4 py-2 rounded-lg shadow-xl font-medium text-sm whitespace-nowrap pointer-events-none transition-opacity">
                {tooltip}
              </div>
            )}

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 7500, center: [90.4, 23.8] }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        // Extract district name from your TopoJSON properties
                        const districtName =
                          geo.properties.NAME_2 ||
                          geo.properties.name ||
                          "District";
                        setTooltip(`${districtName}`);
                      }}
                      onMouseLeave={() => {
                        setTooltip("");
                      }}
                      style={{
                        default: {
                          fill: "#2B325A", // Your Deep Navy (--color-primary)
                          outline: "none",
                          stroke: "#3B82F6", // Accent color for borders
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: "#3B82F6", // Bright blue on hover (--color-accent)
                          outline: "none",
                          cursor: "pointer",
                          transition: "all 250ms",
                        },
                        pressed: {
                          fill: "#1e3a8a",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* MARKERS */}
              {markers.map(({ name, coordinates, projects }) => (
                <Marker
                  key={name}
                  coordinates={coordinates as [number, number]}
                  onMouseEnter={() =>
                    setTooltip(`${name} Hub: ${projects} Active Projects`)
                  }
                  onMouseLeave={() => setTooltip("")}
                >
                  <circle
                    r={6}
                    fill="#4CAF50"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                  <circle
                    r={14}
                    fill="#4CAF50"
                    opacity={0.3}
                    className="animate-ping origin-center pointer-events-none"
                  />
                </Marker>
              ))}
            </ComposableMap>

            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 text-center pointer-events-none hidden">
              <p className="text-primary font-bold">Interactive Coverage Map</p>
              <p className="text-sm text-slate">
                Hover over districts & hubs to view details
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: STATISTICS */}
          <div className="lg:col-span-7 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Delivering Excellence at Scale
              </h2>
              <p className="text-lg text-slate leading-relaxed">
                Our network stretches across all 64 districts. With a vast fleet
                of equipment and experts, we execute the most challenging
                foundation projects in Bangladesh.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-primary p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-baseline justify-center mb-2">
                      <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        <AnimatedCounter to={stat.value} />
                      </h3>
                      <span className="text-3xl md:text-4xl font-bold text-accent ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-gray-300 font-medium text-sm uppercase tracking-wider mt-2">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
