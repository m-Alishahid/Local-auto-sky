import { motion } from "framer-motion";
import TestimonialCard from "@/components/testimonial/TestimonialCard";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Michael S.",
      rating: 5,
      testimonial:
        "The detailers were extremely professional and did an amazing job on my SUV. It looks better than when I first bought it!",
      date: "April 10, 2025",
    },
    {
      name: "Jessica R.",
      rating: 5,
      testimonial:
        "So convenient that they came to my house. The ceramic coating they applied makes water bead up beautifully and the car stays clean longer.",
      date: "March 22, 2025",
    },
    {
      name: "David T.",
      rating: 5,
      testimonial:
        "I got window tinting done and couldn't be happier with the results. Professional service and excellent quality.",
      date: "February 15, 2025",
    },
    {
      name: "Amanda K.",
      rating: 4,
      testimonial:
        "Great service and attention to detail. My car looks amazing after the full detail. Would definitely recommend!",
      date: "January 30, 2025",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as any },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Gray Background Circles */}
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-gray-100 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-gray-200 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-5">
            Our Customers Say
          </h2>
          <div className="w-28 md:w-36 h-1 mx-auto bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 rounded-full relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-3 bg-black rounded-full animate-bounce"></div>
          </div>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from car owners who trusted us with their vehicles
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl bg-white text-black border border-gray-300 shadow-md overflow-hidden group"
            >
              {/* Watermark Quote Icon */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-gray-100 group-hover:text-gray-200 transition-colors duration-300" />
              
              <div className="relative z-10 p-6">
                <TestimonialCard {...testimonial} />
              </div>

              {/* Hover invert effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold px-6 text-center">
                  “{testimonial.testimonial.slice(0, 80)}...”
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
