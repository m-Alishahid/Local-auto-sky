"use client";
import { motion } from "framer-motion";
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
        "So convenient that they came to my house. The ceramic coating makes water bead beautifully and the car stays clean longer.",
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

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold  mb-4 text-black">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Honest feedback from real people who trusted us
          </p>
        </motion.div>

        {/* Horizontal Scroll Cards */}
        <div className="overflow-x-auto pb-6">
          <motion.div
            className="flex gap-6 min-w-max"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-80 flex-shrink-0 bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg relative"
              >
                {/* Watermark Quote */}
                <Quote className="absolute top-4 right-4 w-12 h-12 text-gray-700 opacity-20" />

                {/* Testimonial Text */}
                <p className="text-gray-200 text-base leading-relaxed mb-4">
                  “{t.testimonial}”
                </p>

                {/* Author */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span>{t.date}</span>
                </div>

                {/* Stars */}
                <div className="mt-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
