import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        // Show nav links when scrolled down past a threshold (e.g. 100px)
        if (window.scrollY > 100) {
            setShowNavLinks(true);
        } else {
            setShowNavLinks(false);
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (id === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="bg-dark min-h-screen text-light selection:bg-accent selection:text-white">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, repeat: 1, repeatType: "reverse", repeatDelay: 1 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl tracking-widest uppercase">Welcome</h1>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Navbar */}
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference"
            >
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="font-display font-bold text-xl uppercase tracking-tighter cursor-pointer"
              >
                SR<span className="text-accent">.</span>
              </a>

              {/* Desktop Nav - Hidden at top, shown when scrolled */}
              <div className={`hidden md:flex gap-8 items-center transition-all duration-500 ease-in-out ${showNavLinks ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                {['Projects', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item.toLowerCase())}
                    className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button - Always visible on mobile */}
              <button onClick={() => setMenuOpen(true)} className="md:hidden">
                <Menu />
              </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.5 }}
                  className="fixed inset-0 z-50 bg-white text-dark flex flex-col justify-center items-center"
                >
                  <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2">
                    <X size={32} />
                  </button>
                  <div className="flex flex-col gap-8 text-center">
                    {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                      <a
                        key={item}
                        href={`#${item === 'Home' ? 'home' : item.toLowerCase()}`}
                        onClick={(e) => handleNavClick(e, item === 'Home' ? 'home' : item.toLowerCase())}
                        className="font-display text-5xl font-bold uppercase hover:text-accent transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <main>
              <Hero />
              <Works />
              <About />
              <Contact />
            </main>

            <footer className="py-8 px-6 text-center text-xs text-gray-500 uppercase tracking-widest border-t border-white/5">
              &copy; 2024 Sayan Raut. All Rights Reserved.
            </footer>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;