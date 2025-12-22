'use client';

import { X, Wifi, User, Palette, Bell, Shield, Info } from 'lucide-react';

export default function SettingsWindow({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Window */}
      <div className="relative w-[900px] h-[560px] rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 bg-red-500 rounded-full"
            />
            <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full" />
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full" />
          </div>
          <span className="text-sm text-white/70 font-medium">
            System Settings
          </span>
          <div />
        </div>

        {/* Body */}
        <div className="flex h-full">

          {/* Sidebar */}
          <aside className="w-64 border-r border-white/10 p-4 space-y-1 bg-white/5">
            <SidebarItem icon={User} label="Profile" />
            <SidebarItem icon={Wifi} label="Network" />
            <SidebarItem icon={Bell} label="Notifications" />
            <SidebarItem icon={Palette} label="Appearance" />
            <SidebarItem icon={Shield} label="Privacy & Security" />
            <SidebarItem icon={Info} label="About" active />
          </aside>

          {/* Content */}
          <main className="flex-1 p-8 text-white overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">About This Mac</h2>

            <div className="space-y-6">

              <InfoCard title="Developer">
                <p className="text-white/80">Rusiru.dev</p>
                <p className="text-sm text-white/50">
                  Full-Stack Web Developer
                </p>
              </InfoCard>

              <InfoCard title="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'Tailwind', 'Node.js', 'MySQL'].map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Availability">
                <p className="text-green-400 font-medium">
                  Available for freelance & internships
                </p>
              </InfoCard>

              <InfoCard title="Actions">
                <div className="flex gap-3">
                  <ActionButton
                    label="View Resume"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  />
                  <ActionButton
                    label="Visit Portfolio"
                    onClick={() => window.open('https://rusiru.dev', '_blank')}
                  />
                </div>
              </InfoCard>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition
      ${active
        ? 'bg-white/20 text-white'
        : 'text-white/70 hover:bg-white/10'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl bg-white/10 border border-white/20 p-5">
    <h3 className="text-sm font-semibold text-white/80 mb-2">
      {title}
    </h3>
    {children}
  </div>
);

const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 transition text-sm font-medium"
  >
    {label}
  </button>
);
