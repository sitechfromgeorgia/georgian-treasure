'use client';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { PopularTours } from '@/components/home/PopularTours';
import { BookingForm } from '@/components/home/BookingForm';
import { Contact } from '@/components/home/Contact';
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';
import { ServiceWorkerRegister } from '@/components/ui/ServiceWorkerRegister';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Home() {
  const { isRTL, t } = useLanguage();

  return (
    <main className={cn("min-h-screen transition-colors duration-500", isRTL ? "font-arabic" : "font-inter")}>
      <Header />
      <Hero />
      <PopularTours />
      
      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-zinc-950 overflow-hidden transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 gold-gradient rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
              <img 
                src="/images/batumi/lake-tower.jpg" 
                alt="Batumi View" 
                className="rounded-[40px] shadow-2xl relative z-10 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-8">
                {t.about.title}
              </h2>
              <div className="space-y-8">
                {t.about.features.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl gold-gradient flex-shrink-0 flex items-center justify-center font-bold text-primary shadow-lg group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingForm />
      <Contact />
      <PWAInstallPrompt />
      <ServiceWorkerRegister />

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/995599033319" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      </a>

      <footer className="bg-primary dark:bg-black py-20 text-white/60 border-t border-white/5 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-8 tracking-tighter">GEORGIAN TREASURE</h2>
          <div className="flex justify-center gap-10 mb-12">
            {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
              <a 
                key={social} 
                href="#" 
                rel="noopener"
                className="text-lg hover:text-accent transition-colors relative group opacity-50"
                title="Coming soon"
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <p className="border-t border-white/5 pt-10 text-sm">
            © {new Date().getFullYear()} Georgian Treasure. Batumi, Adjara. {t.footer.allRights}
          </p>
        </div>
      </footer>
    </main>
  );
}
