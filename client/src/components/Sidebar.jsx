import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineX, 
  HiOutlineDocumentReport, 
  HiOutlineCloudUpload, 
  HiOutlineSearch, 
  HiOutlineClock, 
  HiOutlineUser, 
  HiOutlineHome,
  HiOutlineInformationCircle 
} from 'react-icons/hi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Home', path: '/', icon: HiOutlineHome },
    { name: 'Dashboard', path: '/dashboard', icon: HiOutlineDocumentReport },
    { name: 'Upload', path: '/upload', icon: HiOutlineCloudUpload },
    { name: 'Search', path: '/search', icon: HiOutlineSearch },
    { name: 'Timeline', path: '/timeline', icon: HiOutlineClock },
    { name: 'Profile', path: '/profile', icon: HiOutlineUser },
    { name: 'About', path: '/about', icon: HiOutlineInformationCircle },
  ];

  return (
    <>
      {/* Mobile Sidebar overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar drawer container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-slate-100 border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header Brand Area */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-xl">
              <span className="text-xl font-bold font-display text-white">MV</span>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg leading-tight tracking-wide text-white">MemoryVerse</h2>
              <p className="text-xs text-slate-400 font-medium">Smart Portfolio</p>
            </div>
          </div>
          
          {/* Close button for mobile drawers */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg lg:hidden"
            title="Close menu"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/15' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer Hackathon Details */}
        <div className="p-6 border-t border-slate-800 text-center">
          <div className="p-3 bg-slate-800/40 rounded-xl">
            <span className="text-xs font-semibold text-accent-400 tracking-wider uppercase">Hackathon '26</span>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">MemoryVerse AI submission</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
