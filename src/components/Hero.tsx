import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className="h-screen w-full overflow-hidden bg-black "
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between relative z-20">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              <br />
              Redefine Your Vehicle's <br />
              <span className="text-gray-300 underline underline-offset-8 decoration-gray-500">
                True Shine
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-gray-300 text-lg md:text-xl max-w-lg">
              <br/>
              Experience premium detailing with{" "}
              <span className="text-white font-semibold">Local Auto SPA</span>.  
              Luxury treatments that bring out your car’s elegance & comfort.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/booking">
                <Button
                  className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Book Now
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-white text-black hover:text-white hover:bg-black shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side Image / GIF */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/animation.gif" // apna PNG/GIF yahaan dalna
            alt="Luxury Car Detailing"
            width={500}
            height={500}
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;





