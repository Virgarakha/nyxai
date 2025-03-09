import React, { useState } from 'react';
import { HiCode, HiTerminal, HiLightningBolt, HiCog, HiQuestionMarkCircle } from 'react-icons/hi';

const Sidebar = ({ isOpen }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");

  const handlePremiumFeature = (text) => {
    setPopupText(`${text} hanya tersedia untuk pengguna premium.`);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  return (
    <div className={`bg-white border-r border-gray-300 text-black w-64 fixed h-full z-20 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <HiCode className="w-8 h-8 text-primary-400" />
          <h1 className="text-xl font-bold">nyxai</h1>
        </div>
        
        <div className="space-y-4">
          <div className="p-2">
            <h2 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-3">Bahasa Pemrograman</h2>
            <ul className="space-y-1">
              <SidebarItem icon={<HiTerminal />} text="JavaScript" onClick={() => handlePremiumFeature("JavaScript Support")} />
              <SidebarItem icon={<HiTerminal />} text="Python" onClick={() => handlePremiumFeature("Python Support")} />
              <SidebarItem icon={<HiTerminal />} text="HTML/CSS" />
              <SidebarItem icon={<HiTerminal />} text="React" />
              <SidebarItem icon={<HiTerminal />} text="Node.js" />
            </ul>
          </div>
          
          <div className="p-2">
            <h2 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-3">Bantuan</h2>
            <ul className="space-y-1">
              <SidebarItem icon={<HiLightningBolt />} text="Debug Code" onClick={() => handlePremiumFeature("Debug Code")} />
              <SidebarItem icon={<HiLightningBolt />} text="Refactor Code" />
              <SidebarItem icon={<HiLightningBolt />} text="Optimize Code" onClick={() => handlePremiumFeature("Optimize Code")} />
              <SidebarItem icon={<HiLightningBolt />} text="Jelaskan Code" />
            </ul>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full border-t border-gray-300 p-4">
        <ul className="space-y-1">
          <SidebarItem icon={<HiCog />} text="Pengaturan" />
          <SidebarItem icon={<HiQuestionMarkCircle />} text="Bantuan" />
        </ul>
      </div>
      
      {popupVisible && (
        <div className="fixed bottom-5 right-5 ml-5 bg-black text-white px-4 py-2 rounded-md shadow-lg">
          {popupText}
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => {
  return (
    <li>
      <button onClick={onClick} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left">
        <span className="text-gray-400">{icon}</span>
        <span>{text}</span>
      </button>
    </li>
  );
};

export default Sidebar;
