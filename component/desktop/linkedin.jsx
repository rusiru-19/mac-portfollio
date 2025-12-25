'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { desc } from 'framer-motion/client';
import { useState } from 'react';

export default function LinkedInWindow({ isOpen, onClose, width, height, setWidth, setHeight }) {

  const profile = {
    name: 'Rusiru Thamara',
    headline: 'Student at Richmond College',
    location: 'Galle District, Southern Province, Sri lanka',
    company: 'Student at Richmond College, Galle',
    avatar: '/images/dp.jfif',
    about:
      'I am a passionate and driven individual with a curiosity for technology, creativity, and problem solving. Currently exploring opportunities that challenge me to grow both personally and professionally. I enjoy working on impactful projects that blend innovation, design, and functionality' ,
    experience: [
      {
        role: 'Treasurer ',
        company: 'Richmond College ICT society ',
        period: '2025 – Present',
      },
      {
        role: 'Secretary',
        company: 'Richmond College Model United Nation Club',
        period: '2024 – Present',
      },
      {
        role: 'Crew Member',
        company: 'Richmond Live',
        period: '2024 – Present',
      }
    ],
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Docker', 'PostgreSQL'],
    honors: [
        { title: "2nd Runner’s up Ananda college web dev comp", description: 'Awarded as the 2nd runner’s up on Ananda college ict day web development competition, competing around 30 schools over the island', by: 'Ananda college ICT society' },
    ],
    posts: ['<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7403830079371612160?collapsed=1" height="480" width="450" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>',
        '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7393201648489226241?collapsed=1" height="503" width="450" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>' ,
        '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7377224044275945472?collapsed=1" height="650" width="450" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
    ]
    
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
                className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-125 transition"
              />
              <button
                onClick={setIsMaximized}
                className="w-3 h-3 rounded-full bg-green-500 hover:scale-125 transition"
              />
              <span className="ml-4 font-medium text-gray-300">
                LinkedIn Profile
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden ">
              {/* Sidebar */}
              <div className="w-64 bg-white/10 backdrop-blur-2xl p-5 border-r overflow-auto">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full mx-auto shadow"
                />
                <h2 className="text-lg text-white font-semibold text-center mt-4">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-300 text-center">
                  {profile.headline}
                </p>
                <p className="text-xs text-gray-400 text-center mt-2">
                  {profile.location}
                </p>

                <button className="w-full mt-4 bg-[#0A66C2] text-white py-2 rounded-lg text-sm hover:bg-[#004182] transition">
                  Connect
                </button>
              </div>

              {/* Main Section */}
              <div className="flex-1 p-6  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* About */}
                <section>
                  <h3 className="font-semibold text-white text-lg mb-2">About</h3>
                  <p className="text-gray-300 text-sm">{profile.about}</p>
                </section>

                {/* Experience */}
                <section className="mt-6">
                  <h3 className="font-semibold text-white text-lg mb-2">Experience</h3>
                  <div className="space-y-3">
                    {profile.experience.map((exp, i) => (
                      <div key={i}>
                        <p className="font-medium text-gray-50">{exp.role}</p>
                        <p className="text-sm text-gray-300">
                          {exp.company} • {exp.period}
                        </p>
                      </div>
                    ))}
                  </div>
                 
                </section>

                {/* Skills */}
                <section className="mt-6">
                  <h3 className="font-semibold text-white text-lg mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-200 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                   <div className="space-y-3 mt-3">
                    <h3 className='font-semibold text-white text-lg mb-2'>Honors & Awards</h3>

                    {profile.honors.map((honor, i) => (
                      <div key={i}>
                        <p className="font-medium text-white">{honor.title}</p>
                        <p className="text-sm text-gray-300">{honor.description}</p>
                        <p className="text-xs text-gray-300">Issued by: {honor.by}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="mt-6">
                <div className="flex flex-col gap-4">
                    {profile.posts.map((post, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
                        dangerouslySetInnerHTML={{ __html: post }}
                    />
                    ))}
                </div>
                </section>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
