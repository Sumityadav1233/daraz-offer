import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SpinWheel from '../components/SpinWheel';
import WinModal from '../components/WinModal';
import ProductShowroom from '../components/ProductShowroom';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleWin = (res) => {
    setResult(res);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Spin Wheel Section */}
        <section className="bg-[#fcfcfc] py-16 md:py-24 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-600 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-orange-600/10 rounded-full border border-orange-600/20 mb-6">
                <span className="text-orange-600 font-black uppercase tracking-widest text-[10px]">
                  Special Anniversary Celebration Offer
                </span>
              </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: Product Showroom */}
              <div className="lg:col-span-4 h-full xl:pl-10 order-2 lg:order-1">
                <ProductShowroom />
              </div>

              {/* Right Side: Spin Wheel */}
              <div className="lg:col-span-8 flex flex-col items-center order-1 lg:order-2">
                <SpinWheel onWin={handleWin} />
                <p className="text-gray-400 mt-16 text-sm italic font-medium max-w-lg text-center leading-relaxed">
                  * Note: Each user has only one attempt. Winners will be contacted for delivery verification within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Exciting Rewards</h3>
              <p className="text-gray-600">Premium cosmetic products from top international brands.</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Nepal-wide Delivery</h3>
              <p className="text-gray-600">Free courier delivery at your doorstep within 2-3 days.</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 text-center">
               <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">24hr Support</h3>
              <p className="text-gray-600">Our team will call you within 24 hours of winning.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 px-4">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} daraz-style - All Rights Reserved. Not affiliated with Daraz.
        </div>
      </footer>

      {showModal && (
        <WinModal 
          result={result} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default LandingPage;
