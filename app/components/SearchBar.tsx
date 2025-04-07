"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * @returns {JSX.Element} The search bar component.
 * @description Allows users to search for products.
 */
export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </form>
  );
}
