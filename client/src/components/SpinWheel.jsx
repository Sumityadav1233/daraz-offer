import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

const SpinWheel = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();

  const sections = [
    { id: 1, label: 'Lipstick', color: '#f85606', type: 'win', image: '/rewards/lipstick.png', price: 1200 },
    { id: 2, label: 'Try Again', color: '#1a1a1a', type: 'lose' },
    { id: 3, label: 'Face Cream', color: '#f85606', type: 'win', image: '/rewards/face_cream.png', price: 2500 },
    { id: 4, label: 'Try Again', color: '#1a1a1a', type: 'lose' },
    { id: 5, label: 'Perfume', color: '#f85606', type: 'win', image: '/rewards/perfume.png', price: 3500 },
    { id: 6, label: 'Try Again', color: '#1a1a1a', type: 'lose' },
    { id: 7, label: 'Face Wash', color: '#f85606', type: 'win', image: '/rewards/face_wash.png', price: 1500 },
    { id: 8, label: 'Try Again', color: '#1a1a1a', type: 'lose' },
  ];

  const spin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Logic: Land ONLY on winning sections (0, 2, 4, 6)
    // There are 8 sections, each 45 degrees.
    const winIndices = [0, 2, 4, 6];
    const randomIndex = winIndices[Math.floor(Math.random() * winIndices.length)];
    
    // Wait, the calculation to land on a specific index:
    // pointer is at 0 deg (top).
    // resultIndex = floor((360 - finalDegree) / 45)
    // finalDegree = (360 - (resultIndex * 45 + randomOffset))
    // We want resultIndex to be randomIndex.
    const randomOffset = 10 + Math.random() * 25; // Random offset within the 45 deg segment
    const targetDegree = 360 - (randomIndex * 45 + randomOffset);
    
    const extraSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full rotations
    const totalRotation = rotation + (extraSpins * 360) + targetDegree;
    
    setRotation(totalRotation);

    await controls.start({
      rotate: totalRotation,
      transition: {
        duration: 4,
        ease: [0.15, 0, 0.15, 1], // Custom easing for "heavy" wheel feel
      }
    });

    setIsSpinning(false);

    // Determine result based on logic (guaranteed win)
    const result = sections[randomIndex];

    if (result.type === 'win') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f85606', '#ffffff', '#ffd700']
      });
    }

    setTimeout(() => {
      onWin(result);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
        {/* Pointer */}
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 z-30">
          <div className="w-10 h-10 bg-white rotate-45 border-4 border-[#f85606] shadow-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-[#f85606] rounded-full"></div>
          </div>
        </div>

        {/* Wheel Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#f85606] opacity-20 animate-pulse blur-[100px]"></div>

        {/* The Wheel */}
        <motion.div
           animate={controls}
           className="w-full h-full rounded-full border-[10px] border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative spin-wheel-container"
           style={{ 
             background: 'conic-gradient(from 0deg, ' + 
               sections.map((s, i) => `${s.color} ${i * (100/sections.length)}% ${(i+1) * (100/sections.length)}%`).join(', ') + 
             ')'
           }}
        >
          {sections.map((section, i) => (
            <div 
              key={section.id}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * (360/sections.length)}deg)` }}
            >
              <div 
                className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center text-white flex flex-col items-center"
                style={{ width: '120px' }}
              >
                {section.type === 'win' ? (
                  <>
                    <img 
                      src={section.image} 
                      alt={section.label} 
                      className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-md mb-2"
                    />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter leading-tight bg-black/30 px-2 py-0.5 rounded-full">
                      {section.label}
                    </span>
                  </>
                ) : (
                  <div className="mt-16 text-xs md:text-sm font-black uppercase opacity-60">
                    {section.label}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Inner Circle Logo */}
          <div className="absolute inset-0 m-auto w-20 h-20 md:w-32 md:h-32 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center z-10 shadow-xl">
             <div className="flex flex-col items-center">
               <span className="text-[#f85606] font-black text-xs md:text-xl leading-none">DARAZ</span>
               <span className="text-gray-400 font-bold text-[8px] md:text-[10px] tracking-widest uppercase">Luck&Win</span>
             </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className={`
          px-16 py-5 rounded-full text-white text-3xl font-black uppercase tracking-widest transition-all
          ${isSpinning 
            ? 'bg-gray-400 cursor-not-allowed translate-y-2 opacity-50' 
            : 'bg-[#f85606] hover:bg-[#d64a05] active:translate-y-1 shadow-[0_12px_0_rgb(181,63,4)] glow-orange'}
        `}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN NOW'}
      </button>
    </div>
  );
};

export default SpinWheel;

