"use client";

import { motion } from "framer-motion";

const matrixData = [
  {
    plotSize: "3 to 10 Katha",
    equipment: "HSPD (240 Ton) or ADH",
    considerations: "Design load, access roadways, and surrounding soil conditions.",
  },
  {
    plotSize: "More than 10 Katha",
    equipment: "HSPD (320/360 Ton) or ADH",
    considerations: "Soil conditions, pile length, and site access.",
  },
  {
    plotSize: "Larger Projects",
    equipment: "HSPD (420/500/600 Ton) or ADH",
    considerations: "Soil type, design load, and maximum pile length requirements.",
  },
];

export default function EquipmentSelectionGuide() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            ADH vs. HSPD: Equipment Selection Guide
          </h2>
          <p className="text-lg text-slate leading-relaxed">
            Choosing the right piling solution depends on your plot size, soil density (SPT values), 
            and environmental constraints. Use our experience-based rules of thumb to find the 
            best fit for your project.
          </p>
        </motion.div>

        {/* Matrix Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-bg px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-primary">Quick Selection Matrix</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-primary text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold border-b border-gray-100 w-1/4">Plot Size</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-100 w-1/3">Recommended Equipment</th>
                  <th className="px-6 py-4 font-semibold border-b border-gray-100">Key Considerations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {matrixData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-bg/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-5 text-primary font-medium">
                      {row.plotSize}
                    </td>
                    <td className="px-6 py-5 text-slate font-medium">
                      {row.equipment}
                    </td>
                    <td className="px-6 py-5 text-slate text-sm leading-relaxed">
                      {row.considerations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}