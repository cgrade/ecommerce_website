"use client";

import PageContainer from "../components/PageContainer";
import { EnvelopeIcon, PhoneIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactPage() {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };
  
  return (
    <PageContainer title="Contact Us" subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible.">
      
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Elvix Clothing</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Elvix Clothing is a premier fashion brand specializing in high-quality, trendy apparel for the modern individual. 
              We pride ourselves on offering unique designs that blend comfort with style, ensuring our customers always look and feel their best.
            </p>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Our commitment to exceptional craftsmanship and customer satisfaction has made us a trusted name in the fashion industry. 
              Whether you're looking for everyday essentials or statement pieces, Elvix Clothing has you covered.
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <EnvelopeIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a href="mailto:elvixclothing@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                    elvixclothing@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a href="tel:+2349130315165" className="text-primary hover:text-primary/80 transition-colors">
                    +234 913 031 5165
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ClockIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Business Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Location</p>
                  <p className="text-gray-600">Lekki Phase 1, Lagos</p>
                  <p className="text-gray-600">Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-white shadow-lg rounded-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
          
          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="John Doe"
                    required
                    disabled={formSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="you@example.com"
                    required
                    disabled={formSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="+234 123 456 7890"
                  disabled={formSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="How can we help you?"
                  required
                  disabled={formSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Tell us more about your inquiry..."
                  required
                  disabled={formSubmitting}
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                  disabled={formSubmitting}
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                  I agree that my submitted data is being collected and stored. For details on how we use your information, please see our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.  
                </label>
              </div>

              <button
                type="submit"
                className={`w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors font-medium ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={formSubmitting}
              >
                {formSubmitting ? 'Sending...' : 'Send Message'}
              </button>
          </form>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.97620237584!2d3.4130033695823833!3d6.451278992992955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e7648d%3A0x3b47fcccbd246f41!2sLekki%20Phase%201%2C%20Lekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1650142930172!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Elvix Clothing Store Location"
          ></iframe>
        </div>
      </div>
    </PageContainer>
  );
}
