import React, { useState, useEffect } from 'react';
import { HiOutlineUser, HiOutlineMail, HiOutlineCalendar, HiOutlineDocumentText } from 'react-icons/hi';
import { FaUserCircle, FaGraduationCap, FaBriefcase, FaCode, FaAward } from 'react-icons/fa';
import Loader from '../components/Loader';
import documentService from '../services/documentService';

const Profile = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileStats();
  }, []);

  const fetchProfileStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await documentService.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load profile insights.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Analyzing profile footprint..." />;
  }

  const breakdown = stats?.categoryBreakdown || {
    Certificate: 0,
    Internship: 0,
    Project: 0,
    Resume: 0,
    Achievement: 0,
    Academic: 0,
    Other: 0
  };

  return (
    <div className="space-y-8">
      {/* Top Profile Header Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-300/10 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Large Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-500 to-accent-400 p-1 flex items-center justify-center shadow-lg">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-slate-400">
            <FaUserCircle className="w-22 h-22 text-slate-350" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">Alex Carter</h2>
            <span className="px-2.5 py-0.5 bg-primary-50 border border-primary-100 text-primary-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">
              Undergraduate Student
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-lg leading-relaxed">
            Aspiring Software Engineer focused on Full-stack Web Development and Machine Learning applications. Building a digital portfolio to track career landmarks.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-5 gap-y-2 pt-2 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <HiOutlineMail className="w-4 h-4 text-slate-400" />
              <span>alex.carter@university.edu</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FaGraduationCap className="w-4 h-4 text-slate-400" />
              <span>Class of 2026</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Academic stats summary */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="font-display font-bold text-slate-850 text-base border-b border-slate-100 pb-3">
            Portfolio Inventory
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Items</span>
              <span className="text-2xl font-display font-extrabold text-slate-800 block mt-1">
                {stats?.totalDocuments || 0}
              </span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resumes</span>
              <span className="text-2xl font-display font-extrabold text-purple-600 block mt-1">
                {breakdown.Resume}
              </span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Projects</span>
              <span className="text-2xl font-display font-extrabold text-emerald-600 block mt-1">
                {breakdown.Project}
              </span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Internships</span>
              <span className="text-2xl font-display font-extrabold text-blue-600 block mt-1">
                {breakdown.Internship}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <FaCode className="text-emerald-500 w-3.5 h-3.5" />
                <span>Coding Projects</span>
              </span>
              <span className="text-slate-700 font-bold">{breakdown.Project}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <FaBriefcase className="text-blue-500 w-3.5 h-3.5" />
                <span>Work Experience</span>
              </span>
              <span className="text-slate-700 font-bold">{breakdown.Internship}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <FaAward className="text-amber-500 w-3.5 h-3.5" />
                <span>Credentials & Awards</span>
              </span>
              <span className="text-slate-700 font-bold">{breakdown.Certificate + breakdown.Achievement}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Skill tag cloud with weights */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-slate-850 text-base border-b border-slate-100 pb-3 mb-5">
              Extracted Skills Footprint
            </h3>

            {stats?.topSkills && stats.topSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {stats.topSkills.map((skill, index) => {
                  // Determine sizes based on count
                  const weightClass = skill.count > 2 
                    ? 'text-xs px-3.5 py-2 bg-primary-100 border-primary-200 text-primary-800' 
                    : 'text-[11px] px-2.5 py-1.5 bg-slate-100 border-slate-200/60 text-slate-600';
                  
                  return (
                    <span 
                      key={index} 
                      className={`inline-flex items-center gap-1.5 border rounded-xl font-bold transition-all duration-200 hover:scale-105 select-none ${weightClass}`}
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] opacity-60">({skill.count})</span>
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                No skills cataloged yet. Run file analyses on documents to extract details.
              </div>
            )}
          </div>

          <div className="p-4 bg-primary-50/40 border border-primary-100 rounded-2xl mt-8">
            <h4 className="text-xs font-bold text-primary-700 flex items-center gap-1.5 mb-1">
              <span>Automatic Skill Mapping</span>
            </h4>
            <p className="text-[10px] font-semibold text-slate-500 leading-normal">
              When documents are ingested, MemoryVerse parses full textual blocks or extracts layouts using Gemini, index-linking certifications and experiences directly to your core skill database.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
