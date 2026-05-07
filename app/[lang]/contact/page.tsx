'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp integration
    const whatsappMessage = `Hello! I'm ${formData.name}. ${formData.message}`;
    const whatsappUrl = `https://wa.me/995599033319?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('info.phone.title'),
      value: '+995 599 033 319',
      href: 'tel:+995599033319',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      icon: Mail,
      title: t('info.email.title'),
      value: 'georgiantreasure1@gmail.com',
      href: 'mailto:georgiantreasure1@gmail.com',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      icon: MapPin,
      title: t('info.address.title'),
      value: t('info.address.value'),
      href: '#',
      color: 'bg-red-500/20 text-red-400'
    },
    {
      icon: Clock,
      title: t('info.hours.title'),
      value: t('info.hours.value'),
      href: '#',
      color: 'bg-yellow-500/20 text-yellow-400'
    }
  ];

  return (
    <main className="min-h-screen bg-[#001F3F] pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/70">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark rounded-3xl p-8 border border-white/10"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{t('form.success.title')}</h3>
                  <p className="text-white/60">{t('form.success.message')}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-white mb-6">{t('form.title')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">{t('form.name')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder={t('form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">{t('form.email')}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder={t('form.emailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">{t('form.phone')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder={t('form.phonePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">{t('form.message')}</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                        placeholder={t('form.messagePlaceholder')}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] text-[#001F3F] font-bold py-4 rounded-xl hover:bg-[#E5C048] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      {t('form.submit')}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark rounded-3xl overflow-hidden border border-white/10 h-[500px] lg:h-auto"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29815.7!2d41.6367!3d41.6168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4045f0e7c7c7c7c7%3A0x7c7c7c7c7c7c7c7c!2sBatumi%2C%20Georgia!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-3xl p-12 text-center border border-white/10"
          >
            <MessageCircle size={64} className="text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">{t('whatsapp.title')}</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">{t('whatsapp.subtitle')}</p>
            <Link
              href="https://wa.me/995599033319"
              target="_blank"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={24} />
              {t('whatsapp.button')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white/50 text-sm uppercase tracking-widest mb-6">{t('social.follow')}</h3>
          <div className="flex justify-center gap-4">
            <Link
              href="https://instagram.com/georgiantreasure"
              target="_blank"
              className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 border border-white/10 transition-all"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://facebook.com/georgiantreasure"
              target="_blank"
              className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 border border-white/10 transition-all"
            >
              <Facebook size={24} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
