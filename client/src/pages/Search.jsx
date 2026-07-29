import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineDocumentText, HiOutlineTrash, HiOutlineSparkles } from 'react-icons/hi';
import { FaFilePdf, FaFileWord, FaFileImage, FaExternalLinkAlt } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import documentService from '../services/documentService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchResults = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const res = await documentService.getDocuments(searchQuery);
      if (res.success) {
        setResults(res.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred retrieving search results.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document from your portfolio?')) return;
    try {
      setLoading(true);
      const res = await documentService.deleteDocument(id);
      if (res.success) {
        setResults(results.filter(doc => doc._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to delete document.');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FaFilePdf className="w-5 h-5 text-red-500 flex-shrink-0" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FaFileWord className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    if (mimeType.startsWith('image/')) return <FaFileImage className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
    return <HiOutlineDocumentText className="w-5 h-5 text-slate-400 flex-shrink-0" />;
  };

  const getCategoryBadge = (category) => {
    const base = 'px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase ';
    switch (category) {
      case 'Certificate': return base + 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Internship': return base + 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Project': return base + 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Resume': return base + 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Achievement': return base + 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Academic': return base + 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return base + 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
          Smart Retrieval
        </h2>
        <p className="text-xs font-semibold text-slate-400">
          Query your knowledge repository using natural search terms like "Python", "Project", or "Resume".
        </p>
      </div>

      {/* Search Input Control */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <SearchBar value={query} onChange={setQuery} />
        
        {query && (
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
            Found {results.length} match{results.length !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold transition-all">
          {error}
        </div>
      )}

      {loading && results.length === 0 ? (
        <Loader message="Scanning index database..." />
      ) : (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((doc) => (
                <div 
                  key={doc._id} 
                  className="glass-card p-6 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2.5 max-w-[70%]">
                        {getFileIcon(doc.mimeType)}
                        <h4 className="font-bold text-slate-800 text-sm truncate" title={doc.fileName}>
                          {doc.fileName}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={getCategoryBadge(doc.category)}>
                          {doc.category}
                        </span>
                        
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete File"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* AI Generated summary paragraph */}
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                      {doc.summary}
                    </p>

                    {/* Extracted skills taglist */}
                    <div className="flex flex-wrap gap-1.5">
                      {doc.skills && doc.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200/40 rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer with Direct view and Year indicators */}
                  <div className="flex justify-between items-center pt-5 mt-5 border-t border-slate-150 text-[11px] font-bold text-slate-400">
                    <span>Year: {doc.academicYear}</span>
                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>View File</span>
                      <FaExternalLinkAlt className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-card border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8">
              <div className="p-3.5 bg-slate-100 text-slate-400 rounded-2xl mb-4">
                <HiOutlineSearch className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base">No matches found</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1 leading-normal">
                {query 
                  ? `We couldn't find any documents containing "${query}". Try searching for categories like "Resume", or skills like "Python".` 
                  : 'Start searching above or navigate to the Upload tab to add student credentials.'
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
