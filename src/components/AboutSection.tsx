import { Wrench, Car, Check, Users } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-200 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            About Local Auto Spa
          </h2>

          {/* Animated underline */}
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-6 h-1 bg-black"
              animate={{ x: [0, 90, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Redefining auto detailing with{" "}
            <span className="font-semibold text-gray-900">expertise, innovation, and care</span>.
            We go beyond cleaning – we protect, restore, and elevate your vehicle.
          </p>
        </motion.div>


        {/* Two-column modern layout */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left: Text */}
          <div>
            <motion.h3
              variants={item}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug"
            >
              Your Vehicle Our Passion.
              <span className="block text-gray-600 text-lg font-medium mt-2">
                Bringing the showroom finish to your doorstep.
              </span>
            </motion.h3>

            <motion.p
              variants={item}
              className="text-gray-700 mb-8 text-base md:text-lg leading-relaxed"
            >
              Every detail matters. From hand washes to ceramic coatings, we use
              premium products and certified techniques to make sure your vehicle
              looks and feels brand new – every single time.
            </motion.p>

            {/* Quote */}
            <motion.div
              variants={item}
              className="border-l-4 border-gray-400 pl-5 py-3 bg-gray-50 rounded-md shadow-sm"
            >
              <p className="italic text-gray-700 text-base">
                “We’re obsessed with details so you can enjoy that new-car feeling – wherever you park.”
              </p>
            </motion.div>
          </div>

          {/* Right: Features grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: Car,
                title: "Come to You Service",
                text: "No travel fees, no waiting in lines",
              },
              {
                icon: Check,
                title: "Showroom Results",
                text: "From washes to ceramic coatings",
              },
              {
                icon: Users,
                title: "Trusted Pros",
                text: "Certified in correction & coatings",
              },
              {
                icon: Wrench,
                title: "Premium Products",
                text: "We use only the best detailing brands",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="flex flex-col items-start bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
              >
                <div className="bg-gray-200 p-3 rounded-full mb-3">
                  <f.icon size={24} className="text-gray-900" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{f.title}</h4>
                <p className="text-sm text-gray-600">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "10+", label: "Years Experience" },
            { value: "100%", label: "Customer Satisfaction" },
            { value: "24/7", label: "Availability" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                y: -6,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition"
            >
              <h4 className="text-3xl font-extrabold text-gray-900 mb-2">
                {s.value}
              </h4>
              <p className="text-gray-600">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
