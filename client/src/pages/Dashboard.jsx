import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineDocument, 
  HiOutlineAcademicCap, 
  HiOutlineBriefcase, 
  HiOutlineCode, 
  HiOutlineCloudUpload,
  HiOutlineBadgeCheck
} from 'react-icons/hi';
import DashboardCard from '../components/DashboardCard';
import RecentFiles from '../components/RecentFiles';
import Loader from '../components/Loader';
import documentService from '../services/documentService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await documentService.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Fetching dashboard metrics..." />;
  }

  if (error) {
    return (
      <div className="p-8 text-center glass-card border-red-200 bg-red-50/30 rounded-2xl">
        <p className="text-sm font-semibold text-red-600">{error}</p>
        <button 
          onClick={fetchStats}
          className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs"
        >
          Try Again
        </button>
      </div>
    );
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
      {/* Header section with profile name and CTAs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
            Welcome back, Alex!
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            Here is your AI-analyzed academic and career footprint.
          </p>
        </div>
        
        <Link
          to="/upload"
          className="px-4.5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs md:text-sm shadow-md shadow-primary-600/10 hover:shadow-lg transition-all flex items-center gap-1.5"
        >
          <HiOutlineCloudUpload className="w-4 h-4 md:w-5 h-5" />
          <span>Upload Document</span>
        </Link>
      </div>

      {/* Grid of aggregated cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <DashboardCard 
          title="All Files" 
          count={stats?.totalDocuments || 0} 
          icon={HiOutlineDocument}
          colorClass="bg-slate-900"
        />
        <DashboardCard 
          title="Certificates" 
          count={breakdown.Certificate} 
          icon={HiOutlineBadgeCheck}
          colorClass="bg-amber-500"
        />
        <DashboardCard 
          title="Projects" 
          count={breakdown.Project} 
          icon={HiOutlineCode}
          colorClass="bg-emerald-500"
        />
        <DashboardCard 
          title="Internships" 
          count={breakdown.Internship} 
          icon={HiOutlineBriefcase}
          colorClass="bg-blue-500"
        />
        <DashboardCard 
          title="Resumes" 
          count={breakdown.Resume} 
          icon={HiOutlineAcademicCap}
          colorClass="bg-purple-500"
        />
      </div>

      {/* Main Grid: Left for Recent Uploads table, Right for Extracted Skills Cloud */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Uploads Table Panel */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-800 text-base">Recent Activity</h3>
            <Link to="/timeline" className="text-xs font-bold text-primary-600 hover:text-primary-700">
              View Timeline &rarr;
            </Link>
          </div>
          <RecentFiles files={stats?.recentFiles || []} />
        </div>

        {/* Skills Tag Cloud Panel */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 flex flex-col">
          <div className="mb-5 border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-800 text-base">Extracted Skills</h3>
          </div>
          
          {stats?.topSkills && stats.topSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2 content-start flex-1">
              {stats.topSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-primary-50/50 border border-primary-100/50 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                  <span className="text-[10px] text-slate-400 font-semibold">{skill.count}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 py-8 text-center text-slate-400 text-xs font-semibold">
              <p>No skills extracted yet.</p>
              <p className="text-[10px] font-normal text-slate-400 mt-1 max-w-[180px]">
                Skills will be extracted automatically when you upload documents.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
