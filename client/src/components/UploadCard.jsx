import React, { useState, useRef } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';

const UploadCard = ({ onFileSelect, isUploading, uploadProgress }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`glass-card p-10 rounded-3xl border-2 border-dashed text-center flex flex-col items-center justify-center transition-all duration-300
        ${isDragActive ? 'border-primary-500 bg-primary-50/30 scale-[0.99]' : 'border-slate-300 hover:border-primary-400'}
        ${isUploading ? 'pointer-events-none opacity-60' : ''}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.docx,image/jpeg,image/png,image/webp"
      />

      <div className="p-4 bg-primary-50 text-primary-500 rounded-2xl mb-4 shadow-sm">
        <HiOutlineCloudUpload className="w-10 h-10" />
      </div>

      <h3 className="text-lg font-bold text-slate-800 font-display">Drag & Drop Document</h3>
      <p className="text-xs text-slate-500 mt-1 mb-6 max-w-xs leading-normal">
        Upload certificates, resumes, reports, or letters (PDF, DOCX, PNG, JPG up to 10MB)
      </p>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-primary-600/10 hover:shadow-lg"
      >
        Choose Local File
      </button>

      {/* Progress display */}
      {isUploading && (
        <div className="w-full max-w-sm mt-8 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Uploading your file...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
