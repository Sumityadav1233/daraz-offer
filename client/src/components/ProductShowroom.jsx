import React from 'react';

const ProductShowroom = () => {
  const products = [
    { id: 1, label: 'Lipstick', image: '/rewards/lipstick.png', price: 'Rs. 1,200', tag: 'Limited' },
    { id: 2, label: 'Face Cream', image: '/rewards/face_cream.png', price: 'Rs. 2,500', tag: 'Premium' },
    { id: 3, label: 'Perfume', image: '/rewards/perfume.png', price: 'Rs. 3,500', tag: 'Luxury' },
    { id: 4, label: 'Face Wash', image: '/rewards/face_wash.png', price: 'Rs. 1,500', tag: 'Popular' },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-[40px] p-8 border border-gray-100 shadow-2xl h-full flex flex-col items-center">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
          You have a chance to win <br/>
          <span className="text-[#f85606]">one of these products!</span>
        </h3>
        <div className="w-12 h-1 bg-[#f85606] mx-auto rounded-full"></div>
      </div>

      <div className="space-y-6 w-full">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group flex items-center space-x-4 p-3 rounded-2xl bg-gray-50 hover:bg-white hover:scale-105 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-lg"
          >
            <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center p-2">
               <img 
                 src={product.image} 
                 alt={product.label} 
                 className="w-full h-full object-contain transform group-hover:rotate-6 transition-transform duration-300"
               />
               <div className="absolute top-1 left-1 bg-[#f85606] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                 {product.tag}
               </div>
            </div>
            
            <div className="flex-grow">
               <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{product.label}</div>
               <div className="text-orange-600 font-bold text-xs">{product.price}</div>
               <div className="flex space-x-1 mt-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <span key={star} className="text-yellow-400 text-[10px]">★</span>
                 ))}
               </div>
            </div>

            <div className="text-gray-300 group-hover:text-orange-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
          Free Delivery <br/>
          <span className="text-[#f85606]">Across all Nepal</span>
        </p>
      </div>
    </div>
  );
};

export default ProductShowroom;
