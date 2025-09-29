import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className="h-screen w-full  overflow-hidden flex items-center justify-center 
                 bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: "url('/hero_bg.jpg')" }} // 🔥 apna image path yahan do
    >
      {/* Gradient Overlay (dark layer for text visibility) */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent z-0" /> */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent z-0" />



      {/* Centered Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl  text-white leading-tight">
            Redefine Your Vehicle's 
            
              True Shine
       
          </h1>

          {/* Paragraph */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Experience premium detailing with Local Auto SPA Luxury  treatments that bring out your car’s elegance & comfort.
          </p>

        <br />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/booking">
              <Button className="p-6 bg-white text-black hover:bg-white hover:text-underline">
                Book Now
              </Button>
            </Link>

            <Link href="/services">
              <Button
                className="p-6 bg-black text-white border-2 border-white hover:bg-gray hover:text-underline "
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
