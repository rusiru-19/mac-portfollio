'use client';

import { X, Wifi, User, Palette, Bell, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
export default function SettingsWindow({ isOpen, onClose, height, width, setHeight, setWidth }) {
  return (
         <AnimatePresence>
         {isOpen && (
           <motion.div
             className="fixed inset-0 flex items-center justify-center z-40"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               layout
               transition={{ type: 'spring', stiffness: 260, damping: 25 }}
               style={{
                 width: width,
                 height: height,
               }}
               className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden flex flex-col"
             >
               {/* Title Bar */}
               <div className="flex items-center gap-2 px-4 py-3 border-b">
                 <button
                   onClick={onClose}
                   className="w-3 h-3 rounded-full bg-red-500 hover:scale-125 transition"
                 />
                 <button 
                 onClick={minimizeWindow}
                 className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-125 transition" />
                 <button
                   onClick={() => setIsMaximized((v) => !v)}
                   className="w-3 h-3 rounded-full bg-green-500 hover:scale-125 transition"
                 />
                <span className="text-sm text-white/70 font-medium">
                  System Settings
                </span>
               </div>
    <main className="flex-1 p-8 text-white overflow-y-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     );
   }
   