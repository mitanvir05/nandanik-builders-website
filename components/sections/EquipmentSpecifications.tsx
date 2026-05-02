"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiSliders } from "react-icons/fi";

// --- DATA FROM YOUR IMAGE ---

const hspdData = [
  { model: "HSPD 600 Ton/2020", crane: "25 Ton", dim: "48'-0\"x 28'-0\"", centerLoad: "500 Ton", sideLoad: "300 Ton", sideSpace: "4'-6\"" },
  { model: "HSPD 618 Ton/2021", crane: "25 Ton", dim: "50'-0\"x 27'-0\"", centerLoad: "450 Ton", sideLoad: "290 Ton", sideSpace: "4'-6\"" },
  { model: "HSPD 550 Ton/2018", crane: "25 Ton", dim: "47'-0\"x 26'-0\"", centerLoad: "400 Ton", sideLoad: "250 Ton", sideSpace: "4'-0\"" },
  { model: "HSPD 500 Ton/2023", crane: "25 Ton", dim: "47'-0\"x 26'-0\"", centerLoad: "400 Ton", sideLoad: "250 Ton", sideSpace: "4'-0\"" },
  { model: "HSPD 500 Ton/2022", crane: "25 Ton", dim: "47'-0\"x 26'-0\"", centerLoad: "400 Ton", sideLoad: "250 Ton", sideSpace: "4'-0\"" },
  { model: "HSPD 420 Ton/2016", crane: "20 Ton", dim: "41'-0\"x 28'-0\"", centerLoad: "350 Ton", sideLoad: "200 Ton", sideSpace: "4'-0\"" },
  { model: "HSPD 360 Ton/2023", crane: "25 Ton", dim: "43'-0\"x 24'-0\"", centerLoad: "300 Ton", sideLoad: "200 Ton", sideSpace: "4'-0\"" },
  { model: "HSPD 320 Ton/2016", crane: "16 Ton", dim: "39'-0\"x 23'-0\"", centerLoad: "250 Ton", sideLoad: "150 Ton", sideSpace: "3'-0\"" },
  { model: "HSPD 240 Ton/2015", crane: "12 Ton", dim: "36'-0\"x 17'-0\"", centerLoad: "180 Ton", sideLoad: "90 Ton",  sideSpace: "2'-6\"" },
];

const adhData = [
  { model: "HD 62/2020", dim: "37'-4\"x 22'-10\"", weight: "12300 kg" },
  { model: "HD 50/2018", dim: "37'-4\"x 22'-10\"", weight: "10400 kg" },
  { model: "HD 46/2019", dim: "37'-4\"x 22'-10\"", weight: "9200 kg" },
];

export default function EquipmentSpecifications() {
  const [activeTab, setActiveTab] = useState<"hspd" | "adh">("hspd");

  return (
    <section className="py-24 bg-bg border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Detailed Technical Specifications
          </h2>
          <p className="text-lg text-slate leading-relaxed">
            Compare our diverse range of equipment with these detailed technical specifications tables for our HSPD (Hydraulic Static Pile Driver) and ADH (Automatic Diesel Hammer) models.
          </p>
        </motion.div>

        {/* Custom Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab("hspd")}
              className={`flex items-center px-6 py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === "hspd" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-slate hover:text-primary hover:bg-gray-50"
              }`}
            >
              <FiSettings className="mr-2" />
              HSPD Models
            </button>
            <button
              onClick={() => setActiveTab("adh")}
              className={`flex items-center px-6 py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === "adh" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-slate hover:text-primary hover:bg-gray-50"
              }`}
            >
              <FiSliders className="mr-2" />
              ADH Models
            </button>
          </div>
        </div>

        {/* Tab Content Wrapper */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* HSPD TABLE */}
            {activeTab === "hspd" && (
              <motion.div
                key="hspd"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th rowSpan={2} className="px-6 py-4 font-semibold text-sm border-r border-white/10 align-bottom">Model & Mfg. year</th>
                      <th rowSpan={2} className="px-6 py-4 font-semibold text-sm border-r border-white/10 align-bottom">Crane<br/>Capacity</th>
                      <th rowSpan={2} className="px-6 py-4 font-semibold text-sm border-r border-white/10 align-bottom">Working Dimension<br/>(Length x Width)</th>
                      <th rowSpan={2} className="px-6 py-4 font-semibold text-sm border-r border-white/10 align-bottom">Rated Load<br/>(Center Piling)</th>
                      <th colSpan={2} className="px-6 py-3 font-semibold text-sm text-center border-b border-white/10">Cantilever / Side Piling</th>
                    </tr>
                    <tr>
                      <th className="px-6 py-3 font-semibold text-sm border-r border-t border-white/10 text-center bg-primary/90">Rated Load</th>
                      <th className="px-6 py-3 font-semibold text-sm border-t border-white/10 text-center bg-primary/90">Min Space<br/>to Operate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {hspdData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors even:bg-gray-50/50">
                        <td className="px-6 py-4 text-sm font-medium text-primary border-r border-gray-100">{row.model}</td>
                        <td className="px-6 py-4 text-sm text-slate border-r border-gray-100">{row.crane}</td>
                        <td className="px-6 py-4 text-sm text-slate border-r border-gray-100 font-mono tracking-tight">{row.dim}</td>
                        <td className="px-6 py-4 text-sm text-slate border-r border-gray-100 font-medium">{row.centerLoad}</td>
                        <td className="px-6 py-4 text-sm text-slate border-r border-gray-100 text-center">{row.sideLoad}</td>
                        <td className="px-6 py-4 text-sm text-slate text-center font-mono tracking-tight">{row.sideSpace}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* ADH TABLE */}
            {activeTab === "adh" && (
              <motion.div
                key="adh"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-5 font-semibold text-sm border-r border-white/10 w-1/3">Model & Mfg. year</th>
                      <th className="px-6 py-5 font-semibold text-sm border-r border-white/10 w-1/3">Working Dimension (Length x Width)</th>
                      <th className="px-6 py-5 font-semibold text-sm w-1/3">Hammer Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adhData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors even:bg-gray-50/50">
                        <td className="px-6 py-5 text-sm font-medium text-primary border-r border-gray-100">{row.model}</td>
                        <td className="px-6 py-5 text-sm text-slate border-r border-gray-100 font-mono tracking-tight">{row.dim}</td>
                        <td className="px-6 py-5 text-sm text-slate font-medium">{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}