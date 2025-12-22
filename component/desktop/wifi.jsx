'use client';

import { Wifi, Check, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { useState } from 'react';
export default function WifiWindow( {setActiveApp}) {
  const items = [
    {
      name: 'Portfolio',
      sub: 'rusiru.dev',
      icon: Globe,
      active: true,
    },
    {
      name: 'GitHub',
      sub: '@rusiru-19',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      sub: 'rusiru-thamara',
      icon: Linkedin,
    },
    {
      name: 'Email',
      sub: 'hello@rusiru.dev',
      icon: Mail,
    },
  ];

  return (
    <div className="absolute right-2 top-10 w-72 z-50">
      <div className="bg-black/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden text-white">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-semibold">Connectivity</span>
          </div>
          <span className="text-xs font-medium text-green-400">Online</span>
        </div>

        {/* Active status */}
        <div className="px-4 py-3 bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Currently Active</span>
            <Check className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xs text-white/60 mt-1">
            Portfolio is live and reachable
          </p>
        </div>

        {/* Items */}
        <div className="py-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-white/10 transition ${
                  item.active ? 'bg-white/10' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 text-left">
                  <div className="text-sm">{item.name}</div>
                  <div className="text-xs text-white/50">{item.sub}</div>
                </div>

                {item.active && (
                  <Check className="w-4 h-4 text-blue-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 py-3 space-y-2">
 
          <button className="w-full text-left text-sm hover:text-blue-400 transition" onClick={()=>{setActiveApp('email')}}>
            Contact Me
          </button>
          <button className="w-full text-left text-sm hover:text-blue-400 transition">
            Availability: Open to Work
          </button>
        </div>
      </div>
    </div>
  );
}
