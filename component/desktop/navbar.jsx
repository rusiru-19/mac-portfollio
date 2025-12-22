'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Volume2 } from 'lucide-react';
import Image from 'next/image';
import WifiWindow from './wifi';

/* ---------- Helpers ---------- */

const MenuDivider = () => (
  <div className="h-px bg-white/10 my-1 mx-2" />
);

const MenuItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-1.5 text-left text-sm text-white hover:bg-white/10 transition-colors"
  >
    {children}
  </button>
);

const MenuBarItem = ({ children, hasDropdown = false, dropdown }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <button className="px-3 py-1 text-sm font-medium text-white hover:bg-white/10 rounded">
        {children}
      </button>

      {hasDropdown && open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-1 z-50">
          {dropdown}
        </div>
      )}
    </div>
  );
};

/* ---------- Main Component ---------- */

export default function MacOSMenuBar({ activeApp, setActiveApp }) {
  const [time, setTime] = useState(new Date());
  const [searchOpen, setSearchOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);

  const appNames = {
    github: 'GitHub',
    email: 'Mail',
    linkedIn: 'LinkedIn',
    calender: 'Calendar',
  };

  /* ---------- Effects ---------- */

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(prev - 1, 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- Time Format ---------- */

  const formatTime = (date) => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}  ${h % 12 || 12}:${m} ${ampm}`;
  };

  /* ---------- Render ---------- */

  return (
    <div className="w-full bg-black/30 backdrop-blur-2xl border-b border-white/10 px-4 py-1 flex items-center justify-between shadow-lg z-50">

      {/* LEFT */}
      <div className="flex items-center gap-1">
        <MenuBarItem
          hasDropdown
          dropdown={
            <>
              <MenuItem onClick={() => setActiveApp(null)}>About Me</MenuItem>
              <MenuItem onClick={() => setActiveApp('email')}>Contact</MenuItem>
              <MenuItem onClick={() => setActiveApp('github')}>GitHub</MenuItem>
              <MenuItem onClick={() => setActiveApp('linkedIn')}>LinkedIn</MenuItem>
              <MenuDivider />
     
              <MenuItem onClick={() => location.reload()}>Restart</MenuItem>
            </>
          }
        >
          <Image
            src="/images/apple.svg"
            alt="Apple"
            width={12}
            height={12}
            draggable={false}
          />
        </MenuBarItem>

        <span className="px-2 text-sm font-semibold text-white/90">
          {activeApp ? appNames[activeApp] : 'rusiru.dev'}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-1.5 hover:bg-white/10 rounded"
        >
          <Search className="w-4 h-4 text-white" />
        </button>

        {/* Volume */}
        <button
          onClick={() => setVolumeOpen(!volumeOpen)}
          className="p-1.5 hover:bg-white/10 rounded"
        >
          <Volume2 className="w-4 h-4 text-white" />
        </button>

        {volumeOpen && (
          <div className="absolute right-32 top-8 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
            <label className="text-xs text-white">Volume</label>
            <input type="range" className="w-full mt-2" />
          </div>
        )}

        {/* Wi-Fi */}
        <button
          onClick={() => setWifiOpen(!wifiOpen)}
          className="p-1.5 hover:bg-white/10 rounded"
        >
          <Wifi className="w-4 h-4 text-white" />
        </button>

        {wifiOpen && (
          <WifiWindow setActiveApp={setActiveApp} />
        )}

        {/* Battery */}
        <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded">
          <Battery className="w-4 h-4 text-white" />
          <span className="text-xs text-white">{batteryLevel}%</span>
        </div>

        {/* Time */}
        <span className="text-xs text-white font-medium px-2">
          {formatTime(time)}
        </span>
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
            <div className='inset-0 z-50 rounded-3xl bg-white/20 backdrop-blur-sm flex justify-center p-4'> 
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
