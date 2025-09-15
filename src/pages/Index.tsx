
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/testimonial/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] // 👈 fix
    }
  }
};

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      
      <div className="bg-white">
        <motion.div
          id="premium-mobile-car-detailing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <ServicesSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <ProcessSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <AboutSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <FeaturedWorks />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <CtaSection />
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
