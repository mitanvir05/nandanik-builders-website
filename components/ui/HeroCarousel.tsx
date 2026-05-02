"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image"; 
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getSlides } from "@/actions/carousel.actions";

export default function HeroCarousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSlides();
        const featuredSlides = data.filter((slide: any) => slide.isFeatured);
        setSlides(featuredSlides);
      } catch (error) {
        console.error("Failed to load carousel slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered && slides.length > 1) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, nextSlide, slides.length]);

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

  if (isLoading) return <div className="w-full h-[80vh] bg-primary animate-pulse mt-20" />;
  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-[80vh] min-h-[600px] bg-primary overflow-hidden mt-20"
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
          {/* OPTIMIZED IMAGE COMPONENT */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slides[current].imageUrl}
              alt={slides[current].title}
              fill // Replaces manual background size cover
              priority={current === 0} // Loads first image instantly for LCP
              className="object-cover transition-transform duration-1000"
              sizes="100vw" // Tells Next.js this image takes the full width
            />
          </div>

          {/* Overlays - z-index adjusted to stay above the Image component */}
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10" />

          <div className="absolute inset-0 flex items-center justify-center text-center z-20">
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
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all cursor-pointer z-30"
          >
            <FiChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all cursor-pointer z-30"
          >
            <FiChevronRight size={32} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  current === index
                    ? "w-8 h-2.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}