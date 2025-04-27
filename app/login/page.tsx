"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// Component that uses useSearchParams wrapped in Suspense boundary
function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for verification success or error messages in URL params
  useEffect(() => {
    const verified = searchParams.get("verified");
    const errorParam = searchParams.get("error");

    if (verified === "true") {
      toast.success("Email verification successful! You can now log in.");
    }

    if (errorParam === "verification_failed") {
      toast.error("Email verification failed. Please try again or contact support.");
    } else if (errorParam === "invalid_token") {
      toast.error("Invalid verification token. Please try again or contact support.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        setError(result?.error || "Invalid email or password. Please try again.");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md w-full font-medium transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

// Loading fallback component for Suspense
function LoginFormLoading() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
      </div>
    </div>
  );
}

/**
 * @returns {JSX.Element} The login page component.
 * @description Allows users to log in with email and password.
 */
export default function LoginPage() {


  return (
    <div className="container mx-auto px-4 py-16 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Login</h1>
        <p className="text-gray-600">Sign in to your account to continue shopping</p>
      </div>
      <Suspense fallback={<LoginFormLoading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
