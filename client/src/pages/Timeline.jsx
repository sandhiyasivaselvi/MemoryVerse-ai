import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClock, HiOutlinePlus } from 'react-icons/hi';
import TimelineCard from '../components/TimelineCard';
import Loader from '../components/Loader';
import documentService from '../services/documentService';

const Timeline = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await documentService.getDocuments();
      if (res.success) {
        // Sort documents chronologically by academic year (descending) then by upload date (descending)
        const sortedDocs = [...res.data].sort((a, b) => {
          if (b.academicYear !== a.academicYear) {
            return b.academicYear - a.academicYear;
          }
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        });
        setDocuments(sortedDocs);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load timeline records.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this event from your timeline?')) return;
    try {
      setLoading(true);
      const res = await documentService.deleteDocument(id);
      if (res.success) {
        setDocuments(documents.filter(doc => doc._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to delete record.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && documents.length === 0) {
    return <Loader message="Compiling digital journey timeline..." />;
  }

  if (error) {
    return (
      <div className="p-8 text-center glass-card border-red-200 bg-red-50/30 rounded-2xl">
        <p className="text-sm font-semibold text-red-600">{error}</p>
        <button 
          onClick={fetchDocuments}
          className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
            Digital Journey Timeline
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            A chronological mapping of your milestones, certifications, and achievements.
          </p>
        </div>
        
        <Link
          to="/upload"
          className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs md:text-sm shadow-md transition-all flex items-center gap-1.5"
        >
          <HiOutlinePlus className="w-4 h-4 md:w-5 h-5" />
          <span>Add Milestone</span>
        </Link>
      </div>

      {documents.length > 0 ? (
        <div className="relative border-l border-slate-200 ml-4 md:ml-40 mt-12 pl-4">
          <div className="space-y-4">
            {documents.map((doc) => (
              <TimelineCard 
                key={doc._id} 
                doc={doc} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 glass-card border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8">
          <div className="p-3.5 bg-slate-100 text-slate-400 rounded-2xl mb-4">
            <HiOutlineClock className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-slate-800 text-base">No timeline events</h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1 leading-normal">
            Your timeline is empty. Once you upload certificates, projects, or internship records, they will map here automatically in chronological order!
          </p>
          <Link
            to="/upload"
            className="mt-5 px-4.5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-xs shadow-sm hover:shadow"
          >
            Upload Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Timeline;
