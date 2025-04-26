"use client";

import { useState, useEffect, Fragment, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Product } from '../types/product';
import { formatPrice } from '../utils/formatPrice';
import AddToCartButton from './AddToCartButton';
import CustomAddToCart from './CustomAddToCart';

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");
  
  // Set the origin for share URLs only on the client side
  useEffect(() => {
    // Only access window in the browser
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);
  const images = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls 
    : [product.image || "/images/placeholder.png"];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden bg-white shadow-xl transition-all relative">
                <button 
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Side - Image Gallery */}
                  <div className="bg-white p-4">
                    <div className="relative aspect-square mb-4">
                      <Image
                        src={images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative w-16 h-16 flex-shrink-0 border-2 ${
                            selectedImage === index ? 'border-gray-800' : 'border-gray-200'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Product Details */}
                  <div className="p-6 flex flex-col">
                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-800">
                      {product.name}
                    </Dialog.Title>
                    
                    <div className="text-xl font-bold mt-2 mb-4 text-gray-800">
                      {formatPrice(product.price)}
                    </div>
                    
                    {/* Available tag */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Available
                      </span>
                    </div>
                    
                    {/* Product Description */}
                    <div className="mb-6">
                      <h4 className="text-base font-semibold mb-2 text-gray-800">
                        Product Description
                      </h4>
                      <div className="text-gray-600 text-sm" 
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </div>
                    
                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <label className="block text-base font-semibold mb-2 text-gray-800">
                            Size
                          </label>
                          <Link 
                            href="/size-guide"
                            target="_blank"
                            className="text-sm text-gray-500 hover:text-gray-800 underline mb-2"
                          >
                            Size Guide
                          </Link>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-1">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              className={`inline-block bg-white border ${
                                selectedSize === size 
                                  ? 'border-gray-800 bg-gray-100' 
                                  : 'border-gray-300 hover:border-gray-400'
                              } text-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-md text-sm font-medium transition-all transform hover:scale-105 active:scale-95`}
                              onClick={() => {
                                setSelectedSize(size);
                                setSizeError(false);
                              }}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        
                        {sizeError && (
                          <p className="mt-2 text-sm text-red-500 font-medium">Please select a size</p>
                        )}
                      </div>
                    )}
                    
                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <label className="block text-base font-semibold mb-2 text-gray-800">
                        Quantity
                      </label>
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
                          <button 
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 border-r border-gray-300 transition-colors"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            aria-label="Decrease quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 h-10 sm:w-14 sm:h-12 flex items-center justify-center text-gray-800 font-medium">{quantity}</span>
                          <button 
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 border-l border-gray-300 transition-colors"
                            onClick={() => setQuantity(prev => prev + 1)}
                            aria-label="Increase quantity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="ml-4 text-sm text-gray-500">
                          {product.in_stock ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              In Stock
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Share Links */}
                    <div className="mt-auto">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-gray-700">Share this Product</h4>
                        <div className="flex space-x-4">
                          {/* Instagram */}
                          <a 
                            href={`https://www.instagram.com/create/link/?url=${encodeURIComponent(`${origin}/products/${product.id}`)}&title=${encodeURIComponent(product.name)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[#C13584] transition-colors"
                            aria-label="Share on Instagram"
                          >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                          
                          {/* TikTok */}
                          <a 
                            href={`https://www.tiktok.com/share?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(`${origin}/products/${product.id}`)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black transition-colors"
                            aria-label="Share on TikTok"
                          >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="text-sm text-gray-600 mb-6">
                        <span className="font-medium text-gray-700">Tag: </span>
                        <Link href="#" className="text-gray-600 hover:text-gray-800">
                          From Absa With Love
                        </Link>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        <Link href={`/products/${product.id}`} className="bg-gray-100 text-gray-800 text-center py-3 font-medium border border-gray-200 hover:bg-gray-200 transition-colors">
                          View Full Details
                        </Link>
                        
                        {/* Handle Add to Cart with size validation */}
                        <div>
                          {product.sizes && product.sizes.length > 0 ? (
                            selectedSize ? (
                              <CustomAddToCart 
                                product={product} 
                                selectedSize={selectedSize}
                                quantity={quantity}
                              />
                            ) : (
                              <button 
                                className="bg-[#0c1d2a] hover:bg-[#0e2436] text-white py-3 px-4 w-full flex items-center justify-center transition-all duration-200 text-sm font-medium"
                                onClick={() => {
                                  setSizeError(true);
                                }}
                              >
                                <span className="flex items-center justify-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                  </svg>
                                  <span>Add to Cart</span>
                                </span>
                              </button>
                            )
                          ) : (
                            <CustomAddToCart 
                              product={product} 
                              quantity={quantity}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
