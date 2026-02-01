import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Infosys Springboard",
    category: "Full Stack Internship",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    link: "https://github.com/SayanRaut/Infosys-Springboard-Projects"
  },
  {
    id: 2,
    title: "Reagen AI",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    link: "https://github.com/SayanRaut/Reagen-AI"
  },
  {
    id: 3,
    title: "FRA Samanvay",
    category: "Geospatial Data",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop",
    link: "https://github.com/SayanRaut/FRA_Samanvay"
  },
  {
    id: 4,
    title: "SCRCPY by SR",
    category: "Utility Tool",
    // Updated image to represent a terminal/developer interface similar to the requested visual
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1600&auto=format&fit=crop",
    link: "https://github.com/SayanRaut/SCRCPY-by-SR"
  }
];

const Works: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter"
          >
            Selected <br/> <span className="text-accent">Works</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-gray-400 max-w-xs text-right mt-6 md:mt-0 font-light"
          >
            A curation of my recent digital creations, experiments, and commercial projects.
          </motion.p>
        </div>

        {/* 
            Changes: 
            1. Added max-w-5xl mx-auto to restrict width and make cards smaller.
            2. Added whileHover={{ scale: 0.95 }} to the card container for the "zoom out" feel.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.95 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`group cursor-pointer block ${index % 2 === 1 ? 'md:translate-y-24' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-sm bg-gray-900">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
              </div>
              
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-1">{project.title}</h3>
                  <p className="text-xs md:text-sm text-accent tracking-widest uppercase">{project.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="text-lg">↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="mt-40 text-center">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 border border-white/20 rounded-full font-display font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
                Visit my Github page
            </a>
        </div>
      </div>
    </section>
  );
};

export default Works;