import Link from "next/link";
import Image from "next/image"; // ✅ Import Image
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info with Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image
                src="/lovable-uploads/logo.png"
                alt="LocalAutoSpa Logo"
                width={300}   // ✅ Footer ke liye bada size
                height={120}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-center md:text-left leading-relaxed">
              Premium mobile detailing service — bringing the showroom shine directly to your doorstep with years of trusted expertise.
            </p>
            <div className="flex space-x-5">
              <a href="https://facebook.com" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-center md:text-left text-white">Quick Links</h3>
            <ul className="space-y-3 text-center md:text-left">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Book Now", href: "/booking" }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-center md:text-left text-white">Contact Us</h3>
            <ul className="space-y-4 text-center md:text-left text-gray-400">
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={18} className="mr-2 text-white" />
                <a href="tel:+15555555555" className="hover:text-white transition-colors">
                  (555) 555-5555
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={18} className="mr-2 text-white" />
                <a href="mailto:info@localautospa.com" className="hover:text-white transition-colors">
                  info@localautospa.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin size={18} className="mr-2 text-white" />
                <span>We Come To You - Mobile Service</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Clock size={18} className="mr-2 text-white" />
                <span>Mon - Sat: 8am - 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Local Auto Spa. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-white transition-colors ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
