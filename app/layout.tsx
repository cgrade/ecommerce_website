import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";
import "./styles/quill.css";
import { NextAuthProvider } from "./providers";

/**
 * @title Elegent E-Commerce Metadata
 * @description Defines metadata for SEO and site information.
 */
export const metadata: Metadata = {
  title: "Elegent - Premium Fashion",
  description: "Shop the best designer clothing and accessories.",
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
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <Header />
          <main className="pt-28">{children}</main>
          <Footer />
          <WhatsAppButton phoneNumber="+2347083443622" message="Hello! I need help with my order." />
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
