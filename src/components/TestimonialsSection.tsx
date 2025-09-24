// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const TestimonialsSection = () => {
//   const testimonials = [
//     {
//       name: "Sarah Khan",
//       role: "Car Owner",
//       feedback:
//         "Local Auto Spa transformed my car! The attention to detail was incredible, and the convenience of mobile service is unmatched.",
//       image: "/images/customer1.jpg",
//     },
//     {
//       name: "Ahmed Ali",
//       role: "Business Executive",
//       feedback:
//         "Professional, punctual, and the quality exceeded my expectations. My car looks brand new every time!",
//       image: "/images/customer2.jpg",
//     },
//     {
//       name: "Fatima Noor",
//       role: "Frequent Traveler",
//       feedback:
//         "Amazing experience! They truly care about customer satisfaction. I highly recommend their services.",
//       image: "/images/customer3.jpg",
//     },
//   ];

//   return (
//     <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 overflow-hidden">
//       <div className="container mx-auto px-6 lg:px-12 relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
//             What Our Clients Say
//           </h2>

//           {/* Decorative line + bouncing circle */}
//           <div className="w-24 h-1 bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 mx-auto mb-6 relative group">
//             <div className="absolute -top-1 left-0 w-6 h-3 bg-black rounded-full animate-bounce group-hover:bg-white"></div>
//           </div>

//           {/* Fixed hover text */}
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-colors duration-300 group-hover:text-black">
//             Don&apos;t just take our word for it – here&apos;s what our satisfied
//             customers have to say
//           </p>
//         </motion.div>

//         {/* Testimonials */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="relative bg-white shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300 group"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//             >
//               {/* Quote mark */}
//               <div className="absolute top-4 right-6 text-6xl text-gray-200 font-serif">
//                 “
//               </div>

//               {/* Customer image */}
//               <div className="flex items-center mb-6">
//                 <Image
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   width={60}
//                   height={60}
//                   className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
//                 />
//                 <div className="ml-4">
//                   <h4 className="text-lg font-semibold text-gray-800 group-hover:text-black">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-sm text-black">{testimonial.role}</p>
//                 </div>
//               </div>

//               {/* Feedback */}
//               <p className="text-gray-500 italic group-hover:text-black transition-colors duration-300">
//                 {testimonial.feedback}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Background glow */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-70"></div>
//     </section>
//   );
// };

// export default TestimonialsSection;
