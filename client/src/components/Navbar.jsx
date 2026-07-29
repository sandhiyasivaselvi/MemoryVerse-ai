import React from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaInfoCircle } from 'react-icons/fa';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Welcome';
    const segment = path.substring(1);
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="p-1.5 -ml-1.5 text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
          title="Toggle Navigation"
        >
          <HiOutlineMenuAlt2 className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-display font-bold text-slate-800">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Help/About navigation Link */}
        <Link
          to="/about"
          className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="About MemoryVerse"
        >
          <FaInfoCircle className="w-5 h-5" />
        </Link>

        {/* Profile indicator */}
        <Link
          to="/profile"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-600 transition-colors text-sm font-medium"
        >
          <FaUserCircle className="w-5 h-5 text-slate-400" />
          <span className="hidden sm:inline">Alex Carter</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
