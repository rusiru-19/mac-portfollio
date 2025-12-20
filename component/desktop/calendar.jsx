'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarWindow({ isOpen, onClose, height, width, setHeight, setWidth }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

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
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden flex flex-col"
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
              <span className="ml-4 font-medium text-gray-700">
                Calendar
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month - 1, 1))
                }
                className="text-gray-600 hover:text-black"
              >
                ←
              </button>

              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h2>

              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month + 1, 1))
                }
                className="text-gray-600 hover:text-black"
              >
                →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 p-4">
              {/* Days */}
              <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                {daysShort.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  return (
                    <div
                      key={day}
                      className={`h-16 rounded-xl flex items-center justify-center cursor-pointer transition
                        ${
                          isToday(day)
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'hover:bg-gray-200'
                        }
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
