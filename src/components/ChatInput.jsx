
import React, { useState } from 'react';
import { HiPaperAirplane, HiCode } from 'react-icons/hi';
import { useChat } from '../context/ChatContext';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { addMessage, loading } = useChat();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      addMessage(input.trim());
      setInput('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hello World..."
          className="flex-1 py-3 px-4 bg-transparent outline-none resize-none min-h-[52px] max-h-32"
          rows={Math.min(5, Math.max(1, input.split('\n').length))}
          disabled={loading}
        />
        <div className="flex items-center pr-3">
          <button 
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-700"
            title="Insert code snippet"
          >
            <HiCode className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`ml-2 p-2 rounded-full ${
              !input.trim() || loading
                ? 'bg-gray-200 text-gray-400'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
            title="Send message"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;