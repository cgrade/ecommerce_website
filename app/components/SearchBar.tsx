"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSearch} className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
