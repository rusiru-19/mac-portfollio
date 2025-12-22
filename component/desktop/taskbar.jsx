'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
/* ---------------- Dock Icon ---------------- */

const DockIcon = ({ icon, label, mouseX, isTrash }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (mouseX === null) {
      el.style.transform = 'translateY(0) scale(1)';
      return;
    }

    const rect = el.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;

    const distance = Math.abs(mouseX - iconCenterX);
    const maxDistance = 150;

    const scale = Math.max(1, 1.8 - (distance / maxDistance) * 0.8);
    const lift = (scale - 1) * 20;

    el.style.transform = `translateY(-${lift}px) scale(${scale})`;
  }, [mouseX]);

  return (
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -top-12 bg-gray-800/90 backdrop-blur text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10">
          {label}
        </div>
      )}

      {/* Icon */}
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{
          transformOrigin: 'bottom center',
          transition:
            'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          background: isTrash
            ? 'rgba(55, 65, 81, 0.5)'
            : 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)',
        }}
      >
        <Image
          src={icon}
          alt={label}
          width={48}
          height={48}
          draggable={false}
          className="pointer-events-none select-none"
        />
      </div>

      {/* Active dot */}
      <div className="w-1 h-1 rounded-full bg-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};



/* ---------------- Dock ---------------- */

export default function MacOSDock({activeApp, setActiveApp}) {
  const [mouseX, setMouseX] = useState(null);
  const handleClick = (id) => {
    setActiveApp(null);
    if(activeApp === id){
      setActiveApp(null);
      return;
    }
    if (id === 'github') {
      setActiveApp('github');
    }else if (id === 'email') {
      setActiveApp('email');
    }else if (id === 'linkedIn') {
      setActiveApp('linkedIn');
    }else if (id === 'settings') {
      setActiveApp('settings');
    }else if (id === 'calender') {
      setActiveApp('calender');
    }
  

  };
  const apps = [
    { icon: '/images/git.svg', label: 'github' },
    { icon: '/images/email.svg', label: 'email' },
    { icon: '/images/linkedin.svg', label: 'linkedIn' },
    { icon: '/images/settings.svg', label: 'settings' },
    { icon: '/images/calender.svg', label: 'calender' },
  ];

  return (
    <>
  
    <div className="min-h-screen flex items-end justify-center pb-8">
      <div
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-3 border border-white/30 shadow-2xl"
        style={{
          boxShadow:
            '0 25px 50px -12px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3)',
        }}
      >
        <div className="flex items-end gap-6 px-2">
          {apps.map((app, i) => (
            <button onClick={() => handleClick(app.label)}>
            <DockIcon
              key={i}
              icon={app.icon}
              label={app.label}
              mouseX={mouseX}
            />
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-12 bg-white/30 mx-2 self-end" />

          {/* Trash */}
          <DockIcon
            icon="/images/bin.svg"
            label="Trash"
            mouseX={mouseX}
            isTrash
          />
        </div>
      </div>
    </div>
    </>
  );
}
