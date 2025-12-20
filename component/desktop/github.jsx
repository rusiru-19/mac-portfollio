'use client';

import { on } from 'events';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function GithubWindow({ isOpen, onClose, height, width , setWidth , setHeight }) {

  const profile = {
    avatar: '/images/dp.jfif',
    name: 'Rusiru Thamara',
    username: 'rusiru-19',
    bio: 'rusiru-19 · he/him',
    followers: 4,
    following: 3,
    repos: 45,
  };
  const setIsMaximized = () =>{
    if (width === '800px'){
      setWidth('1200px');
      setHeight('800px');
    }else{
      setWidth('800px');
      setHeight('500px');
    }
  }
  const minimizeWindow = async () => {
    if(width == '0px'){
      setWidth('800px');
      setHeight('500px');
    }else{
      setWidth('0px');
      setHeight('0px');
      setTimeout(() => {
        onClose();
        setHeight('500px');
      setWidth('800px');
      }, 500);
      
    }
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="github-window"
          className="fixed inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
            }}
            style={{
              width: width,
              height: height,
            }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden flex flex-col"
          >
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 transform transition-transform duration-200 hover:scale-125"
              />
              <button
                onClick={minimizeWindow}
                className="w-3 h-3 rounded-full bg-yellow-500 transform transition-transform duration-200 hover:scale-125"
              />
              <button
                onClick={setIsMaximized}
                className="w-3 h-3 rounded-full bg-green-500 transform transition-transform duration-200 hover:scale-125"
              />
              <span className="ml-4 font-medium text-gray-700">
                {profile.username} / GitHub
              </span>
            </div>

            {/* Window Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-60 bg-gray-50/80 backdrop-blur-sm p-4 border-r border-gray-200 flex flex-col items-center gap-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full shadow-md"
                />
                <div className='items-center flex flex-col'>
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-sm text-gray-600">{profile.bio}</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="text-center">
                    <p className="font-bold">{profile.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{profile.following}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{profile.repos}</p>
                    <p className="text-xs text-gray-500">Repos</p>
                  </div>
    
                </div>
              <div className='items-center flex flex-col'>
                <p className='text-sm text-gray-900'>Achievements</p>
                <div className="flex gap-2 mt-2">
                <img
                  src='/images/pullshark.png'
                  alt='Pullshark Achievement'
                  className="w-12 h-12 rounded-full shadow-md"
                />
                <img
                  src='/images/pair.png'
                  alt='Pair Achievement'
                  className="w-12 h-12 rounded-full shadow-md"
                />
                </div>
     
              </div>
              </div>

              {/* Main README Content */}
              <div className="flex-1 p-6 overflow-auto">
                <pre className="whitespace-pre-wrap text-gray-700">
                             <div className="flex-1 overflow-auto p-6 bg-white/80">
              <div className="max-w-full space-y-4">
                {/* Banner */}
                <img
                  src="https://raw.githubusercontent.com/rusiru-19/rusiru-19/refs/heads/main/github-header-banner%20(1).png"
                  alt="Profile Banner"
                  className="w-full rounded-lg shadow"
                />

                {/* About */}
                <div className="text-gray-700">
                  <h2 className="text-xl font-semibold">🚀 About Me</h2>
                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                    <li>💻 Passionate developer who loves building intuitive and efficient applications.</li>
                    <li>🎯 Exploring <strong>new tech stacks</strong> and solving real-world problems.</li>
                    <li>🛠 Currently studying at <strong>Richmond College, Galle</strong></li>
                    <li>🌱 Learning: <strong>Docker, DevOps, and Next.js performance</strong></li>
                    <li>📍 Based in: <strong>Sri Lanka</strong></li>
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="text-gray-700">
                  <h2 className="text-xl font-semibold">🛠 Tech Stack</h2>
                  <p className="mt-2"><strong>Languages:</strong> JavaScript / TypeScript, PHP / SQL, Python</p>
                  <p className="mt-1"><strong>Frameworks & Tools:</strong> Next.js, React, Docker, Tailwind CSS, PostgreSQL/MySQL</p>
                </div>

                {/* GitHub Stats */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <img src="https://github-readme-stats.vercel.app/api?username=rusiru-19&show_icons=true&theme=radical" alt="GitHub Stats" />
                  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=rusiru-19&layout=compact&theme=radical" alt="Top Languages" />
                </div>

                {/* GitHub Trophies */}
                <p className="mt-4 text-center">
                  <img src="https://github-profile-trophy.vercel.app/?username=rusiru-19&theme=gruvbox&no-frame=true&no-bg=true&margin-w=10" alt="Trophies" />
                </p>

                {/* Swags */}
                <div className="mt-4 text-center">
                  <a href="https://holopin.io/@rusiru19" target="_blank">
                    <img src="https://holopin.me/rusiru19" alt="Holopin Swags" />
                  </a>
                </div>

                {/* Connect */}
                <div className="mt-4 flex gap-4 justify-center">
                  <a href="https://linkedin.com/in/rusiru-thamara-603276256" target="_blank">
                    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white" alt="LinkedIn" />
                  </a>
                  <a href="https://rusiru.dev/" target="_blank">
                    <img src="https://img.shields.io/badge/Portfolio-000000?logo=About.me&logoColor=white" alt="Portfolio" />
                  </a>
                  <a href="mailto:evildev360@example.com">
                    <img src="https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white" alt="Email" />
                  </a>
                </div>

                <p className="mt-4 text-gray-600 italic text-center">⭐ Fun Fact: I believe every bug is just a hidden feature… until 3 AM.</p>
              </div>
            </div>

                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
