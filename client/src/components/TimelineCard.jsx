import React from 'react';
import { HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';
import { FaFilePdf, FaFileWord, FaFileImage, FaExternalLinkAlt } from 'react-icons/fa';

const TimelineCard = ({ doc, onDelete }) => {
  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FaFilePdf className="w-5 h-5 text-red-500" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FaFileWord className="w-5 h-5 text-blue-500" />;
    if (mimeType.startsWith('image/')) return <FaFileImage className="w-5 h-5 text-emerald-500" />;
    return <HiOutlineCalendar className="w-5 h-5 text-slate-500" />;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Certificate': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Internship': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Project': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Resume': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Achievement': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Academic': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const fileUrl = `http://localhost:5000/${doc.filePath}`;

  return (
    <div className="relative pl-8 md:pl-0 flex flex-col md:flex-row md:items-start group">
      {/* Year badge column (Left on Desktop, Top on Mobile) */}
      <div className="md:w-1/4 md:pr-8 md:text-right flex flex-col md:items-end mb-3 md:mb-0">
        <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-slate-900 text-white font-bold text-xs tracking-wider font-display">
          {doc.academicYear}
        </span>
        <span className="text-[11px] text-slate-400 mt-1.5 font-semibold">
          {new Date(doc.uploadDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Center line dot marker */}
      <div className="absolute left-0 md:left-1/4 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-slate-50 bg-primary-600 z-10 group-hover:scale-125 transition-transform duration-200"></div>

      {/* Card Detail Column */}
      <div className="md:w-3/4 md:pl-8 pb-10 w-full">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 group-hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md relative">
          
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5 max-w-[75%]">
              {getFileIcon(doc.mimeType)}
              <h4 className="font-bold text-slate-800 text-sm md:text-base truncate" title={doc.fileName}>
                {doc.fileName}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wide ${getCategoryColor(doc.category)}`}>
                {doc.category}
              </span>

              {onDelete && (
                <button
                  onClick={() => onDelete(doc._id)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Document"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4.5 pr-14">
            {doc.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 items-center">
            {doc.skills && doc.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-100 border border-slate-200/40 rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Floating file link */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>View</span>
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
