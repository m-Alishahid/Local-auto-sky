"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ✅ Window Tinting Packages
const packages = [
  {
    title: "Standard Tint Package",
    price: "$199",
    features: [
      "Basic heat rejection (30%)",
      "UV protection (99%)",
      "5-year warranty",
      "2-4 hour installation",
      "Good option for budget-conscious customers",
    ],
    more: [],
  },
  {
    title: "Premium Tint Package",
    price: "$299",
    features: [
      "Superior heat rejection (50%)",
      "UV protection (99%)",
      "Lifetime warranty",
      "Better clarity and visibility",
      "2-4 hour installation",
      "Best value with balance of performance and price",
    ],
    more: [],
  },
  {
    title: "Luxury Tint Package",
    price: "$399",
    features: [
      "Maximum heat rejection (70%)",
      "UV protection (99.9%)",
      "Lifetime warranty",
      "Infrared rejection technology",
      "Scratch-resistant coating",
      "Ultimate performance and luxury experience",
    ],
    more: [],
  },
];

const WindowTinting = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-0"></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                Professional <span className="text-gray-500">Window Tinting</span> Services
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                Premium window film installation that enhances comfort, style, privacy
                and protects your vehicle&apos;s interior from harmful UV rays.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Heat Rejection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">UV Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Enhanced Privacy</span>
                </div>
              </div>

              <Link href="/booking?service=window-tinting">
                <Button className="bg-gray-500 hover:bg-black text-white group">
                  Book Window Tinting Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/ceramic_after.png"
                  alt="Professional window tinting service"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Window Tinting Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our premium window tinting options with different levels of
            heat rejection and UV protection
          </p>
        </div>

        {/* Grid with toggle cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => {
            const isExpanded = expandedCard === index;
            const visibleFeatures = isExpanded
              ? pkg.features
              : pkg.features.slice(0, 3);

            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative flex flex-col justify-between"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{pkg.title}</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">{pkg.price}</p>
                  <div className="space-y-3">
                    {visibleFeatures.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check size={18} className="text-gray-900 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Extra details accordion */}
                  {isExpanded && pkg.more.length > 0 && (
                    <motion.div
                      className="mt-4 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {pkg.more.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Check size={18} className="text-gray-500 mt-1" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {pkg.features.length > 3 && (
                  <button
                    onClick={() => toggleCard(index)}
                    className="mt-6 flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WindowTinting;
