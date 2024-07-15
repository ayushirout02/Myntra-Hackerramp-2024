import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">About Us</h1>
        <p className="text-lg mb-8">Welcome to <strong className="text-purple-700">Style Evolution</strong>, where your style meets technology. We specialize in curating personalized outfits that reflect your unique personality through the magic of pop culture and advanced algorithms.</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Key Features</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Unlock your style with outfits inspired by your favorite characters.</li>
            <li className="mb-3">Using cutting-edge genetic algorithms, we create outfit suggestions tailored to your skin tone, body type, and style preferences.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-3">Discover your style with our fun, pop culture-inspired quizzes.</li>
            <li className="mb-3">Input your skin tone, body type, and style preferences to personalize your profile.</li>
            <li className="mb-3">Browse and shop outfits uniquely tailored to you.</li>
            <li className="mb-3">Enjoy a seamless shopping experience with outfits delivered to your doorstep.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Personalized fashion recommendations through genetic algorithms.</li>
            <li className="mb-3">Outfits inspired by your favorite pop culture icons.</li>
            <li className="mb-3">A delightful shopping experience with top-notch customer service.</li>
          </ul>
        </section>

        <p className="text-lg mb-8">Join us at Style Evolution and redefine your wardrobe with personalized, trendy outfits.</p>

      
      </div>
    </div>
  );
};

export default About;
