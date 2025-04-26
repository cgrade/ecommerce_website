'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

/**
 * A fixed WhatsApp button component that appears on all pages
 * and redirects to WhatsApp chat when clicked
 */
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = 'Hello! I have a question about your products.'
}) => {
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Create WhatsApp URL with phone and pre-filled message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50 transition-transform duration-300 hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
};

export default WhatsAppButton;
