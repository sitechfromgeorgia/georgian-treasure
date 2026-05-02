'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Contact() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className={cn(
            "text-4xl md:text-5xl font-black text-primary dark:text-white mb-16",
            isRTL ? "font-arabic" : "font-inter"
          )}>
            {t.contact.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.a
              href="https://wa.me/995599033319"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gray-50 dark:bg-zinc-900 p-10 rounded-[40px] border border-gray-100 dark:border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl gold-gradient mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-3">
                {t.contact.phone}
              </h3>
              <p className="text-2xl font-black text-accent tracking-tight">
                +995 599 033 319
              </p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gray-50 dark:bg-zinc-900 p-10 rounded-[40px] border border-gray-100 dark:border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl gold-gradient mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-3">
                {t.contact.address}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t.contact.addressValue}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
