'use client';

import { useState } from 'react';
import { ExtendedTour } from '@/types/tour';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, Users, Phone, User, MessageSquare, Tag, Info } from 'lucide-react';

interface TourBookingFormProps {
  tour: ExtendedTour;
}

export function TourBookingForm({ tour }: TourBookingFormProps) {
  const { language, isRTL } = useLanguage();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(2);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const tr = tour.translations[language] || tour.translations.en;

  const groupDiscountPercent = peopleCount >= 5 ? 20 : 0;
  const baseTotal = tour.priceGel * peopleCount;
  const discountAmount = (baseTotal * groupDiscountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;

  const perPersonWithDiscount = peopleCount >= 5
    ? Math.round(tour.priceGel * 0.8)
    : tour.priceGel;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const langLabels: Record<string, { booking: string; name: string; date: string; people: string; phone: string; total: string; discount: string; tour: string }> = {
      ka: { booking: 'ტურის დაჯავშნა', name: 'სახელი', date: 'თარიღი', people: 'ადამიანები', phone: 'ტელეფონი', total: 'ჯამი', discount: 'ფასდაკლება', tour: 'ტური' },
      en: { booking: 'Tour Booking', name: 'Name', date: 'Date', people: 'People', phone: 'Phone', total: 'Total', discount: 'Discount', tour: 'Tour' },
      ru: { booking: 'Бронирование тура', name: 'Имя', date: 'Дата', people: 'Человек', phone: 'Телефон', total: 'Итого', discount: 'Скидка', tour: 'Тур' },
      he: { booking: 'הזמנת סיור', name: 'שם', date: 'תאריך', people: 'אנשים', phone: 'טלפון', total: 'סה"כ', discount: 'הנחה', tour: 'סיור' },
    };

    const labels = langLabels[language] || langLabels.en;

    const text = [
      `*${labels.booking}*`,
      '',
      `${labels.tour}: ${tr.title}`,
      `${labels.name}: ${name}`,
      `${labels.date}: ${date}`,
      `${labels.people}: ${peopleCount}`,
      `${labels.phone}: ${phone}`,
      peopleCount >= 5 ? `${labels.discount}: ${groupDiscountPercent}%` : null,
      `${labels.total}: ${finalTotal} GEL`,
      message ? `Note: ${message}` : null,
    ].filter(Boolean).join('\n');

    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/995599033319?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  const labels = {
    title: language === 'ka' ? 'დაჯავშნე ტური'
      : language === 'en' ? 'Book This Tour'
      : language === 'ru' ? 'Забронировать тур'
      : 'הזמן סיור זה',
    name: language === 'ka' ? 'თქვენი სახელი'
      : language === 'en' ? 'Your Name'
      : language === 'ru' ? 'Ваше имя'
      : 'השם שלך',
    date: language === 'ka' ? 'თარიღი'
      : language === 'en' ? 'Preferred Date'
      : language === 'ru' ? 'Предпочтительная дата'
      : 'תאריך מועדף',
    people: language === 'ka' ? 'ადამიანების რაოდენობა'
      : language === 'en' ? 'Number of People'
      : language === 'ru' ? 'Количество человек'
      : 'מספר אנשים',
    phone: language === 'ka' ? 'ტელეფონი / WhatsApp'
      : language === 'en' ? 'Phone / WhatsApp'
      : language === 'ru' ? 'Телефон / WhatsApp'
      : 'טלפון / וואטסאפ',
    message: language === 'ka' ? 'დამატებითი შეტყობინება'
      : language === 'en' ? 'Additional Message'
      : language === 'ru' ? 'Дополнительное сообщение'
      : 'הודעה נוספת',
    submit: language === 'ka' ? 'დაჯავშნა WhatsApp-ით'
      : language === 'en' ? 'Book via WhatsApp'
      : language === 'ru' ? 'Забронировать через WhatsApp'
      : 'הזמן דרך וואטסאפ',
    perPerson: language === 'ka' ? 'ერთ ადამიანზე'
      : language === 'en' ? 'per person'
      : language === 'ru' ? 'на человека'
      : 'לאדם',
    total: language === 'ka' ? 'ჯამი'
      : language === 'en' ? 'Total'
      : language === 'ru' ? 'Итого'
      : 'סה"כ',
    discountApplied: language === 'ka' ? 'ჯგუფური ფასდაკლება მოქმედებს!'
      : language === 'en' ? 'Group discount applied!'
      : language === 'ru' ? 'Групповая скидка применена!'
      : 'הנחת קבוצה הופעלה!',
    discountInfo: language === 'ka' ? '5+ ადამიანი = 20% ფასდაკლება'
      : language === 'en' ? '5+ people = 20% discount'
      : language === 'ru' ? '5+ человек = скидка 20%'
      : '5+ אנשים = 20% הנחה',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sticky top-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-5">{labels.title}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
            <User size={14} className="text-[#D4AF37]" />
            {labels.name}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-[#001F3F]/50 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
            placeholder="John Doe"
            style={{ direction: 'ltr' }}
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
            <Calendar size={14} className="text-[#D4AF37]" />
            {labels.date}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-[#001F3F]/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* People Count */}
        <div>
          <label className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
            <Users size={14} className="text-[#D4AF37]" />
            {labels.people}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPeopleCount((c) => Math.max(1, c - 1))}
              className="w-10 h-10 flex items-center justify-center bg-[#001F3F]/50 border border-white/10 rounded-xl text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/30 transition-colors text-lg font-medium"
            >
              −
            </button>
            <span className="flex-1 text-center text-white font-semibold text-lg">
              {peopleCount}
            </span>
            <button
              type="button"
              onClick={() => setPeopleCount((c) => Math.min(tour.maxGroupSize, c + 1))}
              className="w-10 h-10 flex items-center justify-center bg-[#001F3F]/50 border border-white/10 rounded-xl text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/30 transition-colors text-lg font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
            <Phone size={14} className="text-[#D4AF37]" />
            {labels.phone}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-[#001F3F]/50 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
            placeholder="+995 599 033 319"
            style={{ direction: 'ltr' }}
          />
        </div>

        {/* Message (optional) */}
        <div>
          <label className="flex items-center gap-2 text-sm text-white/70 mb-1.5">
            <MessageSquare size={14} className="text-[#D4AF37]" />
            {labels.message} <span className="text-white/30">({language === 'en' ? 'optional' : language === 'ka' ? 'არასავალდებულო' : language === 'ru' ? 'необязательно' : 'רשות'})</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 bg-[#001F3F]/50 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all resize-none"
            placeholder="..."
          />
        </div>

        {/* Price Calculator */}
        <div className="pt-2 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                {tour.priceGel} GEL × {peopleCount} {labels.perPerson}
              </span>
              <span className="text-white font-medium">{baseTotal} GEL</span>
            </div>

            {groupDiscountPercent > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex justify-between text-sm"
              >
                <span className="text-emerald-400 flex items-center gap-1">
                  <Tag size={12} />
                  {labels.discountApplied} (-{groupDiscountPercent}%)
                </span>
                <span className="text-emerald-400 font-medium">-{discountAmount} GEL</span>
              </motion.div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-white font-semibold">{labels.total}</span>
              <div className="text-right">
                {groupDiscountPercent > 0 && (
                  <span className="block text-xs text-white/40 line-through">{baseTotal} GEL</span>
                )}
                <span className="text-2xl font-bold text-[#D4AF37]">{finalTotal} GEL</span>
              </div>
            </div>

            {/* Discount Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Info size={12} />
              <span>{labels.discountInfo}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <MessageSquare size={18} />
          {labels.submit}
        </button>
      </form>
    </motion.div>
  );
}