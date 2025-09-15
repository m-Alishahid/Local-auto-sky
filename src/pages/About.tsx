import Navbar from "@/components/Navbar";
import { Wrench, Car, Check, Users, Award, Clock } from "lucide-react";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
<br /> <br />

            About Local Auto Spa
          </h1>
          <div className="w-20 h-1 bg-gray-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Premium car care and detailing, redefined with precision and passion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              Local Auto Spa began with a mission to deliver high-end car care
              in a modern, convenient, and professional way. What started as a
              passion has evolved into a trusted brand that blends innovation,
              precision, and luxury.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              We specialize in detailing, protection, and restoration services
              that ensure your car doesn’t just look good — it feels brand new.
              Every service is tailored to give your vehicle the attention it
              deserves.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With a focus on excellence and customer satisfaction, Local Auto
              Spa is the choice for car enthusiasts and everyday drivers alike.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <Image
                src="/about_us.jpg"
                alt="Luxury car care at Local Auto Spa"
                width={700}
                height={420}
                className="w-full h-[420px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
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
                className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl hover:border-gray-500 transition-all flex flex-col items-start h-full"
              >
                <div className="bg-gray-800 p-3 rounded-full mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-900 border border-gray-700 p-10 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-400 italic max-w-3xl mx-auto leading-relaxed">
            "At Local Auto Spa, our mission is to elevate the car care
            experience by blending precision, innovation, and premium quality —
            ensuring every drive feels like the first."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
