import Navbar from "@/components/Navbar";
import { Wrench, Car, Check, Users, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-100 to-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
            About Local Auto Spa
          </h1>

          {/* Animated underline */}
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-6 h-1 bg-gray-800"
              animate={{ x: [0, 90, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Premium car care and detailing, redefined with precision and passion.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Local Auto Spa began with a mission to deliver high-end car care
            in a modern, convenient, and professional way. What started as a
            passion has evolved into a trusted brand that blends innovation,
            precision, and luxury.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            We specialize in detailing, protection, and restoration services
            that ensure your car doesn’t just look good — it feels brand new.
            Every service is tailored to give your vehicle the attention it
            deserves.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a focus on excellence and customer satisfaction, Local Auto
            Spa is the choice for car enthusiasts and everyday drivers alike.
          </p>
        </div>

        {/* Why Choose Us */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Car size={28} />,
                title: "Complete Auto Care",
                desc: "From detailing to protective coatings, every service is tailored.",
              },
              {
                icon: <Award size={28} />,
                title: "Expert Specialists",
                desc: "Trained professionals with years of experience in luxury detailing.",
              },
              {
                icon: <Wrench size={28} />,
                title: "Premium Products",
                desc: "We use only top-grade materials for long-lasting results.",
              },
              {
                icon: <Clock size={28} />,
                title: "Time-Saving",
                desc: "Efficient service that fits into your lifestyle.",
              },
              {
                icon: <Users size={28} />,
                title: "Customer First",
                desc: "Personalized services with focus on satisfaction.",
              },
              {
                icon: <Check size={28} />,
                title: "Guaranteed Results",
                desc: "We ensure quality and stand behind every service.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex flex-col items-start"
              >
                <div className="bg-gray-100 p-3 rounded-lg mb-5 text-gray-800">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-100 text-center p-12 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-black">Our Mission</h2>
          <p className="text-lg text-gray-700 italic max-w-3xl mx-auto leading-relaxed">
            "At Local Auto Spa, our mission is to elevate the car care
            experience by blending precision, innovation, and premium quality —
            ensuring every drive feels like the first."
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
