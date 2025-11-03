'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import WaitlistModal from './WaitlistModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Tik Tok', href: '#' },
    { name: 'Twitter X', href: '#' },
    { name: 'Linkedin', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-purple-900 text-white">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Left Side - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="text-sm text-gray-300 mb-2">Digital Innovation</span>
            <h2 className="text-2xl lg:text-3xl font-light">
              contato@devportfolio.com
            </h2>
          </motion.div>

          {/* Right Side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end text-left lg:text-right"
          >
            <h3 className="text-xl lg:text-2xl font-medium mb-3">
              Let's Build Together
            </h3>
            <p className="text-gray-300 mb-4 max-w-sm">
              Get in touch to discuss your next project
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Social Links */}
      <div className="container mx-auto px-6 py-6 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-space-between gap-8 lg:gap-12 mb-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-gray-300 hover:text-white transition-colors text-xl font-medium"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
        
        {/* Separator Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      {/* Main Logo */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-wider">
            PABLO.ABREU
          </h1>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-400"
            >
              © 2025.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6"
            >
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
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