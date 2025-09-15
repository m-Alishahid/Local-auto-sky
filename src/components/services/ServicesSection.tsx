import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";

const ServicesSection = () => {
  const services = [
    {
      title: "Mobile Detailing",
      description: "Professional detailing brought direct to your location",
      image: "exterior_after.png",
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
      image: "window_after.png",
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
      image: "ceramic_after.png",
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
      className="py-16 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Remove dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 md:mb-5">
            Premium Mobile Car Detailing
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-black to-gray-500 mx-auto mb-6 md:mb-8 relative">
            <div className="absolute -top-1 left-0 w-4 md:w-6 h-2 md:h-3 bg-black rounded-full animate-bounce"></div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            We offer a complete range of professional auto detailing services to
            keep your vehicle looking its absolute best.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/services">
            <MotionButton
              className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full shadow-lg group"
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
