"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

// Using high-quality placeholder images from Unsplash for the corporate look.
// You should replace these URLs with your actual project/equipment images later.
const slides = [
  {
    id: 1,
    title: "Building the Future, Restoring the Past",
    description:
      "Leading the industry in precast pile driving, foundation engineering, and heavy construction equipment across Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    ctaText: "Explore Our Services",
    ctaLink: "/services",
  },
  {
    id: 2,
    title: "Precision in Every Pile",
    description:
      "State-of-the-art precast square pile making and comprehensive pile testing services ensuring structural integrity.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
    ctaText: "View Equipment",
    ctaLink: "/equipment",
  },
  {
    id: 3,
    title: "Excellence in Real Estate",
    description:
      "Developing premium residential and commercial properties that redefine modern living and workspaces.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    ctaText: "Our Projects",
    ctaLink: "/projects-clients",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [isHovered, nextSlide]);

  // Framer motion variants for smooth sliding
  const slideVariants: Variants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: {
      x: "0",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      className="relative w-full h-[80vh] min-h-[600px] bg-primary overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-md"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link
                  href={slides[current].ctaLink}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-accent hover:bg-blue-600 transition-colors rounded-sm shadow-lg hover:shadow-xl"
                >
                  {slides[current].ctaText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-2.5 bg-accent"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
