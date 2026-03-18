import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const ClaimForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reward = location.state?.reward;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
    chowk: '',
    address: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    "Kathmandu", "Pokhara", "Lalitpur", "Bharatpur", "Birganj", 
    "Biratnagar", "Dhangadhi", "Itahari", "Butwal", "Hetauda",
    "Janakpur", "Nepalgunj", "Dharan"
  ];

  if (!reward) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">No reward found.</h2>
        <button onClick={() => navigate('/')} className="bg-[#f85606] text-white px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to second page (Email Verification) instead of submitting
    navigate('/verify-account', { state: { reward, claimData: formData } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full">
          <div className="flex items-center space-x-4 mb-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
             <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                <img 
                   src={`/rewards/${reward.id === 1 ? 'lipstick' : reward.id === 3 ? 'face_cream' : reward.id === 5 ? 'perfume' : 'face_wash'}.png`} 
                  alt={reward.label}
                  className="w-12 h-12 object-contain"
                />
             </div>
             <div>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Selected Reward</p>
                <h3 className="text-lg font-bold text-gray-900">{reward.label}</h3>
             </div>
          </div>

          <h2 className="text-2xl font-black mb-6 text-gray-900">Delivery Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] outline-none"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="98XXXXXXXX"
                  pattern="[9][0-9]{9}"
                  title="Please enter a valid 10-digit Nepal phone number starting with 9"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] outline-none"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <select
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] outline-none appearance-none"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option value="">Select City</option>
                  {cities.sort().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Chowk Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Kalanki"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] outline-none"
                  value={formData.chowk}
                  onChange={(e) => setFormData({...formData, chowk: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Address Detail Message</label>
              <textarea
                required
                rows="2"
                placeholder="Enter detailed address"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f85606] outline-none resize-none"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo (ID Verification)</label>
              <input
                required
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-[#f85606] hover:file:bg-orange-100"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, photo: reader.result });
                    };
                    reader.readAsDataURL(file);
                  } else if (file) {
                    alert('Please select a valid image file.');
                    e.target.value = null;
                  }
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f85606] text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all active:scale-95 mt-4 glow-orange"
            >
              Submit
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Step 1 of 2: Basic Information
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
