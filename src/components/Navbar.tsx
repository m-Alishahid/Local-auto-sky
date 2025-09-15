"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Car, SprayCan, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 
      w-[92%] md:w-[85%] 
      ${isScrolled ? "shadow-lg bg-gray-900/95" : "shadow-md bg-black/90"}
      backdrop-blur-md rounded-full px-4 py-2`}
    >
      <div className="flex justify-between items-center">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/lovable-uploads/logo.png"
            alt="LocalAutoSpa Logo"
            width={170}
            height={90}
            className="h-12 w-auto"
          />
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 relative text-sm">
          <Link
            href="/"
            className="font-medium text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Dropdown (Click to open) */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center font-medium text-gray-300 hover:text-white transition-colors"
            >
              Services <ChevronDown size={14} className="ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-[260px] bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 p-3 grid gap-2">
                <Link
                  href="/services/car-detailing"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <SprayCan size={18} className="text-gray-400" />
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Exterior Wash</p>
                    <p className="text-xs text-gray-400">Shine & protection</p>
                  </div>
                </Link>

                <Link
                  href="/services/window-tinting"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Car size={18} className="text-gray-400" />
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Interior Cleaning</p>
                    <p className="text-xs text-gray-400">Vacuum & stain removal</p>
                  </div>
                </Link>

                <Link
                  href="/services/ceramic-coating"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Sparkles size={18} className="text-gray-400" />
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Full Detailing</p>
                    <p className="text-xs text-gray-400">Showroom condition</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="font-medium text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-medium text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link href="/booking">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1 font-semibold text-sm shadow-md">
              Book Now
            </Button>
          </Link>
        </div>

        {/* ✅ Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
