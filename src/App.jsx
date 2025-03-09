
import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar isOpen={sidebarOpen} />
        
        <div 
          className={`fixed inset-0 bg-opacity-50 z-10 lg:hidden transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar}
        />
        
        <div className="flex flex-col flex-1 w-full lg:pl-64">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-hidden">
            <Chat />
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;