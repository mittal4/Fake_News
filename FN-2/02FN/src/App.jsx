import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Upload, FileText, Link, Moon, Sun } from 'lucide-react';
import PropTypes from 'prop-types';
import { languages } from './language';
import TextInput from './components/TextInput';
import FileUpload from './components/FileUpload';
import UrlInput from './components/UrlInput';
import LanguageSelector from './components/LanguageSelector';

function TabButton({ icon, label, active, onClick, isDarkMode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active
          ? isDarkMode
            ? 'bg-white/20 text-white'
            : 'bg-gray-900 text-white'
          : isDarkMode
          ? 'hover:bg-white/10 text-gray-300'
          : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

TabButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('text');
  const [result, setResult] = useState('');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (text) => {
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute right-0 top-0 flex gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <LanguageSelector
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isDarkMode={isDarkMode}
            />
          </div>

          <h1 className="text-4xl font-bold text-center mb-8 pt-12">
            {languages[currentLang].title}
          </h1>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="flex justify-center gap-4 mb-8">
              <TabButton
                icon={<FileText />}
                label={languages[currentLang].textTab}
                active={activeTab === 'text'}
                onClick={() => setActiveTab('text')}
                isDarkMode={isDarkMode}
              />
              <TabButton
                icon={<Upload />}
                label={languages[currentLang].fileTab}
                active={activeTab === 'file'}
                onClick={() => setActiveTab('file')}
                isDarkMode={isDarkMode}
              />
              <TabButton
                icon={<Link />}
                label={languages[currentLang].urlTab}
                active={activeTab === 'url'}
                onClick={() => setActiveTab('url')}
                isDarkMode={isDarkMode}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'text' && (
                  <TextInput
                    onSubmit={handleSubmit}
                    language={currentLang}
                    isDarkMode={isDarkMode}
                  />
                )}
                {activeTab === 'file' && (
                  <FileUpload
                    onSubmit={handleSubmit}
                    language={currentLang}
                    isDarkMode={isDarkMode}
                  />
                )}
                {activeTab === 'url' && (
                  <UrlInput
                    onSubmit={handleSubmit}
                    language={currentLang}
                    isDarkMode={isDarkMode}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-4 rounded-lg text-center text-lg font-semibold ${
                  result === 'REAL'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {languages[currentLang].result}: {result}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;