import React, { useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineCloudUpload, HiOutlineSparkles } from 'react-icons/hi';
import { FaFilePdf, FaFileWord, FaFileImage } from 'react-icons/fa';
import UploadCard from '../components/UploadCard';
import Loader from '../components/Loader';
import documentService from '../services/documentService';

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [analyzedDoc, setAnalyzedDoc] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    try {
      setIsUploading(true);
      setError(null);
      setAnalyzedDoc(null);
      setUploadProgress(0);

      const res = await documentService.uploadDocument(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
        if (percentCompleted === 100) {
          // File uploaded, now backend is calling Gemini API
          setProcessing(true);
        }
      });

      if (res.success) {
        setAnalyzedDoc(res.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to upload and analyze the document.');
    } finally {
      setIsUploading(false);
      setProcessing(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.includes('pdf')) return <FaFilePdf className="w-8 h-8 text-red-500" />;
    if (mimeType?.includes('word') || mimeType?.includes('document')) return <FaFileWord className="w-8 h-8 text-blue-500" />;
    if (mimeType?.startsWith('image/')) return <FaFileImage className="w-8 h-8 text-emerald-500" />;
    return <HiOutlineCloudUpload className="w-8 h-8 text-slate-400" />;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
          Ingest Knowledge
        </h2>
        <p className="text-xs font-semibold text-slate-400">
          Upload certificates, internship letters, resumes, or project reports to classify and index.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold transition-all">
          {error}
        </div>
      )}

      {/* Main interaction workspace */}
      {!processing && (
        <UploadCard
          onFileSelect={handleFileSelect}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      )}

      {/* Loader during API analysis */}
      {processing && (
        <div className="glass-card p-10 rounded-3xl border border-slate-200 flex flex-col items-center justify-center">
          <Loader message="AI is reading file content & extracting categories/skills using Gemini..." />
        </div>
      )}

      {/* Successful analysis preview report */}
      {analyzedDoc && (
        <div className="glass-card p-8 rounded-3xl border border-primary-100 shadow-lg relative overflow-hidden fade-in space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-400/5 rounded-full blur-2xl pointer-events-none"></div>

          {/* Success Banner */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="p-1 text-accent-500">
              <HiOutlineCheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-accent-600 uppercase tracking-widest">
                Ingested Successfully
              </span>
              <h3 className="text-lg font-bold text-slate-850 font-display leading-snug">
                {analyzedDoc.fileName}
              </h3>
            </div>
          </div>

          {/* Categorization & Metadata Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Document Mime
              </span>
              <div className="flex items-center gap-2 mt-2">
                {getFileIcon(analyzedDoc.mimeType)}
                <span className="text-xs font-bold text-slate-650 truncate max-w-[120px]" title={analyzedDoc.mimeType}>
                  {analyzedDoc.mimeType.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                AI Category
              </span>
              <div className="mt-2">
                <span className="inline-flex px-3 py-1 bg-primary-50 border border-primary-100 text-primary-700 rounded-xl text-xs font-bold tracking-wide uppercase">
                  {analyzedDoc.category}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Inferred Year
              </span>
              <div className="mt-2 text-slate-700 font-display font-extrabold text-lg">
                {analyzedDoc.academicYear}
              </div>
            </div>
          </div>

          {/* AI generated summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-primary-500" />
              <span>AI Summary</span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
              {analyzedDoc.summary}
            </p>
          </div>

          {/* Extracted Skills tag list */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Extracted Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analyzedDoc.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-slate-150 border border-slate-200/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <a
              href={`http://localhost:5000/${analyzedDoc.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Verify Original File
            </a>
            <button
              onClick={() => setAnalyzedDoc(null)}
              className="px-4.5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
