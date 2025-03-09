
import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendMessage } from '../services/api';
import { identifyLanguage } from '../utils/codeFormatter';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {

    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePreview, setActivePreview] = useState(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const addMessage = async (content) => {

    const userMessage = {
      id: Date.now(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    
    try {

      const context = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      

      const response = await sendMessage(content, context);
      

      const aiMessage = {
        id: Date.now() + 1,
        content: response.content,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        codeBlocks: extractCodeBlocks(response.content)
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError('Gagal mengirim pesan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractCodeBlocks = (content) => {
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const codeBlocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'plaintext';
      const code = match[2].trim();
      const detectedLang = language === 'plaintext' ? identifyLanguage(code) : language;
      
      codeBlocks.push({
        id: Date.now() + Math.random(),
        language: detectedLang,
        code: code
      });
    }
    
    return codeBlocks;
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    setActivePreview(null);
  };

  const value = {
    messages,
    loading,
    error,
    addMessage,
    clearChat,
    activePreview,
    setActivePreview
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};