import React from 'react';
import { FaBrain, FaDatabase, FaNodeJs, FaReact } from 'react-icons/fa';
import { 
  HiOutlineCode, 
  HiOutlineSparkles, 
  HiOutlineBookOpen,
  HiOutlineCloudUpload,
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineChartBar
} from 'react-icons/hi';

const About = () => {
  const techStack = [
    { name: 'React.js (Vite)', role: 'Frontend library for responsive state rendering', icon: FaReact, color: 'text-blue-500' },
    { name: 'Tailwind CSS', role: 'Premium styling and responsive grids framework', icon: HiOutlineCode, color: 'text-sky-400' },
    { name: 'Node.js & Express', role: 'Server API runtime engine and file parsing controller', icon: FaNodeJs, color: 'text-emerald-500' },
    { name: 'MongoDB & Mongoose', role: 'Database model repository for portfolio indexing', icon: FaDatabase, color: 'text-emerald-600' },
    { name: 'Gemini AI Integration', role: 'Category sorting, skill extraction & summaries', icon: FaBrain, color: 'text-indigo-500' }
  ];

  const features = [
    {
      title: 'Resume Upload',
      description: 'Seamlessly ingest resumes, certificates, project reports, and professional letters in multiple formats.',
      icon: HiOutlineCloudUpload,
      gradient: 'from-blue-600 to-blue-400 shadow-blue-500/10'
    },
    {
      title: 'AI Skill Extraction',
      description: 'Automatically extract core technical competencies, frameworks, and tools using Google Gemini AI.',
      icon: HiOutlineSparkles,
      gradient: 'from-emerald-500 to-teal-400 shadow-emerald-500/10'
    },
    {
      title: 'Smart Search',
      description: 'Query your portfolio using natural keywords and find matching credentials instantly.',
      icon: HiOutlineSearch,
      gradient: 'from-sky-500 to-blue-500 shadow-sky-500/10'
    },
    {
      title: 'Interactive Timeline',
      description: 'Trace your academic milestones chronologically on a dynamic vertical growth timeline.',
      icon: HiOutlineClock,
      gradient: 'from-indigo-500 to-blue-500 shadow-indigo-500/10'
    },
    {
      title: 'Portfolio Dashboard',
      description: 'Monitor aggregate file metrics, category breakdowns, and top skills in a modern, consolidated view.',
      icon: HiOutlineChartBar,
      gradient: 'from-purple-500 to-indigo-500 shadow-purple-500/10'
    },
    {
      title: 'Secure Document Management',
      description: 'Isolate physical uploads locally and index metadata securely via a MongoDB database layout.',
      icon: HiOutlineShieldCheck,
      gradient: 'from-slate-700 to-slate-900 shadow-slate-700/10'
    }
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12 fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
          About MemoryVerse
        </h2>
        <p className="text-xs font-semibold text-slate-400">
          The concept, features, and technology behind the AI-powered digital portfolio platform.
        </p>
      </div>

      {/* Main Core Story Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-850 font-display flex items-center gap-2.5">
          <HiOutlineBookOpen className="text-blue-600 w-5.5 h-5.5" />
          <span>Core Concept</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          MemoryVerse is an AI-powered smart portfolio platform that helps users upload resumes, extract skills using Gemini AI, organize achievements, build interactive timelines, and manage professional portfolios.
        </p>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          By centralizing certificates, transcripts, project papers, and work experience letters into a single intelligent hub, MemoryVerse automatically indexes, categorizes, and maps your credentials. This eliminates scattered directories and gives you a single, unified digital footprint that is fully searchable.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-850 font-display flex items-center gap-2.5">
          <HiOutlineSparkles className="text-blue-600 w-5.5 h-5.5" />
          <span>Key Features</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center mb-4 bg-gradient-to-tr ${feat.gradient} shadow`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm font-display mb-1.5 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Stack Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-850 font-display flex items-center gap-2.5">
          <HiOutlineCode className="text-blue-600 w-5.5 h-5.5" />
          <span>Application Stack</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 hover:shadow-sm transition-all duration-200">
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${tech.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-850 text-xs sm:text-sm">{tech.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium leading-normal mt-0.5">{tech.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default About;
