"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCrosshair,
  FiTruck,
  FiSettings,
  FiUsers,
  FiZap,
  FiAward,
  FiThumbsUp,
} from "react-icons/fi";

const strengths = [
  {
    title: "Proven Experience",
    description:
      "Successfully completed numerous piling projects nationwide across industrial, commercial, and infrastructure sectors.",
    icon: FiBriefcase,
  },
  {
    title: "Specialized Expertise",
    description:
      "Expert in RCC square piles and PHC/SPC piles, providing the right solution for diverse soil and project requirements.",
    icon: FiCrosshair,
  },
  {
    title: "Largest HSPD Fleet",
    description:
      "Equipped with one of the largest fleets of Hydraulic Static Pile Drivers (HSPD) in Bangladesh for high-capacity and vibration-free piling.",
    icon: FiTruck,
  },
  {
    title: "Advanced Equipment",
    description:
      "Utilizing modern Automatic Diesel Hammer (ADH) systems for efficient and precise pile driving operations.",
    icon: FiSettings,
  },
  {
    title: "Strong Technical Team",
    description:
      "Our highly qualified and experienced technical team ensures efficient execution and quality workmanship in every project.",
    icon: FiUsers,
  },
  {
    title: "Fast & Efficient Execution",
    description:
      "Powerful equipment and skilled manpower enable timely project completion without compromising quality.",
    icon: FiZap,
  },
  {
    title: "Quality & Reliability",
    description:
      "We maintain strict construction standards through proper planning, supervision, and execution.",
    icon: FiAward,
  },
  {
    title: "Trusted by Leading Clients",
    description:
      "Successfully worked with major government and private organizations across Bangladesh.",
    icon: FiThumbsUp,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Why Choose <br />
              <span className="text-accent">The Nandanik Builders Advantage</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Nandanik Builders Ltd. is a trusted leader in Bangladesh's precast
              pile foundation industry, delivering reliable, efficient, and
              high-performance foundation solutions across the country.
            </p>

            {/* Optional Stat/Highlight Block */}
            {/* <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hidden md:block">
              <p className="font-semibold text-lg text-white mb-2">
                Our Core Strength
              </p>
              <p className="text-sm text-gray-400">
                Combining the largest HSPD fleet with specialized expertise to
                tackle Bangladesh's most challenging soil conditions.
              </p>
            </div> */}
          </motion.div>

          {/* Right Column: Strengths Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {strengths.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-2xl transition-shadow duration-300"
                >
                  <Icon className="text-accent size-8 mb-5" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
