import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  PanInfo, 
  AnimatePresence,
  useMotionTemplate,
  useMotionValue
} from 'framer-motion';

// --- Star Cursor Component ---
const StarCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Spawn stars on move
      for (let i = 0; i < 3; i++) {
        stars.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          size: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          life: 1,
          decay: Math.random() * 0.03 + 0.01
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      for (let i = stars.current.length - 1; i >= 0; i--) {
        const star = stars.current[i];
        
        star.x += star.vx;
        star.y += star.vy;
        star.life -= star.decay;

        if (star.life <= 0) {
          stars.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        // Simple 4-point star shape
        const size = star.size;
        ctx.moveTo(star.x, star.y - size);
        ctx.lineTo(star.x + size, star.y);
        ctx.lineTo(star.x, star.y + size);
        ctx.lineTo(star.x - size, star.y);
        ctx.closePath();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-50 pointer-events-none" />;
};

// --- Planets Data (Earth Only w/ Filters) ---
const EARTH_TEXTURE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg';

const PLANETS = [
  { 
    name: 'Projects', 
    id: 'projects', 
    texture: EARTH_TEXTURE,
    color: '#22c55e', // Green
    description: 'Explore my Github projects',
    filter: 'hue-rotate(80deg) brightness(1.1) saturate(1.2) contrast(1.1)' 
  },
  { 
    name: 'About', 
    id: 'about', 
    texture: EARTH_TEXTURE,
    color: '#3b82f6', // Blue
    description: 'Know about me',
    filter: 'brightness(1.1) saturate(1.3) contrast(1.1)' 
  },
  { 
    name: 'Contact', 
    id: 'contact', 
    texture: EARTH_TEXTURE,
    color: '#f59e0b', // Sand/Gold
    description: 'Let\'s connect',
    filter: 'sepia(1) hue-rotate(-20deg) saturate(1.5) contrast(1.2)' 
  },
];

type Planet = typeof PLANETS[number];

interface PlanetSlideProps {
  planet: Planet;
  index: number;
  activeIndex: number;
  onClick: () => void;
  radius: number;
  size: number;
  spacing: number;
}

const PlanetSlide: React.FC<PlanetSlideProps> = ({ 
  planet, 
  index, 
  activeIndex, 
  onClick,
  radius,
  size,
  spacing
}) => {
  const isActive = index === activeIndex;
  const offset = index - activeIndex; // e.g., -1, 0, 1
  
  // Pivot Calculation:
  // We want the pivot to be `radius` pixels below the center of the planet.
  // Center Y = size / 2.
  // Pivot Y = (size / 2) + radius.
  
  const pivotY = size / 2 + radius;

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 cursor-pointer`}
      initial={false}
      style={{ 
        width: size,
        height: size,
        x: '-50%', 
        y: '-50%',
        transformOrigin: `50% ${pivotY}px`, // Critical: Rotation happens around the orbit center
        zIndex: isActive ? 20 : 10,
      }}
      animate={{
        rotate: offset * spacing, // Rotates along the orbit
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 30,
        mass: 1.2
      }}
      onClick={onClick}
    >
      {/* 
          Inner Wrapper for Visual Scaling 
          This ensures the scale happens from the CENTER of the planet,
          not relative to the distant orbit pivot.
      */}
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        animate={{
            scale: isActive ? 1.4 : 0.65, // Significant size difference
            opacity: isActive ? 1 : 0.6,
            filter: isActive ? 'grayscale(0%) brightness(1.2)' : 'grayscale(60%) brightness(0.5)',
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
          {/* Planet Sphere */}
          <div 
            className="relative w-full h-full rounded-full shadow-2xl overflow-hidden transition-all duration-500"
            style={{ 
              boxShadow: isActive ? `0 0 100px ${planet.color}50` : 'none',
              border: isActive ? `1px solid ${planet.color}40` : '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* Texture */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${planet.texture})`,
                filter: planet.filter 
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Shaders */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)',
                mixBlendMode: 'multiply'
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color} 0%, transparent 60%)`,
                mixBlendMode: 'screen'
              }}
            />

            <div className="absolute inset-0 rounded-full ring-1 ring-white/10 ring-inset" />
          </div>
          
          {/* Small Dot Indicator below planet to anchor it to line */}
          <motion.div 
            animate={{ opacity: isActive ? 1 : 0 }}
            className={`absolute -bottom-6 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_#3b82f6]`} 
          />
      </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive Configuration
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update sizes for both mobile and desktop
  const orbitRadius = isMobile ? 520 : 950;
  const planetSize = isMobile ? 100 : 150;
  const itemSpacing = isMobile ? 25 : 20;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => Math.min(PLANETS.length - 1, prev + 1));
    }
  };

  const handlePlanetClick = (index: number, id: string) => {
    if (index === activeIndex) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveIndex(index);
    }
  };

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-dark"
    >
      <div className="absolute inset-0 bg-dark pointer-events-none" />
      <StarCursor />

      {/* Main Title - Fixed at top */}
      <div className="absolute top-[12%] z-20 w-full flex flex-col items-center">
        {/* Welcome Message */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-cyan-300/80 text-xs md:text-sm tracking-[0.5em] uppercase font-bold mb-4 drop-shadow-md text-center"
        >
          Welcome to my Universe
        </motion.p>

        {/* Name with Spotlight Effect */}
        <motion.div
           initial={{ opacity: 0, filter: 'blur(15px)' }}
           whileInView={{ opacity: 1, filter: 'blur(0px)' }}
           viewport={{ once: false }}
           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
           className="relative group cursor-default p-4"
           onMouseMove={handleMouseMove}
        >
             {/* Base Text: Dimmed/Blurred - Made slightly brighter per request */}
             <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white/20 blur-[2px] select-none transition-all duration-300">
                SAYAN RAUT
             </h1>
             
             {/* Spotlight Text: Bright White + Glow */}
             <motion.h1 
                className="absolute inset-0 top-4 font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white select-none pointer-events-none drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(
                        250px circle at ${mouseX}px ${mouseY}px,
                        black 0%,
                        transparent 80%
                    )`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(
                        250px circle at ${mouseX}px ${mouseY}px,
                        black 0%,
                        transparent 80%
                    )`
                }}
             >
                SAYAN RAUT
             </motion.h1>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-[600px] flex items-center justify-center mt-0 z-10 touch-pan-y overflow-visible">
        
        {/* Orbital Line */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-0"
            style={{ 
                width: orbitRadius * 2,
                height: orbitRadius * 2,
                top: '50%',
            }} 
        >
            {/* Outer Glow Line */}
            <div 
              className="absolute inset-0 rounded-full border border-white/5" 
            />
            
            {/* Main Track Line */}
            <div 
              className="absolute inset-0 rounded-full border-t border-cyan-500/30 shadow-[0_-2px_15px_rgba(6,182,212,0.3)]"
              style={{
                // Wider mask to ensure the line is visible even under the wide side planets
                maskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 70%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 70%, transparent 90%)'
              }}
            />

            {/* Dashed Detail Line inside */}
            <div 
              className="absolute inset-[2px] rounded-full border-t border-dashed border-white/20"
              style={{
                maskImage: 'linear-gradient(to right, transparent 15%, black 35%, black 65%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 15%, black 35%, black 65%, transparent 85%)'
              }}
            />
        </div>

        {/* Drag Area */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
        >
          {PLANETS.map((planet, index) => (
            <PlanetSlide 
              key={planet.id} 
              planet={planet} 
              index={index} 
              activeIndex={activeIndex}
              onClick={() => handlePlanetClick(index, planet.id)}
              radius={orbitRadius}
              size={planetSize}
              spacing={itemSpacing}
            />
          ))}
        </motion.div>
      </div>

      {/* Active Item Text */}
      <div className="absolute bottom-[12%] md:bottom-[10%] z-30 w-full flex justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2 text-center"
            >
                <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest text-white drop-shadow-md">
                  {PLANETS[activeIndex].name}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-white/20" />
                  <p className="text-xs font-mono text-cyan-200 tracking-[0.3em] uppercase">
                    {PLANETS[activeIndex].description}
                  </p>
                  <div className="h-[1px] w-8 bg-white/20" />
                </div>
            </motion.div>
          </AnimatePresence>
      </div>

      {/* Footer / Instructions */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white font-light">
          Swipe or Drag to Explore
        </span>
      </div>

    </section>
  );
};

export default Hero;