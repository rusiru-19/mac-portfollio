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


export default function TrashWindow({ isOpen, onClose, height, width, setHeight, setWidth }) {
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
                  Trash
                </span>
               </div>
               <div className="flex-1 overflow-auto p-6 bg-white/10 backdrop-blur-xl  shadow-2xl border border-white/20">

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trashItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
                        <img src={item.icon} alt={item.name} className="w-12 h-12 mb-2" />
                        <span className="text-sm text-white text-center">{item.name}</span>
                        <span className="text-xs text-white/50">{item.date}</span>
                    </div>
                    ))}
                </div>

  
                </div>

             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     );
   }
   const trashItems = [
  { name: "Old Portfolio v1", icon: "/file.svg", date: "Nov 17, 2025" },
  { name: "School Old Website", icon: "/file.svg", date: "Oct 27, 2025" },
];
