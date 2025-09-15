import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";

const ServicesSection = () => {
  const services = [
    {
      title: "Mobile Detail",
      description: "Professional detailing brought direct to your location",
      image: "/exterior_after.png",
      features: [
        "Exterior and interior cleaning",
        "Paint decontamination and correction",
        "Premium wax or sealant application",
        "We bring all supplies and equipment",
      ],
      price: "$99",
      link: "/services/car-detailing",
    },
    {
      title: "Window Tinting",
      description: "Premium window film installation for comfort and style",
      image: "/window_after.png",
      features: [
        "Heat and UV rejection",
        "Improved privacy",
        "Glare reduction",
        "Lifetime warranty available",
      ],
      price: "$199",
      link: "/services/window-tinting",
    },
    {
      title: "Ceramic Coating",
      description: "Long-lasting paint protection with enhanced gloss",
      image: "/ceramic_after.png",
      features: [
        "9H hardness protection",
        "Hydrophobic properties",
        "UV protection",
        "2-5 year durability",
      ],
      price: "$599",
      link: "/services/ceramic-coating",
    },
  ];

  return (
    <section
      id="premium-mobile-car-detailing"
      className="py-20 md:py-28 bg-black relative overflow-hidden"
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 md:w-96 h-72 md:h-96 bg-gray-700/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6">
            Premium <span className="text-gray-300">Auto Spa Services</span>
          </h2>

          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-white via-gray-400 to-gray-700 mx-auto mb-6 md:mb-8 relative">
            <div className="absolute -top-1 left-0 w-4 md:w-6 h-2 md:h-3 bg-gray-300 rounded-full animate-bounce"></div>
          </div>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Transform your ride with our exclusive detailing, tinting, and
            ceramic coating — crafted for a{" "}
            <span className="text-white font-semibold">luxury finish</span>.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Button */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/services">
            <MotionButton
              className="bg-gradient-to-r from-white to-gray-300 text-black font-semibold
                         px-10 py-6 text-lg rounded-full shadow-md
                         transition-all duration-300 ease-in-out
                         hover:from-gray-200 hover:to-gray-400 hover:shadow-xl
                         focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </MotionButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
