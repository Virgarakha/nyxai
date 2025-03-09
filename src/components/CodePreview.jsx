
import React from 'react';
import { HiX } from 'react-icons/hi';
import { useChat } from '../context/ChatContext';
import { formatHTMLPreview } from '../utils/codeFormatter';

const CodePreview = ({ code, language }) => {
  const { setActivePreview } = useChat();
  
  const closePreview = () => {
    setActivePreview(null);
  };
  
  return (
    <div className="bg-gray-100 border-t border-gray-300">
      <div className="flex justify-between items-center p-3 bg-dark-800 text-white">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Preview</span>
          <span className="text-xs px-2 py-1 bg-dark-700 rounded">{language}</span>
        </div>
        <button 
          onClick={closePreview}
          className="text-gray-300 hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>
      <div className="h-72 overflow-auto border-t border-dark-700">
        {language === 'html' ? (
          <div className="bg-white h-full w-full">
            <iframe
              title="HTML Preview"
              srcDoc={formatHTMLPreview(code)}
              className="w-full h-full border-none"
              sandbox="allow-scripts"
            />
          </div>
        ) : language === 'css' ? (
          <div className="bg-white h-full w-full p-4">
            <style>{code}</style>
            <div className="preview-container">
              <p>Preview untuk CSS memerlukan elemen HTML.</p>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Preview tidak tersedia untuk bahasa {language}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;