import { Wrench, Car, Check, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutSection = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-200 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div 
          className="text-center mb-14"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            About Local Auto Spa
          </h2>
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 relative">
            <motion.div 
              className="absolute -top-1 left-0 w-6 h-3 bg-gray-900 rounded-full"
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing showroom-quality results to your doorstep with{" "}
            <span className="text-gray-900 font-semibold">years of expertise</span>.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text & Features */}
          <motion.div
            variants={staggerChildrenVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-5"
            >
              We Don't Just Clean Cars – We Restore Them to Showroom Perfection
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-700 mb-8 text-base md:text-lg"
            >
              At Decent Detailers, we bring expertise, premium products, and certified techniques 
              directly to your doorstep. Our fully mobile service means you get professional 
              results without the hassle.
            </motion.p>
            
            <motion.div 
              variants={staggerChildrenVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            >
              {/* Feature cards */}
              {[
                { icon: Car, title: "Come to You Service", text: "No travel fees, no waiting in lines" },
                { icon: Check, title: "Showroom-Quality Results", text: "From basic washes to ceramic coatings" },
                { icon: Users, title: "Trusted Pros", text: "Certified in paint correction and coatings" },
                { icon: Wrench, title: "Premium Products", text: "Using only the best detailing products" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.3 } }}
                  className="flex items-start bg-gray-50 rounded-lg shadow p-4 hover:shadow-md transition border border-gray-200"
                >
                  <div className="bg-gray-200 p-3 rounded-full mr-3">
                    <feature.icon size={28} className="text-gray-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-700 italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 text-base"
            >
              "We're obsessed with the details so you can enjoy that new-car feeling – wherever you park."
            </motion.p>
          </motion.div>
          
          {/* Right: Image */}
          <motion.div 
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200"
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <Image 
                src="/slider_1.png"
                alt="Car detailing professional at work" 
                width={400}
                height={340}
                className="w-[400px] h-[340px] object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildrenVariants}
        >
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "10+", label: "Years Experience" },
            { value: "100%", label: "Customer Satisfaction" },
            { value: "24/7", label: "Availability" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition"
            >
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h4>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
