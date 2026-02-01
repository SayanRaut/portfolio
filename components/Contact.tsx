import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Check, AlertCircle, Loader2, Instagram, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const socials = [
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/__sayan_raut' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sayanraut36/' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/SayanRaut' }
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email) {
       setIsValid(false);
       setErrorMessage('Email is required');
       return;
    }

    if (!validateEmail(email)) {
      setIsValid(false);
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!message.trim()) {
      setIsValid(false);
      setErrorMessage('Message is required');
      return;
    }
    
    setIsValid(true);
    setIsSubmitting(true);
    
    // Simulate network request then open mail client
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Construct mailto link for admin notification
      const subject = "Portfolio Inquiry";
      const body = `From: ${email}\n\nMessage:\n${message}`;
      const mailtoLink = `mailto:sayanraut2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;

      setEmail('');
      setMessage('');
      
      // Reset success message after 4 seconds
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 relative flex flex-col items-center justify-center min-h-[70vh]">
      
      <div className="container mx-auto text-center z-10">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
            <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8">
              Let's Work <br/> <span className="text-accent">Together</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-16">
              Have an idea? Let's turn it into reality. Send me a message and I'll get back to you.
            </p>
            
            <div className="max-w-xl mx-auto relative text-left">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                   
                   {/* Email Input */}
                   <div className="relative group">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Your Email</label>
                      <input 
                         id="email"
                         type="text" 
                         placeholder="john@example.com"
                         value={email}
                         onChange={(e) => {
                             setEmail(e.target.value);
                             if (!isValid) setIsValid(true);
                         }}
                         className={`w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-display font-medium outline-none placeholder:text-gray-800 focus:border-accent transition-colors duration-300 ${
                            !isValid && !email ? 'border-red-500 text-red-100' : 'text-white'
                         }`}
                      />
                   </div>

                   {/* Message Input */}
                   <div className="relative group">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Your Message</label>
                      <textarea
                         id="message"
                         placeholder="Tell me about your project..."
                         value={message}
                         onChange={(e) => {
                             setMessage(e.target.value);
                             if (!isValid) setIsValid(true);
                         }}
                         rows={3}
                         className={`w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-display font-medium outline-none placeholder:text-gray-800 focus:border-accent transition-colors duration-300 resize-none ${
                            !isValid && !message ? 'border-red-500 text-red-100' : 'text-white'
                         }`}
                      />
                   </div>
                   
                   {/* Error/Success Messages */}
                   <AnimatePresence>
                     {!isValid && errorMessage && (
                        <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="flex items-center gap-2 text-red-500 text-sm font-medium"
                        >
                           <AlertCircle size={16} />
                           <span>{errorMessage}</span>
                        </motion.div>
                     )}
                     
                     {isSuccess && (
                        <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="flex items-center gap-2 text-green-500 text-sm font-medium"
                        >
                           <Check size={16} />
                           <span>Redirecting to email client...</span>
                        </motion.div>
                     )}
                   </AnimatePresence>

                   <div className="flex justify-center md:justify-end mt-4">
                      <button 
                         type="submit"
                         disabled={isSubmitting || isSuccess}
                         className="flex items-center gap-4 px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                         <span>Send Message</span>
                         {isSubmitting ? (
                            <Loader2 className="animate-spin" size={20} />
                         ) : (
                            <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={20} />
                         )}
                      </button>
                   </div>
                </form>
            </div>
         </motion.div>

         <div className="mt-32 flex flex-wrap justify-center gap-8 md:gap-16">
            {socials.map((social) => (
              <a 
                key={social.name} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                <div className="p-3 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                    <social.icon size={20} className="group-hover:text-accent transition-colors" />
                </div>
                <span>{social.name}</span>
              </a>
            ))}
         </div>
      </div>

    </section>
  );
};

export default Contact;