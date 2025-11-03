'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import WaitlistModal from './WaitlistModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Tik Tok', href: '#' },
    { name: 'Twitter X', href: '#' },
    { name: 'Linkedin', href: '#' },
  ];

  // Animações otimizadas para mobile
  const animationDuration = isMobile ? 0.4 : 0.6;
  const animationDelay = isMobile ? 0.1 : 0.2;

  return (
    <footer className="bg-gradient-to-b from-black to-purple-900 text-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
          {/* Left Side - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="flex flex-col w-full lg:w-auto"
          >
            <span className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Digital Innovation</span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light break-all sm:break-normal">
              contato@devportfolio.com
            </h2>
          </motion.div>

          {/* Right Side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration, delay: animationDelay }}
            className="flex flex-col items-start lg:items-end text-left lg:text-right w-full lg:w-auto"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 sm:mb-3">
              Let's Build Together
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 max-w-sm text-sm sm:text-base">
              Get in touch to discuss your next project
            </p>
            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Social Links */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: animationDuration }}
          className="flex justify-center lg:justify-space-between gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mb-3 sm:mb-4 flex-wrap"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ y: isMobile ? 0 : -2 }}
              className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg lg:text-xl font-medium"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
        
        {/* Separator Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      {/* Main Logo */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: isMobile ? 0.6 : 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-wider break-all sm:break-normal">
            PABLO.ABREU
          </h1>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center gap-3 sm:gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: animationDuration }}
              className="text-xs sm:text-sm text-gray-400 order-2 sm:order-1"
            >
              © 2025.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: animationDuration, delay: animationDelay }}
              className="flex gap-4 sm:gap-6 order-1 sm:order-2"
            >
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms and conditions
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;