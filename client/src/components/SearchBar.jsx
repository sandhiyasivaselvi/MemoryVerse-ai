import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = ({ value, onChange, placeholder = 'Search by skills, category, document name, or keywords...' }) => {
  return (
    <div className="relative w-full max-w-xl shadow-premium rounded-2xl">
      <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
        <HiOutlineSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
