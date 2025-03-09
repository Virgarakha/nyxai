
import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import CodePreview from './CodePreview';

const Chat = () => {
  const { messages, loading, error, activePreview } = useChat();
  const messagesEndRef = useRef(null);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <div className="max-w-md p-6">
              <h2 className="text-xl font-bold mb-3">Selamat Datang di CodeAI</h2>
              <p className="mb-4">
                Asisten coding berbasis AI yang membantu Anda menulis, memperbaiki, dan menjelaskan kode.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-dark-100 p-3 rounded-lg">
                  <p className="font-medium text-dark-800 mb-1">Contoh:</p>
                  <p>{"Bagaimana cara membuat toggle navigation dengan React?"}</p>
                </div>
                <div className="bg-dark-100 p-3 rounded-lg">
                  <p className="font-medium text-dark-800 mb-1">Contoh:</p>
                  <p>{"Benerin kode ini: function add(a, b) { return a * b }"}</p>
                </div>
                <div className="bg-dark-100 p-3 rounded-lg">
                  <p className="font-medium text-dark-800 mb-1">Contoh:</p>
                  <p>{"Jelaskan konsep Promises di JavaScript"}</p>
                </div>
                <div className="bg-dark-100 p-3 rounded-lg">
                  <p className="font-medium text-dark-800 mb-1">Contoh:</p>
                  <p>{"Buatkan landing page sederhana dengan HTML dan CSS"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        
        {loading && (
          <div className="user-message">
            <div className="flex space-x-2 items-center">
              <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-gray-500 ml-2">AI sedang menulis...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {activePreview && (
        <CodePreview 
          code={activePreview.code} 
          language={activePreview.language} 
        />
      )}
      
      <div className="border-t border-gray-200 p-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;