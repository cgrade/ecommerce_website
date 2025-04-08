import React from 'react';

export const metadata = {
  title: 'About Us | Elvix Clothing',
  description: 'Learn more about Elvix Clothing, our story, mission, and values.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">About Elvix Clothing</h1>
      
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          Founded with a passion for quality and style, Elvix Clothing has been at the forefront of fashion innovation since our inception. 
          What started as a small boutique has grown into a beloved brand known for our commitment to excellence and customer satisfaction.
        </p>
        <p className="mb-4">
          Our journey began with a simple idea: to create clothing that combines comfort, durability, and contemporary design. Today, we continue 
          to build on that foundation, constantly evolving to meet the changing needs of our customers while staying true to our core values.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Elvix Clothing, our mission is to provide high-quality, stylish apparel that empowers individuals to express their unique identity. 
          We believe that clothing is more than just fabric—it's a form of self-expression and confidence.
        </p>
        <p className="mb-4">
          We are committed to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Creating durable, comfortable clothing that stands the test of time</li>
          <li>Offering inclusive sizing and styles that celebrate diversity</li>
          <li>Providing exceptional customer service at every touchpoint</li>
          <li>Embracing sustainable practices that minimize our environmental impact</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Quality</h3>
            <p>We never compromise on quality, using only the finest materials and craftsmanship in every piece we create.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Innovation</h3>
            <p>We continuously explore new designs, technologies, and processes to stay ahead of trends and exceed expectations.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Integrity</h3>
            <p>We operate with honesty and transparency in all our business practices and relationships.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Community</h3>
            <p>We value our customers as part of our extended family and strive to build lasting connections.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
