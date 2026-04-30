"use client";

import { motion } from "framer-motion";
import { FiLayers, FiTrendingUp, FiZap, FiCheckCircle } from "react-icons/fi";

const hspdData = [
  { soil: "Clay / Plastic Clay", spt: "Up to 40-50 SPT" },
  { soil: "Fine Sand", spt: "Up to 30 SPT" },
  { soil: "Coarse Sand", spt: "Up to 25 SPT" },
];

export default function TechnicalCapabilities() {
  return (
    <section className="py-24 bg-bg border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Technical Capabilities: Soil & SPT Values
          </h2>
          <p className="text-lg text-slate leading-relaxed">
            Understanding soil resistance is critical for equipment longevity and structural integrity. 
            Below are our operational thresholds for different pile driving technologies.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* HSPD Performance Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                <FiTrendingUp className="text-accent size-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary">HSPD Performance</h3>
            </div>
            
            <ul className="space-y-6">
              {hspdData.map((item, index) => (
                <li key={index} className="flex items-start">
                  <FiCheckCircle className="text-success mt-1 mr-4 flex-shrink-0 size-5" />
                  <div>
                    <p className="font-semibold text-primary text-lg">{item.soil}</p>
                    <p className="text-slate font-medium bg-gray-50 inline-block px-3 py-1 rounded-md mt-1 text-sm">
                      {item.spt}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ADH Advantage Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary p-8 md:p-10 rounded-2xl shadow-lg flex flex-col justify-center relative overflow-hidden"
          >
            {/* Background Decorative Icon */}
            <FiLayers className="absolute -bottom-10 -right-10 text-white/5 size-64" />

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4 backdrop-blur-sm">
                  <FiZap className="text-accent size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">The ADH Advantage</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                For soil strata exceeding these standard SPT values or when facing highly variable underground conditions, our 
                <span className="text-white font-semibold"> Automatic Diesel Hammer (ADH) </span> 
                is heavily recommended.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                It provides the superior penetration power required to ensure piles reach their designed depth safely and effectively without compromising the equipment or foundation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}