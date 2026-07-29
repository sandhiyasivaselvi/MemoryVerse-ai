import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineCloudUpload, HiOutlineSearch, HiOutlineX, HiOutlineInformationCircle, HiCheck } from 'react-icons/hi';
import { FaBrain, FaHistory } from 'react-icons/fa';

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const statistics = [
    { 
      icon: '📄', 
      title: 'Supports PDF, DOCX & Images', 
      modalContent: {
        description: 'Ingest your academic and career certificates, letters, and portfolios directly into MemoryVerse AI.',
        howItWorks: 'Drag & drop files or choose locally. Multer maps local disk buffers which are parsed textually and visually in the backend.',
        capabilities: ['PDF, DOCX & Image Support', 'Drag & Drop upload', 'Maximum 10MB file size', 'Secure local processing']
      }
    },
    { 
      icon: '🤖', 
      title: 'AI Summary & Skill Extraction', 
      modalContent: {
        description: 'Extract deep contextual summaries, classification categories, and skills automatically.',
        howItWorks: 'Passes parsed document text or image matrices to Google Gemini AI (gemini-1.5-flash) using JSON-mode schema formats.',
        capabilities: ['AI-generated summary', 'Technical skill extraction', 'Category classification', 'Google Gemini AI Integration']
      }
    },
    { 
      icon: '🔍', 
      title: 'Natural Language Search', 
      modalContent: {
        description: 'Search and retrieve portfolio files instantly without navigating nested folder structures.',
        howItWorks: 'The backend index matches search words against the document name, summary, category, and skill attributes with regular expressions.',
        capabilities: ['"Show Python certificates"', '"Find my internship letter"', '"Show AI projects"', 'Semantic query matching']
      }
    },
    { 
      icon: '🔒', 
      title: 'Secure Document Storage', 
      modalContent: {
        description: 'Securely store and manage your credentials, certificates, and projects.',
        howItWorks: 'Document metadata indexes save directly to MongoDB while files remain isolated in the server\'s uploads folder.',
        capabilities: ['MongoDB database storage', 'Metadata organization', 'Original files remain accessible', 'Secure document management']
      }
    }
  ];

  const features = [
    {
      title: 'Smart Upload',
      description: 'Upload certificates, resumes, reports, and letters. Multi-format support handles files up to 10MB.',
      icon: HiOutlineCloudUpload,
      gradient: 'from-blue-600 to-blue-400 shadow-blue-500/10'
    },
    {
      title: 'AI Analysis',
      description: 'Gemini AI automatically parses text, categorizes documents, and extracts verified professional skills.',
      icon: FaBrain,
      gradient: 'from-emerald-500 to-teal-400 shadow-emerald-500/10'
    },
    {
      title: 'Smart Search',
      description: 'Find credentials instantly using natural queries. Retrieve documents matching your technical skills.',
      icon: HiOutlineSearch,
      gradient: 'from-sky-500 to-blue-500 shadow-sky-500/10'
    },
    {
      title: 'Digital Timeline',
      description: 'Track your career path chronologically. Map certifications and achievements back to specific dates.',
      icon: FaHistory,
      gradient: 'from-indigo-600 to-blue-500 shadow-indigo-600/10'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden bg-grid-pattern animate-fadeIn">
      
      {/* Decorative gradient blur rings and radial glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Top Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-glass">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 rounded-xl shadow-md shadow-blue-600/15">
              <span className="text-xl font-bold font-display text-white">MV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-slate-800 tracking-wide leading-none text-base sm:text-lg">MemoryVerse AI</span>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Smart Digital Identity</span>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/10 transition-all duration-350 hover:scale-[1.03] hover:shadow-lg flex items-center gap-1.5"
          >
            <span>Launch App</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Hero & Content Section (Fixed padding top to prevent overlap) */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 z-10 w-full text-center space-y-12">
        
        {/* Hero Title & Sub-text */}
        <div className="max-w-3xl mx-auto space-y-5 md:space-y-6 fade-in">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 shadow-sm backdrop-blur-sm mb-1">
            <span>✨ AI-Powered Student Portfolio</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] md:leading-[1.15]">
            Your Academic Journey<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Organized by AI
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-[1.75] font-medium max-w-2xl mx-auto">
            Build your intelligent academic portfolio in one place. Upload certificates, resumes, internships, and project reports. MemoryVerse AI automatically organizes, summarizes, extracts skills, and makes every document instantly searchable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-1.5">
            <Link
              to="/upload"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-blue-600/15 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiOutlineCloudUpload className="w-5 h-5" />
              <span>Upload Your First File</span>
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700 font-bold rounded-2xl text-sm shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <span>Explore Dashboard</span>
              <HiOutlineArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Feature Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 fade-in">
          {statistics.map((stat, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveModal(stat)}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:border-blue-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{stat.icon}</div>
              <h4 className="text-xs md:text-sm font-bold text-slate-800 font-display leading-tight">{stat.title}</h4>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 text-left fade-in">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            const elementId = feat.title.toLowerCase().replace(' ', '-');
            return (
              <div 
                key={index} 
                id={elementId}
                className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center mb-8 bg-gradient-to-tr ${feat.gradient} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 font-display mb-3 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modern Center Aligned Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-10 border-t border-slate-200/50 flex flex-col items-center justify-center gap-3 z-10 text-center">
        <p className="text-sm font-bold text-slate-700 tracking-wide font-display">MemoryVerse AI &copy; 2026</p>
        <p className="text-[11px] text-slate-400 font-normal tracking-wide">
          Built with React &bull; Node.js &bull; Express.js &bull; MongoDB &bull; Gemini AI
        </p>
      </footer>

      {/* Interactive Feature Modal Dialog */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-350"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-xl p-8 relative flex flex-col gap-6 text-left scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-110"
              title="Close modal"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>

            {/* Modal Logo & Title */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="text-4xl">{activeModal.icon}</span>
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Feature Overview</span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display mt-0.5 tracking-tight">{activeModal.title}</h3>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</h4>
              <p className="text-xs sm:text-sm text-slate-650 font-medium leading-[1.6]">
                {activeModal.modalContent.description}
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* How it works */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">How it works</h4>
              <div className="bg-blue-50/40 border border-blue-100/60 p-4 rounded-2xl flex items-start gap-3">
                <HiOutlineInformationCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 font-medium leading-[1.625]">
                  {activeModal.modalContent.howItWorks}
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Key Capabilities */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Capabilities</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                {activeModal.modalContent.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <HiCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Row */}
            <button
              onClick={() => setActiveModal(null)}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition-all duration-300 hover:shadow-lg shadow-md shadow-blue-600/10 active:scale-[0.98]"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
