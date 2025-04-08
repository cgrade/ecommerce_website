import React from 'react';

export const metadata = {
  title: 'Frequently Asked Questions | Elvix Clothing',
  description: 'Find answers to common questions about Elvix Clothing products, orders, shipping, and more.',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ordering & Payment</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-green-700">How do I place an order?</h3>
              <p className="mt-2 text-gray-700">
                Browse our products, select your desired items, add them to your cart, and proceed to checkout. 
                Follow the steps to provide shipping information and payment details to complete your order.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-700">
                We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. 
                All payments are processed securely through our payment gateway.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Can I modify or cancel my order after it's placed?</h3>
              <p className="mt-2 text-gray-700">
                For order modifications or cancellations, please contact us at elvixclothing@gmail.com as soon as possible. 
                We can usually accommodate changes if the order hasn't been processed for shipping yet.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping & Delivery</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-green-700">How long will it take to receive my order?</h3>
              <p className="mt-2 text-gray-700">
                Domestic orders typically arrive within 3-5 business days. International shipping may take 7-14 business days, 
                depending on the destination and customs processing. You'll receive a tracking number once your order ships.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Do you ship internationally?</h3>
              <p className="mt-2 text-gray-700">
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. 
                Please note that customers are responsible for any customs duties or taxes imposed by their country.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">How can I track my order?</h3>
              <p className="mt-2 text-gray-700">
                Once your order ships, you'll receive a confirmation email with a tracking number and link. 
                You can also track your order by logging into your account on our website.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Returns & Exchanges</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-green-700">What is your return policy?</h3>
              <p className="mt-2 text-gray-700">
                We accept returns within 30 days of delivery for unworn items in original condition with tags attached. 
                Please contact us at elvixclothing@gmail.com to initiate a return.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">How do I exchange an item?</h3>
              <p className="mt-2 text-gray-700">
                For exchanges, please return the original item and place a new order for the desired replacement. 
                Contact our customer service team if you need assistance with this process.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Who pays for return shipping?</h3>
              <p className="mt-2 text-gray-700">
                Customers are responsible for return shipping costs unless the return is due to our error (wrong item sent or defective product). 
                In those cases, we'll provide a prepaid return label.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-green-700">How do I find my size?</h3>
              <p className="mt-2 text-gray-700">
                Each product page includes a detailed size guide with measurements. If you're between sizes or have specific questions, 
                please contact our customer service team for assistance.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Are your products ethically made?</h3>
              <p className="mt-2 text-gray-700">
                Yes, we're committed to ethical manufacturing practices. We work with suppliers who provide fair wages and safe working conditions. 
                We're continuously improving our sustainability efforts across our supply chain.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">How should I care for my Elvix Clothing items?</h3>
              <p className="mt-2 text-gray-700">
                Care instructions are included on the tag of each garment. Generally, we recommend washing in cold water, 
                avoiding bleach, and air drying when possible to maintain the quality and longevity of your items.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact & Support</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-green-700">How can I contact customer service?</h3>
              <p className="mt-2 text-gray-700">
                You can reach our customer service team by email at elvixclothing@gmail.com or by phone at +234 9130315165. 
                We're available Monday through Friday, 9am to 6pm, and Saturday 10am to 4pm.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Do you have a physical store?</h3>
              <p className="mt-2 text-gray-700">
                Currently, we operate exclusively online. This allows us to offer competitive pricing and serve customers worldwide. 
                Follow our social media accounts for information about pop-up shops and events.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-green-700">Can I become a reseller of Elvix Clothing products?</h3>
              <p className="mt-2 text-gray-700">
                We do offer wholesale opportunities for qualified retailers. Please contact us at elvixclothing@gmail.com with 
                details about your business for more information on our wholesale program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
