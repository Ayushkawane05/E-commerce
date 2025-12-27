import React from 'react';
import { Link } from 'react-router-dom';

const CardComponent = ({ title, subtitle, linkText, linkUrl, categoryName, customBgColor, imageUrl }) => {
  const bgColorClass = customBgColor || 'bg-pink-100'; 
  
  return (
    <div className={`relative p-8 md:p-12 rounded-[2rem] shadow-2xl h-96 flex flex-col justify-end overflow-hidden group ${bgColorClass}`}>
      
      {/* Freestyle Image Section */}
      {imageUrl && (
        <div className="absolute -top-10 -right-12 w-72 h-72 md:w-96 md:h-96 z-0 pointer-events-none">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain rotate-[15deg] transition-all duration-700 ease-out group-hover:rotate-[5deg] group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          />
        </div>
      )}

      {/* Text Content Area */}
      <div className="relative z-10 flex flex-col gap-0">
        {/* Title: Huge, Impactful, and "Logo-like" */}
        <h2 className="text-6xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter mb-2">
          {title}<span className="text-white/30">.</span>
        </h2>
        
        {/* Subtitle: High-end "Label" style */}
        <p className="text-[11px] text-white/90 font-light uppercase tracking-[0.4em] mb-8 ml-1">
          {subtitle}
        </p>
        
        <Link 
          to={linkUrl} 
          state={{ category: categoryName }}
          onClick={() => window.scrollTo(0,0)}
          className="inline-block w-fit px-10 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-none hover:bg-black hover:text-white transition-all duration-500 shadow-xl"
        >
          {linkText}
        </Link>
      </div>
      
      {/* Decorative background text for "Freestyle" feel */}
      <div className="absolute top-10 left-8 text-white/5 text-9xl font-black select-none pointer-events-none">
        0{title === 'Office' ? '1' : title === 'Home' ? '2' : '3'}
      </div>
      
    </div>
  );
};

export default CardComponent;