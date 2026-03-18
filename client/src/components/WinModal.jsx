import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WinModal = ({ result, onClose }) => {
  const navigate = useNavigate();
  
  if (!result) return null;

  const isWin = result.type === 'win';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
        >
          {isWin && (
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
          )}

          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {isWin ? '🎉 Congratulations!' : 'Try Again Next Time!'}
          </h2>
          
          {isWin ? (
            <>
              <p className="text-gray-600 mb-6">You've won a premium reward!</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <img 
                  src={`/src/assets/${result.id === 1 ? 'lipstick' : result.id === 3 ? 'face_cream' : result.id === 5 ? 'perfume' : 'face_wash'}.png`} 
                  alt={result.label}
                  className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-800">{result.label}</h3>
                <div className="mt-2">
                  <span className="text-gray-400 line-through mr-2 font-medium">Rs. {result.price}</span>
                  <span className="text-[#f85606] font-black text-2xl">FREE</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/claim', { state: { reward: result } })}
                className="w-full bg-[#f85606] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all active:scale-95"
              >
                Claim Reward
              </button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-6">😔</div>
              <p className="text-gray-600 mb-8">Don't lose hope! There are still many prizes waiting for you.</p>
              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
              >
                Close
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WinModal;
