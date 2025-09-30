"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Car, SprayCan, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  // ✅ Navbar background logic
  let navbarBg = "shadow-md bg-gray-500/10"; // default home bg
  if (pathname === "/") {
    navbarBg = isScrolled ? "shadow-lg bg-black/90" : "shadow-md bg-gray-500/10";
  } else {
    navbarBg = "shadow-lg bg-black/90";
  }

  return (
    <>
      {/* ✅ Navbar wrapper */}
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 
        w-[92%] md:w-[85%] ${navbarBg} backdrop-blur-md px-4 py-0.5`}
      >
        <div className="flex justify-between items-center">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-20 w-auto flex items-center">
              <Image
                src="/lovable-uploads/logo.png"
                alt="LocalAutoSpa Logo"
                width={200}
                height={100}
                className="max-h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 relative text-sm">
            <Link
              href="/"
              className="font-medium text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center font-medium text-gray-300 hover:text-white transition-colors"
              >
                Services <ChevronDown size={14} className="ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-[260px] bg-gray-800 border border-gray-700 shadow-xl z-50 p-3 grid gap-2">
                  <Link
                    href="/services/ceramic-coating"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <SprayCan size={18} className="text-gray-400" />
                    <div>
                      <p className="text-gray-200 text-sm font-medium">
                        Ceramic Coating
                      </p>
                      <p className="text-xs text-gray-400">
                        Shine & long-term protection
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/window-tinting"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Car size={18} className="text-gray-400" />
                    <div>
                      <p className="text-gray-200 text-sm font-medium">
                        Window Tinting
                      </p>
                      <p className="text-xs text-gray-400">
                        Privacy & heat rejection
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/car-detailing"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Sparkles size={18} className="text-gray-400" />
                    <div>
                      <p className="text-gray-200 text-sm font-medium">
                        Full Detailing
                      </p>
                      <p className="text-xs text-gray-400">
                        Restore showroom condition
                      </p>
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
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-7 w-7 text-white" />
              ) : (
                <Menu className="h-7 w-7 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-gray-900 shadow-lg p-4 space-y-3 z-40">
          <Link
            href="/"
            className="block text-gray-300 hover:text-white font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/services"
            className="block text-gray-300 hover:text-white font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="block text-gray-300 hover:text-white font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-300 hover:text-white font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold shadow-md">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
