import React from 'react';
import { Globe2 } from 'lucide-react';
import { languages } from '../language';

const LanguageSelector = ({ currentLang, setCurrentLang, isDarkMode }) => {
  return (
    <div className="relative group z-50">
      <button
        className={`p-2 rounded-full hover:bg-gray-700/20 transition-colors flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <Globe2 className="w-6 h-6" />
        <span className="text-sm font-medium uppercase">{currentLang}</span>
      </button>
      
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
        {Object.keys(languages).map((lang) => (
          <button
            key={lang}
            onClick={() => setCurrentLang(lang)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
              currentLang === lang ? 'text-blue-500 font-medium' : 'text-gray-700'
            }`}
          >
            {languages[lang].nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;