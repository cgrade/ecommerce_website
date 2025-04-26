"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageSliderProps {
  images: string[];
  productName: string;
}

export default function ImageSlider({ images, productName }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next image
      goToNext();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous image
      goToPrevious();
    }
  };
  
  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
        <Image
          src="/images/placeholder.png"
          alt={productName}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  return (
    <div className="flex flex-col">
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main image display */}
        <div className="h-full w-full relative bg-white rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse" id="loading-placeholder">
            <svg className="w-8 h-8 text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <Image
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            priority
            onLoad={(e) => {
              // Hide loading indicator when image loads
              (e.target as HTMLImageElement).classList.add('opacity-100');
              const loadingEl = document.getElementById('loading-placeholder');
              if (loadingEl) loadingEl.classList.add('hidden');
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Previous/Next arrows */}
        <button 
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white text-text-primary p-2 sm:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-10 transform hover:scale-110 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white text-text-primary p-2 sm:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-10 transform hover:scale-110 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
      
      {/* Thumbnails below the main image, similar to the modal */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-4 mt-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-16 flex-shrink-0 border-2 ${currentIndex === idx ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <Image 
                src={image} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                className="object-cover" 
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
