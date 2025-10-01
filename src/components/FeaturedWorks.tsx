import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FeaturedWorks = () => {
  const [activeTab, setActiveTab] = useState("all");

  const beforeAfterImages = [
    {
      id: 1,
      category: "exterior",
      title: "Exterior Detail",
      description: "Full exterior restoration on a black sedan",
      before: "/exterior_before.png",
      after: "/exterior_after.png",
      link: "/services/car-detailing",
    },
    {
      id: 2,
      category: "interior",
      title: "Interior Transformation",
      description: "Complete interior cleaning and restoration",
      before: "/interior_before.png",
      after: "/interior_after.png",
      link: "/services/car-detailing",
    },
    {
      id: 3,
      category: "ceramic",
      title: "Ceramic Coating",
      description: "Premium ceramic coating application",
      before: "/ceramic_before.jpeg",
      after: "/ceramic_after.png",
      link: "/services/ceramic-coating",
    },
    {
      id: 4,
      category: "tint",
      title: "Window Tint",
      description: "Professional window tinting service",
      before: "/window_before.png",
      after: "/window_after.png",
      link: "/services/window-tinting",
    },
  ];

  const filteredImages =
    activeTab === "all"
      ? beforeAfterImages
      : beforeAfterImages.filter((img) => img.category === activeTab);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
            Featured <span className="text-gray-600">Works</span>
          </h2>
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-6 h-1 bg-black"
              animate={{ x: [0, 90, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we transform cars with our detailing expertise
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "exterior", "interior", "ceramic", "tint"].map((tab) => (
            <Button
              key={tab}
              variant="outline"
              onClick={() => setActiveTab(tab)}
              className={`capitalize border-gray-400 ${
                activeTab === tab
                  ? "bg-black text-white font-semibold"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {tab === "all" ? "All Work" : tab}
              {activeTab === tab && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div
          className={`grid gap-10 ${
            filteredImages.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
          initial="hidden"
          animate="show"
        >
          {filteredImages.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg transition"
            >
              {/* Image Overlay Effect */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.before}
                  alt={`Before ${item.title}`}
                  width={800}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:opacity-0"
                />
                <Image
                  src={item.after}
                  alt={`After ${item.title}`}
                  width={800}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
                />

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-1 text-sm rounded-full 
                     transition-opacity duration-500 group-hover:opacity-0">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-black px-4 py-1 text-sm rounded-full 
                     opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  After
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
                <Link href={item.link}>
                  <Button
                    variant="link"
                    className="text-black hover:text-gray-600 p-0 mt-2"
                  >
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;