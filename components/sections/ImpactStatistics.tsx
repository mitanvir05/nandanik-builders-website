"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// --- INTERFACES ---
interface District {
  id: string;
  name: string;
  lat: string;
  long: string;
}

// --- DATA ---
const statsData = [
  { value: 48, suffix: " +", label: "Professionals in our team" },
  { value: 10, suffix: " +", label: "Years of Experience" },
  { value: 102, suffix: " +", label: "Completed Projects" },
  { value: 80000, suffix: " +", label: "Pile Driven" },
];

// Map URLs
const geoUrl =
  "https://raw.githubusercontent.com/ifahimreza/bangladesh-geojson/master/bangladesh.geojson";
const markersUrl =
  "https://raw.githubusercontent.com/ifahimreza/bangladesh-geojson/master/bd-districts.json";

export default function ImpactStatistics() {
  const [tooltip, setTooltip] = useState("");
  const [districtMarkers, setDistrictMarkers] = useState<District[]>([]);

  useEffect(() => {
    fetch(markersUrl)
      .then((res) => res.json())
      .then((data) => setDistrictMarkers(data.districts))
      .catch((err) => console.error("Failed to load district points:", err));
  }, []);

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: INTERACTIVE MAP */}
          <div className="lg:col-span-5 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center bg-bg rounded-3xl p-4 border border-gray-100">
            {tooltip && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-primary text-white px-4 py-2 rounded-lg shadow-xl font-medium text-sm whitespace-nowrap pointer-events-none">
                {tooltip}
              </div>
            )}

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 8800,
                center: [90.3, 23.9],
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        const districtName =
                          geo.properties.NAME_2 ||
                          geo.properties.name ||
                          geo.properties.ADM2_EN ||
                          "District";
                        setTooltip(districtName);
                      }}
                      onMouseLeave={() => setTooltip("")}
                      style={{
                        default: {
                          fill: "#2B325A",
                          outline: "none",
                          stroke: "#3B82F6",
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: "#3B82F6",
                          outline: "none",
                          cursor: "pointer",
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

              {/* DISTRICT MARKERS */}
              {districtMarkers.map((district) => (
                <Marker
                  key={district.id}
                  coordinates={[
                    parseFloat(district.long),
                    parseFloat(district.lat),
                  ]}
                  onMouseEnter={() => setTooltip(district.name)}
                  onMouseLeave={() => setTooltip("")}
                >
                  <g
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-6, -12) scale(0.5)"
                    className="cursor-pointer transition-transform hover:scale-75"
                  >
                    <path
                      d="M12 21c4-4 8-10 8-14A8 8 0 1 0 4 7c0 4 4 10 8 14z"
                      fill="#10b981"
                      fillOpacity="0.3"
                    />
                    <circle cx="12" cy="7" r="3" fill="#10b981" />
                  </g>

                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{
                      fontFamily: "system-ui",
                      fill: "#10b981",
                      fontSize: "5px",
                      fontWeight: "bold",
                      pointerEvents: "none",
                    }}
                  >
                    {district.name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* RIGHT COLUMN: STATISTICS */}
          <div className="lg:col-span-7 lg:pl-10">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Delivering Excellence at Scale
              </h2>
              <p className="text-lg text-slate leading-relaxed">
                Our network stretches across all 64 districts. With a vast fleet
                of equipment and experts, we execute the most challenging
                foundation projects in Bangladesh.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="bg-primary p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-baseline justify-center mb-2">
                      <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {new Intl.NumberFormat("en-US").format(stat.value)}
                      </h3>
                      <span className="text-3xl md:text-4xl font-bold text-accent ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-gray-300 font-medium text-sm uppercase tracking-wider mt-2">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
