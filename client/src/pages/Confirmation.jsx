import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Request Received!</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Thank you for participating! Your request has been received. Our delivery team will contact you within <span className="font-bold text-gray-900">24 hours</span> to verify your details.
          </p>
          <div className="space-y-4">
             <button
               onClick={() => navigate('/')}
               className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all font-bold"
             >
               Return to Home
             </button>
             <p className="text-sm text-gray-400">
               Check your phone for a verification call or message.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
