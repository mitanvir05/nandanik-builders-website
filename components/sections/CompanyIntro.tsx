"use client";

import { motion } from "framer-motion";

export default function CompanyIntro() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FIX 1: Changed "gap-12" to "gap-8" to reduce the vertical space on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
          
          {/* Left Column: Heading & First Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Small Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6 border border-blue-100">
              <span className="text-md font-semibold text-primary tracking-wide uppercase">
                Welcome to Nandanik Builders
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              Innovative Excellence <br /> in Precast Pile Driving Technologies
            </h2>

            <p className="text-lg md:text-xl text-slate leading-relaxed font-medium">
              Nandanik Builders Ltd. is a leading force in Bangladesh’s precast
              pile foundation industry, with one of the highest numbers of
              successfully completed projects nationwide. We specialize in RCC
              square piles, PHC/SPC piles, delivering durable and
              high-performance foundation solutions for diverse construction
              needs.
            </p>
          </motion.div>

          {/* Right Column: Second Paragraph & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:pl-10 lg:border-l-2 border-gray-100"
          >
            <p className="text-lg md:text-xl font-medium text-slate leading-relaxed mb-2">
              {/* FIX 2: Added explicit spaces {" "} before and after the strong tag */}
              With the{" "}
              <strong className="text-primary font-bold">
                largest fleet of Hydraulic Static Pile Drivers (HSPD)
              </strong>{" "}
              in the country, along with advanced ADH (Automatic Diesel Hammer)
              systems, we ensure fast, efficient and precise pile driving
              operations. Our strength lies in combining cutting-edge equipment,
              technical expertise and a commitment to quality making us a
              trusted partner for modern infrastructure development.
            </p>

            {/* Stylized visual flourish to end the section */}
            <div className="flex items-center space-x-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Trusted Nationwide
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}