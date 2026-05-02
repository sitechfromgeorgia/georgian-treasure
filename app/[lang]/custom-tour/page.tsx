'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Send,
  MessageCircle,
  Route,
  Mountain,
  Wine,
  Utensils,
  Compass,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { rtlLocales } from '@/lib/i18n';
import { regions } from '@/data/content';

const destinations = [
  { id: 'tbilisi', name: 'Tbilisi', icon: MapPin },
  { id: 'batumi', name: 'Batumi', icon: MapPin },
  { id: 'kazbegi', name: 'Kazbegi', icon: Mountain },
  { id: 'kakheti', name: 'Kakheti', icon: Wine },
  { id: 'svaneti', name: 'Svaneti', icon: Mountain },
  { id: 'signagi', name: 'Signagi', icon: Heart },
  { id: 'borjomi', name: 'Borjomi', icon: Compass },
  { id: 'kutaisi', name: 'Kutaisi', icon: MapPin },
  { id: 'mestia', name: 'Mestia', icon: Mountain },
  { id: 'ushguli', name: 'Ushguli', icon: Mountain },
  { id: 'martvili', name: 'Martvili', icon: Compass },
  { id: 'vardzia', name: 'Vardzia', icon: Compass },
];

const interestsList = [
  { id: 'wine', name: 'Wine Tasting', icon: Wine },
  { id: 'hiking', name: 'Hiking & Trekking', icon: Mountain },
  { id: 'culture', name: 'Culture & History', icon: Compass },
  { id: 'food', name: 'Food & Cuisine', icon: Utensils },
  { id: 'adventure', name: 'Adventure Sports', icon: Sparkles },
  { id: 'photography', name: 'Photography', icon: Star },
  { id: 'relaxation', name: 'Relaxation & Spa', icon: Heart },
  { id: 'nightlife', name: 'Nightlife', icon: Sparkles },
];

const budgetOptions = [
  { id: 'budget', label: 'Budget', desc: 'Under $100/day', value: 'budget' },
  { id: 'standard', label: 'Standard', desc: '$100-200/day', value: 'standard' },
  { id: 'luxury', label: 'Luxury', desc: '$200+/day', value: 'luxury' },
];

const popularRoutes = [
  {
    name: 'Classic Georgia',
    desc: 'Tbilisi → Kazbegi → Kakheti → Sighnaghi',
    duration: '7 days',
    highlights: ['Gergeti Church', 'Wine tasting', 'Old Tbilisi'],
  },
  {
    name: 'Mountain Adventure',
    desc: 'Tbilisi → Kazbegi → Svaneti → Mestia → Ushguli',
    duration: '10 days',
    highlights: ['Trekking', 'Medieval towers', 'Alpine lakes'],
  },
  {
    name: 'Black Sea & West',
    desc: 'Batumi → Adjara Highlands → Martvili → Kutaisi',
    duration: '5 days',
    highlights: ['Beaches', 'Canyons', 'Cave cities'],
  },
  {
    name: 'Wine & Culture',
    desc: 'Tbilisi → Mtskheta → Kakheti → Telavi → Signagi',
    duration: '5 days',
    highlights: ['Qvevri wine', 'UNESCO sites', 'Supra feast'],
  },
];

const testimonials = [
  {
    name: 'Sarah & Mike',
    from: 'Australia',
    text: 'We planned a 2-week custom tour and it exceeded all expectations. Giorgi arranged everything perfectly - from homestays in Svaneti to wine tastings in Kakheti.',
    rating: 5,
  },
  {
    name: 'Hans Mueller',
    from: 'Germany',
    text: 'The custom itinerary was perfectly balanced between adventure and relaxation. Our guide knew every hidden gem in Georgia.',
    rating: 5,
  },
  {
    name: 'The Cohen Family',
    from: 'Israel',
    text: 'Traveling with kids can be challenging, but Georgian Treasure planned a family-friendly tour that everyone enjoyed. Highly recommended!',
    rating: 5,
  },
];

