import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';
import { languages } from '../language';

function TextInput({ onSubmit, language, isDarkMode }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={languages[language].textPlaceholder}
        className={`w-full h-48 p-4 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
          isDarkMode
            ? 'bg-gray-800 text-white placeholder-gray-400'
            : 'bg-white text-gray-900 placeholder-gray-500'
        }`}
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        <Send className="w-5 h-5" />
        {languages[language].check}
      </button>
    </form>
  );
}

TextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export default TextInput;