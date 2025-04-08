import { FaInstagram, FaTiktok } from "react-icons/fa6";

/**
 * @returns {JSX.Element} The footer component.
 * @description Renders the site footer with links and social icons.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Elegent</h3>
            <p>Bringing you the best in sports and lifestyle products.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/elvix.sn" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@elvix.sn" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
