import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  rating: number;
  testimonial: string;
  image?: string;
  date: string;
}

const TestimonialCard = ({
  name,
  rating,
  testimonial,
  image,
  date,
}: TestimonialCardProps) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl shadow-md p-6 transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl group">
      {/* Watermark Quote Icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-100 group-hover:text-gray-700 transition-colors duration-300" />

      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 mr-3">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-gray-300 group-hover:border-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-black group-hover:text-white transition-colors">
            {name}
          </h4>
          <p className="text-xs text-gray-500 group-hover:text-gray-300">{date}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`mr-1 transition-colors ${
              i < rating
                ? "text-black fill-black group-hover:text-white group-hover:fill-white"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-gray-700 italic group-hover:text-gray-200 transition-colors">
        “{testimonial}”
      </p>
    </div>
  );
};

export default TestimonialCard;
