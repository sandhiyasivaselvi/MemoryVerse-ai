import React from 'react';

const Loader = ({ message = 'Processing with AI, please wait...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative flex items-center justify-center">
        {/* Spinning Outer Ring */}
        <div className="w-14 h-14 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        
        {/* Pulsing Core */}
        <div className="absolute w-6 h-6 bg-accent-400/30 rounded-full animate-ping"></div>
        <div className="absolute w-4 h-4 bg-accent-500 rounded-full"></div>
      </div>
      
      <p className="mt-5 text-sm font-medium text-slate-600 animate-pulse tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default Loader;
