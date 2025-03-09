
import React from 'react';
import { HiCode, HiMenu } from 'react-icons/hi';
import { useChat } from '../context/ChatContext';

const Navbar = ({ toggleSidebar }) => {
  const { clearChat } = useChat();
  
  return (
    <div className="bg-white text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-1 rounded text-black"
        >
          <HiMenu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <HiCode className="w-6 h-6 text-primary-400" />
          <h1 className="text-xl font-bold text-black">@nyxai</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={clearChat}
          className="btn-secondary text-sm text-black border border-black p-2 rounded-lg"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Navbar;