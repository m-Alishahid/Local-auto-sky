import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className="h-screen w-full overflow-hidden bg-black  flex items-center justify-center"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0" />

      {/* Centered Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Redefine Your Vehicle's <br />
            <span className="text-gray-300 underline underline-offset-8 decoration-gray-500">
              True Shine
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Experience premium detailing with{" "}
            <span className="text-white font-semibold">Local Auto SPA</span>.  
            Luxury treatments that bring out your car’s elegance & comfort.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/booking">
              <Button className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                Book Now
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-white text-black hover:bg-gray-600 hover:text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
