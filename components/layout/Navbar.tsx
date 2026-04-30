"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { services, navLinks } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isServiceActive = pathname.startsWith("/services");

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            {/* Logo Image */}
            <Image
              src="/logo.svg"
              alt="Nandanik Builders Ltd"
              width={160}
              height={60}
              className="h-11 w-auto object-contain"
              priority
            />

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-primary tracking-wide">
                NANDANIK
              </span>
              <span className="text-[10px] text-slate tracking-[0.2em]">
                BUILDERS LTD
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/") ? "text-accent" : "text-primary"}`}
            >
              Home
            </Link>

            {/* Services Dropdown (Desktop Hover) */}
            <div
              className="relative group h-full py-8"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center text-sm font-medium transition-colors hover:text-accent ${isServiceActive ? "text-accent" : "text-primary"}`}
              >
                Our Services <FiChevronDown className="ml-1 mt-0.5" />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={`block px-4 py-3 text-sm hover:bg-bg hover:text-accent transition-colors ${pathname === `/services/${service.slug}` ? "bg-bg text-accent font-medium" : "text-slate"}`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive(link.href) ? "text-accent" : "text-primary"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "text-accent bg-bg" : "text-primary hover:bg-bg"}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${isServiceActive ? "text-accent bg-bg" : "text-primary hover:bg-bg"}`}
                >
                  Our Services
                  <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }}>
                    <FiChevronDown />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-6 pr-3 overflow-hidden"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className={`block py-2 text-sm ${pathname === `/services/${service.slug}` ? "text-accent font-medium" : "text-slate"}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href) ? "text-accent bg-bg" : "text-primary hover:bg-bg"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
