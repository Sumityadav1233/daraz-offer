import React from 'react';

const Hero = () => {
  return (
    <section className="bg-white py-12 md:py-20 px-4 text-center border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-bounce">
          Luck & Win – 17th Anniversary Special 🎉
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Spin and win exciting cosmetic rewards. Delivery available across Nepal.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
            <span className="text-orange-600 text-sm font-bold">✓ Authentic Products</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <span className="text-blue-600 text-sm font-bold">✓ Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <span className="text-green-600 text-sm font-bold">✓ Local Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
