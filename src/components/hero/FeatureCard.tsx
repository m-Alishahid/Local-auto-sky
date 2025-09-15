import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass?:string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgClass,
  delay = 0
}) => {
  return (
    <motion.div 
      className={`relative bg-black border border-white/20 text-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center transition-all duration-300 overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay * 0.2, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 20px 40px -10px rgba(255,255,255,0.2)",
      }}
    >
      {/* Icon Circle */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-white mb-4 transition-all duration-300 group-hover:border-black">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold tracking-wide uppercase mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
};

export default FeatureCard;
