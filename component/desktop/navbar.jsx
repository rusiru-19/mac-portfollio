'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Volume2 } from 'lucide-react';
import Image from 'next/image';
const MenuBarItem = ({ children, hasDropdown = false, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (hasDropdown) setIsOpen(!isOpen);
          if (onClick) onClick();
        }}
        onMouseEnter={() => hasDropdown && setIsOpen(true)}
        onMouseLeave={() => hasDropdown && setIsOpen(false)}
        className="px-3 py-1 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors duration-150"
      >
        {children}
      </button>
      
      {hasDropdown && isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-1 w-56 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 py-1 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <MenuItem>About This Mac</MenuItem>
          <MenuDivider />
          <MenuItem>System Settings...</MenuItem>
          <MenuItem>App Store...</MenuItem>
          <MenuDivider />
          <MenuItem>Recent Items</MenuItem>
          <MenuDivider />
          <MenuItem>Sleep</MenuItem>
          <MenuItem>Restart...</MenuItem>
          <MenuItem>Shut Down...</MenuItem>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ children, shortcut }) => (
  <button className="w-full px-4 py-1.5 text-left text-sm text-white hover:bg-blue-500 transition-colors duration-100 flex items-center justify-between">
    <span>{children}</span>
    {shortcut && <span className="text-xs text-gray-400">{shortcut}</span>}
  </button>
);

const MenuDivider = () => (
  <div className="h-px bg-white/10 my-1 mx-2" />
);

export default function MacOSMenuBar() {
  const [time, setTime] = useState(new Date());
  const [searchOpen, setSearchOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [volumeopen, setVolumeOpen] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    setBatteryLevel(prev => Math.max(prev - 1, 0));
  }, 60000); 

  return () => clearInterval(interval);
}, []);


  const formatTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${day} ${month} ${dateNum}  ${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div className="w-full bg-black/30 backdrop-blur-2xl border-b border-white/10 px-4 py-1 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-1">
          <MenuBarItem hasDropdown={true}>
            <span className="text-xl">
              <Image src="/images/apple.svg" alt="Apple Logo" width={12} height={12} draggable={false} className="inline-block pointer-events-none select-none" />
            </span>
          </MenuBarItem>
          
          <MenuBarItem hasDropdown={true}>Finder</MenuBarItem>
          <MenuBarItem hasDropdown={true}>File</MenuBarItem>
          <MenuBarItem hasDropdown={true}>Edit</MenuBarItem>
          <MenuBarItem hasDropdown={true}>View</MenuBarItem>
          <MenuBarItem hasDropdown={true}>Go</MenuBarItem>
          <MenuBarItem hasDropdown={true}>Window</MenuBarItem>
          <MenuBarItem hasDropdown={true}>Help</MenuBarItem>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 hover:bg-white/10 rounded transition-colors duration-150"
          >
            <Search className="w-4 h-4 text-white" strokeWidth={2} />
          </button>

          <button onClick={()=>{setVolumeOpen(!volumeopen)}} className="p-1.5 hover:bg-white/10 rounded transition-colors duration-150">
            <Volume2 className="w-4 h-4 text-white" strokeWidth={2} />
          </button>
            {volumeopen && (
              <div
                onClick={() => setVolumeOpen(false)}
                className="fixed  mt-8  flex justify-center pt-24"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-80 h-full  p-6 rounded-l-3xl"
                >
                <div className='bg-white/20 backdrop-blur-2xl rounded-lg p-4'> 
                  <div className="">
                    <label className="text-xs text-white/70">Volume</label>
                    <input type="range" className="w-full" />
                  </div>
                </div>
                </div>
              </div>
            )}
          <button className="p-1.5 hover:bg-white/10 rounded transition-colors duration-150">
            <Wifi className="w-4 h-4 text-white" strokeWidth={2} />
          </button>

          <button className="flex items-center space-x-1 p-1.5 hover:bg-white/10 rounded transition-colors duration-150">
            <Battery className="w-4 h-4 text-white" strokeWidth={2} />
            <span className="text-xs text-white font-medium">{batteryLevel}%</span>
          </button>

          <div className="text-xs text-white font-medium px-2">
            {formatTime(time)}
          </div>

          <button className="p-1.5 hover:bg-white/10 rounded transition-colors duration-150">
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0  flex justify-center pt-24"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-lg  rounded-3xl p-4"
          >
            <div className='inset-0 z-50 rounded-lg bg-white/20 backdrop-blur-sm flex justify-center p-4'> 
            <input
              autoFocus
              placeholder="Search"
              className="w-full  bg-transparent text-white text-lg outline-none placeholder-white/60"
            />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

