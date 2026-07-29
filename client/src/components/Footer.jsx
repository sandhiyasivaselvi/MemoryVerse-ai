import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 px-6 bg-white border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} MemoryVerse AI. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Google Gemini API Integration</span>
          <span className="w-2 h-2 rounded-full bg-accent-500 inline-block animate-pulse"></span>
          <span className="text-slate-500 font-semibold">Active</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
