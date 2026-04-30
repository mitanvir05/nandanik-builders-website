"use client";

import { motion, Variants } from "framer-motion";
import {
  FiShield,
  FiAward,
  FiClock,
  FiArrowDown,
  FiLayout,
  FiLock,
  FiCloudOff,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

const advantages = [
  {
    title: "Reliable in Weak Soil",
    description:
      "Performs well in soft soil and high groundwater without risk of bore collapse or concrete washout.",
    icon: FiShield,
  },
  {
    title: "Consistent Quality Control",
    description:
      "Strict quality in factory-made PHC piles and site-cast RCC square piles through controlled processes.",
    icon: FiAward,
  },
  {
    title: "Faster Construction",
    description:
      "Ready-made piles allow quick installation with no need for on-site casting or curing time.",
    icon: FiClock,
  },
  {
    title: "Flexible Driving Depth",
    description:
      "Can be driven to required depths, including below existing ground level, or maintained above EGL.",
    icon: FiArrowDown,
  },
  {
    title: "Cleaner Site Operations",
    description:
      "No slurry handling or mud disposal, ensuring a more organized and efficient work environment.",
    icon: FiLayout,
  },
  {
    title: "High Structural Integrity",
    description:
      "Reduces risks of defects such as honeycombing, necking, and voids in the foundation.",
    icon: FiLock,
  },
  {
    title: "Weather-Independent",
    description:
      "Unaffected by rain or flooding, ensuring smooth project progress regardless of the season.",
    icon: FiCloudOff,
  },
  {
    title: "Immediate Load Capacity",
    description:
      "Piles can carry load immediately after driving, significantly speeding up construction.",
    icon: FiTrendingUp,
  },
  {
    title: "Cost-Efficient Solution",
    description:
      "Less wastage, faster work, and lower risk help reduce the overall project cost.",
    icon: FiDollarSign,
  },
];

// Framer motion variants for the staggered grid animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PrecastAdvantages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Why Precast Piles Are Preferred in Bangladesh
          </h2>
          <p className="text-lg text-slate leading-relaxed">
            Precast RCC piles are a reliable foundation solution for
            Bangladesh's challenging soil conditions, ensuring faster
            construction and long-term durability.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-bg p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                  <Icon className="size-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {adv.title}
                </h3>
                <p className="text-slate leading-relaxed text-sm">
                  {adv.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
