"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const packages = [
  {
    title: "Basic Ceramic Coating",
    price: "$200",
    features: [
      "Hand wash & clay bar",
      "Apply 1 layer ceramic coating",
      "Protection for 1 year",
    ],
    more: [],
  },
  {
    title: "Advanced Ceramic Coating",
    price: "$350",
    features: [
      "Hand wash & clay bar",
      "Apply 2 layers ceramic coating",
      "Protection for 3 years",
    ],
    more: [],
  },
];

const CeramicCoating = () => {
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
                Professional{" "}
                <span className="text-gray-500">Ceramic Coating</span> Services
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                Long-lasting paint protection with enhanced gloss and
                hydrophobic properties that keep your vehicle looking
                showroom-new for years.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">9H Hardness</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Hydrophobic</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
                  <Check size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">
                    2-5 Year Protection
                  </span>
                </div>
              </div>

              <Link href="/booking">
                <Button className="bg-gray-500 hover:bg-black text-white group">
                  Book Ceramic Coating Now
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
                  src="/window_after.png"
                  alt="Professional ceramic coating service"
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
            Ceramic Coating Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our ceramic coating packages with varying durability and
            protection levels
          </p>
        </div>

        {/* Grid with toggle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isExpanded = expandedCard === index;
            const visibleFeatures = isExpanded
              ? pkg.features
              : pkg.features.slice(0, 3);

            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col justify-between"
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
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {pkg.features.length > 3 && (
                    <button
                      onClick={() => toggleCard(index)}
                      className="flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
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

                  <Link href="/booking" className="w-full">
                    <Button className="w-full bg-black hover:bg-gray-500 text-white">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CeramicCoating;
