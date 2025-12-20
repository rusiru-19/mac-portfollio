'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import MacOSDock from './taskbar';
import MacOSMenuBar from './navbar';

import GithubWindow from './github';
import EmailWindow from './mail';
import LinkedInWindow from './linkedin';
import CalendarWindow from './calendar';

export default function Background() {
  const [activeApp, setActiveApp] = useState(null);
  const [height, setHeight] = useState('500px');
  const [width, setWidth] = useState('800px');

  const [contextMenu, setContextMenu] = useState(null);

  const windows = {
    github: GithubWindow,
    email: EmailWindow,
    linkedIn: LinkedInWindow,
    calender: CalendarWindow,
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

  return (
    <div
      className="relative min-h-screen"
      onContextMenu={handleRightClick}
    >
      {/* Wallpaper */}
      <Image
        src="/images/bg.svg"
        alt="Wallpaper"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10">
        <MacOSMenuBar />

        {/* Active Window */}
        {ActiveWindow && (
          <ActiveWindow
            isOpen
            onClose={() => setActiveApp(null)}
            height={height}
            width={width}
            setHeight={setHeight}
            setWidth={setWidth}
          />
        )}

        {/* Dock */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <MacOSDock
            activeApp={activeApp}
            setActiveApp={setActiveApp}
          />
        </div>

        {/* 👉 Right-Click Context Menu */}
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
