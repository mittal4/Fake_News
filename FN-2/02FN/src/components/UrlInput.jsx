import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { languages } from '../language';

const UrlInput = ({ onSubmit, language, isDarkMode }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      new URL(url); // Validate URL format
      await onSubmit(url);
      setError('');
    } catch (err) {
      setError(err instanceof TypeError ? 'Please enter a valid URL' : 'Error processing URL. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={languages[language].urlPlaceholder}
          className={`w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
            isDarkMode
              ? 'bg-gray-800 text-white placeholder-gray-400'
              : 'bg-white text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        {languages[language].check}
      </button>
    </form>
  );
};

export default UrlInput;