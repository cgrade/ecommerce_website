import { FaInstagram, FaTiktok } from "react-icons/fa6";

/**
 * @returns {JSX.Element} The footer component.
 * @description Renders the site footer with links and social icons.
 */
export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-12 border-t border-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary tracking-tight">Elegent</h3>
            <p className="text-secondary opacity-90 leading-relaxed">Bringing you the best in sports and lifestyle products with premium quality and timeless design.</p>
            <p className="mt-4 text-secondary opacity-80 text-sm">&copy; {new Date().getFullYear()} Elegent. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-secondary opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center group">
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-secondary opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center group">
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                </a>
              </li>
              <li>
                <a href="/faq" className="text-secondary opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center group">
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">FAQ</span>
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-secondary opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center group">
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">Shipping & Returns</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary tracking-tight">Stay Connected</h3>
            <p className="text-secondary opacity-90 mb-4">Follow us on social media for new arrivals and exclusive offers.</p>
            <div className="flex space-x-5">
              <a 
                href="https://www.instagram.com/elvix.sn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary bg-black/20 p-2.5 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@elvix.sn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-secondary bg-black/20 p-2.5 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-secondary text-sm opacity-80">
          <p>Designed with a focus on simplicity and elegance</p>
        </div>
      </div>
    </footer>
  );
}
