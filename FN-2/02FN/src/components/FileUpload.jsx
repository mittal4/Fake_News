import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { languages } from '../language';

const FileUpload = ({ onSubmit, language, isDarkMode }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (file.type !== 'text/plain') {
      setError('Please upload a text file (.txt)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        try {
          await onSubmit(text);
          setError('');
        } catch (err) {
          setError('Error processing file. Please try again.');
        }
      }
    };
    reader.onerror = () => setError('Error reading file. Please try again.');
    reader.readAsText(file);
  };

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500'
            : isDarkMode
            ? 'border-gray-600'
            : 'border-gray-300'
        }`}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto w-12 h-12 mb-4 text-gray-400" />
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {languages[language].dropFile}
        </p>
        <p className="text-sm text-gray-500">
          {languages[language].or}
        </p>
        <button
          type="button"
          className="mt-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-600"
        >
          {languages[language].browse}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;