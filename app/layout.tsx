import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { NextAuthProvider } from "./providers";

/**
 * @title Elegent E-Commerce Metadata
 * @description Defines metadata for SEO and site information.
 */
export const metadata: Metadata = {
  title: "Elegent - Sports & Lifestyle Products",
  description: "Shop the best sports and lifestyle products at Elegent.",
};

/**
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @returns {JSX.Element} The root layout component.
 * @description Root layout component that includes Header, Footer, and Toaster.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header />
          <main className="pt-28">{children}</main>
          <Footer />
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
