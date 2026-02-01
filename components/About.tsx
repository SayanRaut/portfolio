import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

const techs = [
  { name: 'React', icon: 'devicon-react-original', url: 'https://react.dev' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', url: 'https://www.typescriptlang.org' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', url: 'https://nextjs.org' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-original', url: 'https://tailwindcss.com' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', url: 'https://nodejs.org' },
  { name: 'Python', icon: 'devicon-python-plain', url: 'https://www.python.org' },
  { name: 'Docker', icon: 'devicon-docker-plain', url: 'https://www.docker.com' },
  { name: 'Three.js', icon: 'devicon-threejs-original', url: 'https://threejs.org' },
  { name: 'Figma', icon: 'devicon-figma-plain', url: 'https://figma.com' },
  { name: 'Git', icon: 'devicon-git-plain', url: 'https://git-scm.com' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', url: 'https://www.mongodb.com' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', url: 'https://www.postgresql.org' },
];

const expertise = [
  {
    title: "Agentic AI",
    description: "Building autonomous agents capable of reasoning, planning, and executing complex tasks. Leveraging LLMs to create intelligent, self-correcting workflows.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-indigo-500/80 to-violet-500/80",
    textHighlight: "text-indigo-400"
  },
  {
    title: "Machine Learning",
    description: "Developing predictive models and data-driven solutions. Expertise in PyTorch and TensorFlow for computer vision and NLP applications.",
    image: "https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-rose-500/80 to-pink-500/80",
    textHighlight: "text-rose-400"
  },
  {
    title: "Frontend Architecture",
    description: "Crafting scalable, performant, and accessible user interfaces. Focusing on micro-frontends, component reusability, and advanced state management patterns.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-blue-500/80 to-cyan-500/80",
    textHighlight: "text-blue-400"
  },
  {
    title: "Backend Systems",
    description: "Architecting robust APIs and distributed systems. Designing efficient database schemas and deploying containerized microservices on cloud infrastructure.",
    // Updated image to match futuristic/interface aesthetic
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-emerald-500/80 to-teal-500/80",
    textHighlight: "text-emerald-400"
  },
  {
    title: "UI/UX Design",
    description: "Bridging engineering and design. Creating high-fidelity prototypes and fluid interactions that ensure the final product matches the creative vision.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-orange-500/80 to-amber-500/80",
    textHighlight: "text-orange-400"
  }
];

const Card: React.FC<{ item: typeof expertise[0], index: number }> = ({ item, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      className="group relative w-full max-w-5xl mx-auto mb-16 last:mb-0 bg-dark/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl"
    >
      {/* Background Image: Default is blurred and faint, Hover unblurs and brightens */}
      <div className="absolute inset-0 z-0 transition-all duration-700 ease-out">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover blur-[6px] opacity-30 grayscale group-hover:blur-0 group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-dark/90 group-hover:bg-dark/70 transition-colors duration-700" />
      </div>

      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Border Glow on Hover */}
      <motion.div
         className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
         style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.15),
                transparent 80%
              )
            `,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: 'exclude',
            padding: '1px'
         }}
      />
      
      <div className="relative p-8 md:p-14 flex flex-col md:flex-row gap-10 z-20">
         <div className="flex-1">
            <div className="flex items-center gap-6 mb-8">
                <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-white/5 group-hover:scale-110 transition-transform duration-500`}>
                   <span className="font-display font-bold text-xl">{index + 1}</span>
                </div>
                <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/30 transition-colors duration-500"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
              {item.title}
            </h3>
         </div>
         
         <div className="flex-1 flex items-end">
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light border-l border-white/10 pl-6 group-hover:border-white/30 group-hover:text-gray-200 transition-all duration-500">
              {item.description}
            </p>
         </div>
      </div>
    </motion.div>
  )
}

const CardStack = () => {
  return (
    <div className="flex flex-col w-full px-4">
      {expertise.map((item, index) => (
        <Card key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const LogoLoop = () => {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const speed = useRef(1);
  const loopItems = [...techs, ...techs, ...techs, ...techs];

  useAnimationFrame((t, delta) => {
    const targetSpeed = isHovered ? 0.05 : 1;
    speed.current = speed.current + (targetSpeed - speed.current) * 0.05;
    // Slowed down speed factor from -5 to -1.5
    let moveBy = -1.5 * (delta / 1000) * speed.current; 
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${(v % 50)}%`);

  return (
    <div 
      className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-10 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex w-fit" style={{ x }}>
        {loopItems.map((tech, index) => (
          <div key={index} className="flex flex-col items-center gap-3 mx-8 w-24 shrink-0 group">
             <a 
                href={tech.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 w-full"
            >
                <i className={`${tech.icon} text-6xl text-gray-600 group-hover:text-white group-hover:scale-110 transition-all duration-300`}></i>
                <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-accent">{tech.name}</span>
            </a>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-dark text-white relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Intro */}
        <div className="max-w-5xl mx-auto text-center mb-32">
          
          {/* Animated Large About Me Text */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
                visible: { transition: { staggerChildren: 0.1 } }
             }}
             className="relative mb-12"
          >
             <div className="flex justify-center overflow-hidden">
                {"ABOUT ME".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] } }
                        }}
                        // Logic: ABOUT (indices 0-4) is Blue (text-accent), ME (indices 6-7) is White.
                        className={`font-display text-3xl md:text-5xl font-black tracking-tighter ${i > 5 ? 'text-white' : 'text-accent'}`}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
             </div>
             {/* Decorative Accent Line */}
             <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                className="h-1 md:h-2 w-32 md:w-64 bg-accent mx-auto mt-4"
             />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-3xl md:text-5xl font-bold leading-tight uppercase mb-12 text-gray-300"
          >
            I am <span className="text-accent">Sayan Raut</span>. <br/>
            Engineered for <span className="stroke-text">Performance</span>. <br/>
            Designed for <span className="stroke-text">Impact</span>.
          </motion.h2>
        </div>

        {/* Tech Stack Loop */}
        <div className="mb-40 space-y-8">
            <p className="text-center text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Tech Arsenal</p>
            <LogoLoop />
        </div>

        {/* Expertise Section */}
        <div className="relative max-w-6xl mx-auto">
           <div className="mb-20 text-center">
              <h3 className="text-3xl md:text-5xl font-display font-bold uppercase">Areas of <span className="text-accent">Expertise</span></h3>
              <p className="text-gray-500 mt-4 tracking-wide">My technical toolkit and design philosophy.</p>
           </div>
           
           <CardStack />
        </div>

      </div>
      
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default About;