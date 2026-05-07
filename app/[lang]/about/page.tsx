'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Heart, 
  Shield, 
  Award,
  Users,
  MapPin,
  Star,
  Globe
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  const stats = [
    { icon: Compass, value: '500+', label: t('stats.tours') },
    { icon: Users, value: '10K+', label: t('stats.tourists') },
    { icon: Star, value: '4.9', label: t('stats.languages') },
    { icon: Globe, value: '50+', label: t('stats.years') }
  ];

  const values = [
    {
      icon: Heart,
      title: t('values.passion.title'),
      description: t('values.passion.desc')
    },
    {
      icon: Shield,
      title: t('values.safety.title'),
      description: t('values.safety.desc')
    },
    {
      icon: Award,
      title: t('values.quality.title'),
      description: t('values.quality.desc')
    },
    {
      icon: Users,
      title: t('values.personal.title'),
      description: t('values.personal.desc')
    }
  ];

  const team = [
    {
      name: 'Giorgi Tsertsvadze',
      role: t('team.founder'),
      image: '/tours/hero-batumi.jpg'
    },
    {
      name: 'Nino Kvaratskhelia',
      role: t('team.guide'),
      image: '/tours/kakheti-wine.jpg'
    },
    {
      name: 'David Mamulashvili',
      role: t('team.operations'),
      image: '/tours/kazbegi-mountain.jpg'
    }
  ];

  return (
    <main className="min-h-screen bg-[#001F3F] pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {t('hero.subtitle')}
          </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6 text-center border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-black text-white mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src="/tours/svaneti-towers.jpg"
                alt="Georgian Treasure Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#001F3F]/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              {t('values.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-8 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              {t('team.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-3xl overflow-hidden border border-white/10 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#D4AF37]">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#001F3F]/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-3xl overflow-hidden"
            >
              <Image
                src="/tours/gudauri-ski.jpg"
                alt="Why Choose Us"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/80 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-black text-white mb-8">
                {t('why.title')}
              </h2>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#001F3F] font-bold">{num}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">
                        {t(`why.points.${num}.title`)}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {t(`why.points.${num}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
