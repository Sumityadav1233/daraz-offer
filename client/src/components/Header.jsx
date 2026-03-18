import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f85606] h-14 md:h-18 flex items-center px-4 md:px-10 shadow-xl border-b border-white/10">
      <div className="flex items-center">
        {/* EXACT Daraz Logo - Medium Sized & Perfectly Positioned */}
        <Link to="/" className="flex items-center cursor-pointer hover:opacity-95 transition-all group">
          <svg className="h-8 w-8 md:h-10 md:w-10 drop-shadow-lg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The white 'd' body */}
            <path d="M50 5 L90 25 V75 L50 95 L10 75 V25 L50 5Z" fill="white" />
            {/* The orange play triangle cutout */}
            <path d="M50 28 L84 50 L50 72 V28Z" fill="#f85606" />
          </svg>
          <span className="ml-2 text-white font-[1000] text-3xl md:text-4xl tracking-tighter transition-transform group-hover:scale-105 flex items-end">
            daraz
          </span>
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-3 md:space-x-8 text-white text-[10px] md:text-sm font-bold tracking-tight uppercase">
        <span className="hidden xl:inline opacity-90 cursor-pointer hover:underline">SAVE MORE ON APP</span>
        <a href="#" className="hover:opacity-80 transition-opacity">Become a Seller</a>
        <a href="#" className="hover:opacity-80 transition-opacity">Help & Support</a>
      </div>
    </header>
  );
};

export default Header;
