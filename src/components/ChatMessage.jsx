
import React from 'react';
import { useChat } from '../context/ChatContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { identifyLanguage } from '../utils/codeFormatter';
import { HiPlay, HiClipboard, HiCode, HiUserCircle } from 'react-icons/hi';

const ChatMessage = ({ message }) => {
  const { setActivePreview } = useChat();
  

  const formatMessage = (content) => {
    if (!content) return '';

    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, idx) => {

      if (!part.startsWith('```') || !part.endsWith('```')) {
        return <p key={idx} className="whitespace-pre-wrap mb-2">{part}</p>;
      }

      const match = part.match(/```(\w+)?\s*([\s\S]*?)```/);
      if (!match) return <p key={idx}>{part}</p>;
      
      const language = match[1] || 'plaintext';
      const code = match[2].trim();
      

      const detectedLang = language === 'plaintext' ? identifyLanguage(code) : language;
      
      const canPreview = detectedLang === 'html' || detectedLang === 'css';
      
      return (
        <div key={idx} className="relative my-3 rounded-md overflow-hidden">
          <div className="bg-dark-800 px-4 py-2 text-white flex justify-between items-center">
            <span className="text-sm font-mono">{detectedLang}</span>
            <div className="flex space-x-2">
              {canPreview && (
                <button 
                  onClick={() => setActivePreview({ code, language: detectedLang })} 
                  className="text-gray-300 hover:text-white transition-colors p-1"
                  title="Preview"
                >
                  <HiPlay className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-gray-500 hover:text-gray-400 transition-colors p-1"
                title="Copy to clipboard"
              >
                <HiClipboard className="w-5 h-5" />
              </button>
            </div>
          </div>
          <SyntaxHighlighter 
            language={detectedLang} 
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    });
  };

  return (
    <div className={message.role === 'user' ? 'user-message' : 'ai-message'}>
      <div className="flex items-center space-x-2 mb-2">
        {message.role === 'user' ? (
          <HiUserCircle className="w-6 h-6 text-primary-600" />
        ) : (
          <HiCode className="w-6 h-6 text-dark-600" />
        )}
        <span className="font-medium">
          {message.role === 'user' ? 'Anda' : 'nyxai'}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div className="pl-8">
        {formatMessage(message.content)}
      </div>
    </div>
  );
};

export default ChatMessage;