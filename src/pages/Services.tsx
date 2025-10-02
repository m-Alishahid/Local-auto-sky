"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// import actual data
import { service, extraServices, vehicleTypes } from "@/utils/services";

const Services = () => {
  const [activeTab, setActiveTab] = useState(vehicleTypes[0].id);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Our Services
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our complete range of detailing and protection packages.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs
            defaultValue={vehicleTypes[0].id}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              className="flex w-full overflow-x-auto space-x-2 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-md p-2 scrollbar-hide"
            >
              {vehicleTypes.map((v) => (
                <TabsTrigger
                  key={v.id}
                  value={v.id}
                  className="text-sm px-4 py-3 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white whitespace-nowrap"
                >
                  {v.name}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="extras"
                className="text-sm px-4 py-3 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white whitespace-nowrap"
              >
                Extras
              </TabsTrigger>
            </TabsList>

            {/* Vehicle Tabs */}
            {vehicleTypes.map((v) => (
              <TabsContent key={v.id} value={v.id}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-8">
                    {v.name} Packages
                  </h2>

                  {/* Categories */}
                  <div className="space-y-12">
                    {Object.entries(service[v.id] || {}).map(
                      ([category, pkgData], idx) => {
                        const packages =
                          typeof pkgData === "object" && !("includes" in pkgData)
                            ? (pkgData as Record<string, any>)
                            : { single: pkgData };

                        return (
                          <div key={idx}>
                            <h3 className="text-xl font-semibold text-center text-black dark:text-white mb-6 capitalize">
                              {category} Packages
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {Object.values(packages).map((pkg: any, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={{ y: -4 }}
                                  className="bg-white dark:bg-gray-900/80 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700 flex flex-col"
                                >
                                  <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-bold text-black dark:text-white">
                                      {pkg.name}
                                    </h4>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                                      {pkg.pricePerFt
                                        ? `$${pkg.pricePerFt}/ft`
                                        : `$${pkg.price}`}
                                    </span>
                                  </div>
                                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
                                    {pkg.includes?.map(
                                      (feature: string, j: number) => (
                                        <li
                                          key={j}
                                          className="flex items-start"
                                        >
                                          <Check className="h-4 w-4 text-black dark:text-white mr-2 mt-1" />
                                          {feature}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </motion.div>
              </TabsContent>
            ))}

            {/* Extras Tab */}
            <TabsContent value="extras">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-8">
                  Extra Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(extraServices).map(([extraKey, pkgSet]) =>
                    Object.values(pkgSet).map((pkg: any, i) => (
                      <motion.div
                        key={extraKey + i}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-900/80 rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200 dark:border-gray-700 flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-bold text-black dark:text-white">
                            {pkg.name}
                          </h4>
                          <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                            ${pkg.price}
                          </span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
                          {pkg.includes.map((feature: string, j: number) => (
                            <li key={j} className="flex items-start">
                              <Check className="h-4 w-4 text-black dark:text-white mr-2 mt-1" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <motion.div
            className="mt-20 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md p-10 rounded-2xl text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Customized Packages Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
              Don&apos;t see exactly what you&apos;re looking for? We can create a
              custom detailing package tailored to your vehicle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/booking"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
              >
                Book Now
              </a>
              <a
                href="/contact"
                className="bg-white dark:bg-gray-800 border border-black dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
