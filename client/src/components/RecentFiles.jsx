import React from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaExternalLinkAlt } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';

const RecentFiles = ({ files }) => {
  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FaFilePdf className="w-4 h-4 text-red-500 flex-shrink-0" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FaFileWord className="w-4 h-4 text-blue-500 flex-shrink-0" />;
    if (mimeType.startsWith('image/')) return <FaFileImage className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
    return <HiOutlineDocumentText className="w-4 h-4 text-slate-400 flex-shrink-0" />;
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

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-xs font-semibold">
        No documents uploaded yet. Go to the Upload tab to start!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-slate-100 text-left text-xs md:text-sm">
        <thead>
          <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
            <th className="pb-3 pt-2">File Name</th>
            <th className="pb-3 pt-2">Category</th>
            <th className="pb-3 pt-2">Year</th>
            <th className="pb-3 pt-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
          {files.map((file) => {
            const url = `http://localhost:5000/${file.filePath}`;
            return (
              <tr key={file._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 flex items-center gap-2 max-w-[150px] sm:max-w-xs truncate">
                  {getFileIcon(file.mimeType)}
                  <span className="truncate" title={file.fileName}>{file.fileName}</span>
                </td>
                <td className="py-3.5">
                  <span className={getCategoryBadge(file.category)}>
                    {file.category}
                  </span>
                </td>
                <td className="py-3.5 text-slate-400 font-semibold">{file.academicYear}</td>
                <td className="py-3.5 text-right">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <span>View</span>
                    <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentFiles;
