import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden bg-grid-pattern relative">
      {/* Sidebar for navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navigation Header */}
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto w-full fade-in pb-12">
            {children}
          </div>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