export default function CustomTourPage() {
  const locale = useLocale();
  const isRTL = rtlLocales.includes(locale as any);
  const fontClass = isRTL ? 'font-arabic' : locale === 'ka' ? 'font-georgian' : 'font-inter';

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    groupSize: '',
    notes: '',
  });

  const toggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Build WhatsApp message
    const destNames = selectedDestinations.map((id) => destinations.find((d) => d.id === id)?.name).join(', ');
    const interestNames = selectedInterests.map((id) => interestsList.find((i) => i.id === id)?.name).join(', ');
    const budgetLabel = budgetOptions.find((b) => b.value === selectedBudget)?.label || 'Not specified';

    const message = `*Custom Tour Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A%0A*Destinations:* ${destNames || 'Not specified'}%0A*Dates:* ${formData.startDate} to ${formData.endDate}%0A*Group Size:* ${formData.groupSize}%0A*Budget:* ${budgetLabel}%0A*Interests:* ${interestNames || 'Not specified'}%0A%0A*Notes:* ${formData.notes || 'None'}`;

    window.open(`https://wa.me/995599033319?text=${message}`, '_blank');
  };

  return (
    <main className={cn('min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-500', fontClass)}>
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#001F3F]">
          <img
            src="/tours/hero-tbilisi.jpg"
            alt="Custom Tour"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001F3F]/80 to-[#001F3F]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="text-white/80 text-sm">Personalized Experience</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Create Your Dream Tour
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Tell us your preferences and we&apos;ll craft a personalized itinerary just for you.
              From destinations to dining, every detail is tailored to your desires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              {/* Step 1: Destinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                    <MapPin size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001F3F] dark:text-white">Choose Destinations</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select all the places you want to visit</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {destinations.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest.id);
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => toggleDestination(dest.id)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all duration-300',
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20'
                            : 'border-gray-200 dark:border-zinc-700 hover:border-[#D4AF37]/50'
                        )}
                      >
                        <dest.icon size={20} className={cn('mx-auto mb-2', isSelected ? 'text-[#D4AF37]' : 'text-gray-400')} />
                        <span className={cn('text-sm font-medium', isSelected ? 'text-[#001F3F] dark:text-white' : 'text-gray-600 dark:text-gray-400')}>
                          {dest.name}
                        </span>
                        {isSelected && (
                          <CheckCircle size={14} className="text-[#D4AF37] mx-auto mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 2: Dates & Group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                    <Calendar size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001F3F] dark:text-white">Travel Dates & Group</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When and with whom are you traveling?</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData((d) => ({ ...d, startDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData((d) => ({ ...d, endDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Group Size
                    </label>
                    <select
                      required
                      value={formData.groupSize}
                      onChange={(e) => setFormData((d) => ({ ...d, groupSize: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    >
                      <option value="">Select group size</option>
                      <option value="1">Solo traveler</option>
                      <option value="2">Couple</option>
                      <option value="3-5">Small group (3-5)</option>
                      <option value="6-10">Medium group (6-10)</option>
                      <option value="10+">Large group (10+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedBudget(opt.value)}
                          className={cn(
                            'p-3 rounded-xl border-2 text-center transition-all',
                            selectedBudget === opt.value
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                              : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300'
                          )}
                        >
                          <DollarSign size={16} className={cn('mx-auto mb-1', selectedBudget === opt.value ? 'text-[#D4AF37]' : 'text-gray-400')} />
                          <span className="text-xs font-medium block">{opt.label}</span>
                          <span className="text-[10px] text-gray-500">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                    <Sparkles size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001F3F] dark:text-white">Your Interests</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">What activities excite you most?</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {interestsList.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all duration-300',
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20'
                            : 'border-gray-200 dark:border-zinc-700 hover:border-[#D4AF37]/50'
                        )}
                      >
                        <interest.icon size={20} className={cn('mx-auto mb-2', isSelected ? 'text-[#D4AF37]' : 'text-gray-400')} />
                        <span className={cn('text-sm font-medium', isSelected ? 'text-[#001F3F] dark:text-white' : 'text-gray-600 dark:text-gray-400')}>
                          {interest.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 4: Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                    <User size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#001F3F] dark:text-white">Your Details</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">How can we reach you?</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Requests / Notes
                    </label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        placeholder="Any specific requests, dietary needs, accessibility requirements..."
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData((d) => ({ ...d, notes: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#001F3F] to-[#003366] text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#001F3F]/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={20} />
                  Submit Request via WhatsApp
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  We&apos;ll get back to you within 24 hours with a personalized itinerary.
                </p>
              </motion.div>
            </form>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-4">
                Request Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Thank you, <strong>{formData.name}</strong>! We&apos;ve received your custom tour request and will contact you at{' '}
                <strong>{formData.email}</strong> within 24 hours with a personalized itinerary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/tours`}
                  className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#001F3F] px-6 py-3 rounded-full font-bold hover:bg-[#F9E272] transition-colors"
                >
                  Browse Tours
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/995599033319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 rounded-full px-4 py-2 mb-4">
              <Route size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">Popular Routes</span>
            </div>
            <h2 className="text-3xl font-bold text-[#001F3F] dark:text-white">
              Inspiration for Your Journey
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={route.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Route size={18} className="text-[#D4AF37]" />
                  <span className="text-xs text-[#D4AF37] font-medium">{route.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F] dark:text-white mb-2">{route.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{route.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {route.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#001F3F] dark:text-white">
              What Our Travelers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-[#001F3F] dark:text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.from}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#001F3F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Prefer to Chat Directly?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our team is available on WhatsApp to help you plan your perfect Georgian adventure in real-time.
            </p>
            <a
              href="https://wa.me/995599033319"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] dark:bg-black py-12 text-white/60 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-6 tracking-tighter">GEORGIAN TREASURE</h2>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Georgian Treasure. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
