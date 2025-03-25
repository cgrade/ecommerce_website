"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * @returns {JSX.Element} The hero slider component.
 * @description Renders a hero section with an image slider.
 */
export default function HeroSlider() {
  const slides = [
    {
      image: "/images/slider1.jpg",
      title: "MORE THAN A GAME. IT’S A LIFESTYLE.",
      subtitle:
        "Whether you’re on the course or in the studio, we have what you need to play your best.",
    },
    {
      image: "/images/slider2.jpg",
      title: "ELEVATE YOUR PERFORMANCE",
      subtitle: "Discover the best sports gear for every athlete.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[80vh] bg-black text-white flex items-center">
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
      </div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center z-10">
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg mb-6">{slides[currentSlide].subtitle}</p>
          <Link
            href="/products"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Shop Now
          </Link>
        </div>
      </div>
      {/* Slider Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
