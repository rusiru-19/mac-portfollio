'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
export default function EmailWindow({ isOpen, onClose, height, width, setHeight, setWidth, notification, setNotification }) {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = async() => {
    const res = axios.post('api/getmail', {
      from: from,
      subject: subject,
      body: body
    }).then((response) => {
      if(response.status == 200){
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const notificationmsg = {  title: 'Email sent successfully!' , time: time, body: `Your email with subject "${subject}" has been sent.`};
        setNotification(notificationmsg);
        onClose();
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    }) 
   
    // const notificationmsg = {  title: 'Email sent successfully!' , body: `Your email with subject "${subject}" has been sent.`};
    // setNotification(notificationmsg);
    // onClose();
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
          key="email-window"
          className="fixed inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        >
          <motion.div
            layout
            style={{
              width: width,
              height: height,
            }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 flex flex-col overflow-hidden"
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
                onClick={() => setIsMaximized((v) => !v)}
                className="w-3 h-3 rounded-full bg-green-500 transform transition-transform duration-200 hover:scale-125"
              />
              <span className="ml-4 font-medium text-gray-700">Compose Email</span>
            </div>
            {/* Compose Section */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">From:</label>
                  <input
                    type="email"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="youremail@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subject:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Body:</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="Write your email here..."
                  />
                </div>

                <div className="flex justify-end gap-2 mt-2">
          
                  <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 transition"
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
