"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * @returns {JSX.Element} The login page component.
 * @description Allows users to log in with email and password.
 */
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Login</h1>
        <p className="text-gray-600">Sign in to your account to continue shopping</p>
      </div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md w-full font-medium transition-colors">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-500 hover:underline font-medium">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
