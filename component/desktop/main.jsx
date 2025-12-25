'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X, Music, MessageSquare, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import MacOSDock from './taskbar';
import MacOSMenuBar from './navbar';

import GithubWindow from './github';
import EmailWindow from './mail';
import LinkedInWindow from './linkedin';
import CalendarWindow from './calendar';
import SettingsWindow from './settings';
import TrashWindow from './trash';
export default function Desktop() {
  const [activeApp, setActiveApp] = useState(null);
  const [height, setHeight] = useState('500px');
  const [width, setWidth] = useState('800px');
  const [notification, setNotification] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const windows = {
    github: GithubWindow,
    email: EmailWindow,
    linkedIn: LinkedInWindow,
    calender: CalendarWindow,
    settings: SettingsWindow,
    trash: TrashWindow,
    
  };

  const ActiveWindow = activeApp ? windows[activeApp] : null;

  const handleRightClick = (e) => {
    e.preventDefault();

    const menuWidth = 180;
    const menuHeight = 160;

    const x = Math.min(e.clientX, window.innerWidth - menuWidth);
    const y = Math.min(e.clientY, window.innerHeight - menuHeight);
    
    setContextMenu({ x, y });
  };

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setVolumeOpen(false);
      setWifiOpen(false);
      setSearchOpen(false);
  }
  }
  return (
    <div
      className="relative min-h-screen"
      onContextMenu={handleRightClick}
      onMouseDown={handleMouseDown}

    >
      {/* notification */}
      {notification && (
            <div className="fixed top-20 right-6 w-full max-w-sm z-50">
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="group relative backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <div className="relative flex gap-4 p-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
            <Mail className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white truncate">
                {notification.title}
              </h4>
              <span className="text-xs text-white/50 ml-2 whitespace-nowrap">
              {notification.time}
              </span>
            </div>

            <p className="text-sm text-white/70 mt-1 leading-snug line-clamp-2">
              {notification.body}
            </p>
          </div>

          <button
            onClick={() => setNotification(null)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 hover:scale-110"
          >
            <X className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>
    </div>

      )}



      {/* Wallpaper */}
      <Image
        src="/images/bg.svg"
        alt="Wallpaper"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10">
        <MacOSMenuBar setVolumeOpen={setVolumeOpen} wifiOpen={wifiOpen} volumeOpen={volumeOpen} setWifiOpen={setWifiOpen} setSearchOpen={setSearchOpen} searchOpen={searchOpen} setActiveApp={setActiveApp} />

        {ActiveWindow && (
          <ActiveWindow
            isOpen
            onClose={() => setActiveApp(null)}
            height={height}
            width={width}
            setHeight={setHeight}
            setWidth={setWidth}
            {...(activeApp === 'email'? { notification, setNotification } : {})}
          />
        )}

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <MacOSDock
            activeApp={activeApp}
            setActiveApp={setActiveApp}
          />
        </div>

        {contextMenu && (
          <div
            className="fixed bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border z-[9999] text-sm overflow-hidden"
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
              width: 180,
            }}
          >
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => setActiveApp('github')}
            >
              Open GitHub
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => setActiveApp('email')}
            >
              Open Mail
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => setActiveApp('linkedIn')}
            >
              Open LinkedIn
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => setActiveApp('calender')}
            >
              Open Calendar
            </button>

            <div className="h-px bg-gray-200 my-1" />

            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => location.reload()}
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
