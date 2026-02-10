'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAInstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Check iOS
    const isIosDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(isIosDevice);

    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-[60]"
      >
        <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl p-6 border border-gray-100 dark:border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full gold-gradient" />
          
          <button 
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-primary font-black text-xl flex-shrink-0">
              GT
            </div>
            <div>
              <h4 className="font-black text-primary dark:text-white text-lg leading-tight mb-1">
                Install App
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {isIOS 
                  ? 'Tap "Share" and then "Add to Home Screen" to install Georgian Treasure app.'
                  : 'Install our app for faster access and offline bookings in Batumi!'}
              </p>
              
              {!isIOS && (
                <button className="gold-gradient text-primary font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                  <Download size={16} />
                  Install Now
                </button>
              )}
              
              {isIOS && (
                <div className="flex items-center gap-2 text-primary dark:text-accent font-bold text-sm">
                  <Share size={18} />
                  Add to Home Screen
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
