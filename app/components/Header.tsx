"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  ShoppingBagIcon,
  HeartIcon,
  HomeIcon,
  TagIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

/**
 * @returns {JSX.Element} The header component.
 * @description Renders the site header with navigation, search, and user options.
 */
export default function Header() {
  // Don't destructure immediately to avoid errors
  const session = useSession();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Calculate cart item count from the cart state
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Add scroll detection for header appearance change
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3 md:flex md:justify-between md:items-center backdrop-filter">
        {/* Mobile Header */}
        <div className="flex justify-between items-center w-full md:hidden">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <img 
                src="/images/logo.png" 
                alt="Elegent Logo" 
                className="h-10 w-auto object-contain transition-all"
                style={{ filter: 'brightness(0) saturate(100%)', WebkitFilter: 'brightness(0) saturate(100%)' }}
              />
            </Link>
          </div>

          {/* Mobile Icons - Right Side */}
          <div className="flex-1 flex items-center justify-end space-x-6">
            {/* Cart Icon with badge for Mobile */}
            <Link href="/cart" className="text-gray-700 relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* User Icon for Mobile */}
            <Link href={session?.status === "authenticated" ? "/profile" : "/login"} className="text-gray-700">
              <UserIcon className="h-5 w-5" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <div className="w-6 h-6 flex flex-col justify-between">
                  <div className="w-full h-0.5 bg-gray-700 rounded-sm"></div>
                  <div className="w-full h-0.5 bg-gray-700 rounded-sm"></div>
                  <div className="w-full h-0.5 bg-gray-700 rounded-sm"></div>
                  <div className="w-full h-0.5 bg-gray-700 rounded-sm"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Logo - Hidden on Mobile */}
        <Link href="/" className="hidden md:flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Elegent Logo" 
            className="h-12 w-auto object-contain transition-all"
            style={{ filter: 'brightness(0) saturate(100%)', WebkitFilter: 'brightness(0) saturate(100%)' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="flex items-center text-gray-700 hover:text-primary font-medium px-2 py-1 transition-colors">
            <HomeIcon className="h-4 w-4 mr-1" />
            Home
          </Link>
          <Link href="/products" className="flex items-center text-gray-700 hover:text-primary font-medium px-2 py-1 transition-colors">
            <TagIcon className="h-4 w-4 mr-1" />
            Shop
          </Link>
          <Link href="/contact" className="flex items-center text-gray-700 hover:text-primary font-medium px-2 py-1 transition-colors">
            <PhoneIcon className="h-4 w-4 mr-1" />
            Contact
          </Link>
          {session?.data?.user?.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="text-gray-700 hover:text-primary font-medium px-2 py-1 bg-gray-100 rounded-md transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Search and Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />
          
          {/* Wishlist Icon */}
          <Link href="/wishlist" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
            <HeartIcon className="h-5 w-5" />
          </Link>
          
          {/* Cart Icon with badge */}
          <div className="relative">
            <Link href="/cart" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Auth Section */}
          {session?.status === "authenticated" ? (
            <div className="relative group">
              <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded-full px-3 py-1.5 transition-colors">
                <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8">
                  <span className="text-sm font-medium">{session.data.user.name?.charAt(0) || "U"}</span>
                </div>
                <span className="text-gray-700 hidden sm:inline font-medium">
                  {session.data.user.name?.split(' ')[0] || "Account"}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-1 w-64 bg-white shadow-lg rounded-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-semibold text-gray-800 truncate">{session.data.user.email}</p>
                </div>
                
                <div className="p-2 space-y-1">
                  <Link 
                    href="/profile" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <UserIcon className="h-5 w-5 mr-2" /> 
                    My Profile
                  </Link>
                  
                  <Link 
                    href="/orders" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" /> 
                    My Orders
                  </Link>
                  
                  <Link 
                    href="/wishlist" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <HeartIcon className="h-5 w-5 mr-2" /> 
                    My Wishlist
                  </Link>
                </div>
                
                <div className="p-2 border-t border-gray-200">
                  <button 
                    onClick={() => signOut()} 
                    className="flex w-full items-center px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center whitespace-nowrap bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              <span className="whitespace-nowrap">Sign In</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - Slide down when open */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen bg-white border-t border-gray-200' : 'max-h-0'}`}>
        <nav className="flex flex-col px-4 py-2 space-y-2">
          <Link href="/" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md">
            <HomeIcon className="h-5 w-5 mr-3" /> Home
          </Link>
          <Link href="/products" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md">
            <TagIcon className="h-5 w-5 mr-3" /> Shop
          </Link>
          <Link href="/contact" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md">
            <PhoneIcon className="h-5 w-5 mr-3" /> Contact
          </Link>
          <Link href="/wishlist" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md">
            <HeartIcon className="h-5 w-5 mr-3" /> Wishlist
          </Link>
          {session?.data?.user?.role === "admin" && (
            <Link href="/admin/dashboard" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Dashboard
            </Link>
          )}
          <div className="py-2 mt-2 border-t border-gray-200">
            <form className="px-4 py-2">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}
