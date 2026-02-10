'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tours } from '@/data/content';
import { cn } from '@/lib/utils';
import { Calendar, Users, MessageSquare, ShieldCheck } from 'lucide-react';

export function BookingForm() {
  const { t, language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    tour: '',
    date: '',
    people: '1',
    name: '',
    phone: '',
    lang: language
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // WhatsApp logic
    const selectedTour = tours.find(t => t.id === formData.tour);
    const tourTitle = selectedTour ? selectedTour.title[language] : formData.tour;
    const message = `*New Booking Request*%0A%0A*Tour:* ${tourTitle}%0A*Date:* ${formData.date}%0A*People:* ${formData.people}%0A*Client:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Language:* ${formData.lang}`;
    
    window.open(`https://wa.me/995599033319?text=${message}`, '_blank');
  };

  const labels = {
    plan: { ka: 'დაგეგმე თავგადასავალი', en: 'Plan Your Adventure', ru: 'Запланируйте приключение', uk: 'Заплануйте пригоду', ar: 'خطط لمغامرتك', he: 'תכנן את ההרפתקה שלך' },
    desc: { ka: 'შეავსეთ ფორმა და ჩვენ 15 წუთში დაგიკავშირდებით.', en: 'Fill the form and we will contact you within 15 minutes.', ru: 'Заполните форму, и мы свяжемся с вами в течение 15 минут.', uk: 'Заповніть форму, і мы зв\'яжемося з вами протягом 15 хвилин.', ar: 'املأ النموذج وسنتصل بك في غضون 15 دقيقة.', he: 'מלאו את הטופס ונחזור אליכם תוך 15 דקות.' },
    flexible: { ka: 'მოქნილი თარიღები', en: 'Flexible Dates', ru: 'Гибкие даты', uk: 'Гнучкі дати', ar: 'تواريخ مرنة', he: 'תאריכים גמישים' },
    reschedule: { ka: 'უფასო გადაცვლა', en: 'Reschedule for free', ru: 'Перенос бесплатно', uk: 'Перенесення безкоштовно', ar: 'إعادة جدولة مجانية', he: 'שינוי מועד בחינם' },
    discounts: { ka: 'ფასდაკლებები', en: 'Group Discounts', ru: 'Групповые скидки', uk: 'Групові знижки', ar: 'خصومات المجموعات', he: 'הנחות לקבוצות' },
    secure: { ka: 'უსაფრთხო დაჯავშნა. წინასწარი გადახდის გარეშე.', en: 'Secure booking. No prepayment required.', ru: 'Безопасное бронирование. Без предоплаты.', uk: 'Безпечне бронювання. Без переდплати.', ar: 'حجز آمن. لا يلزم دفع مسبق.', he: 'הזמנה מאובטחת. אין צורך בתשלום מראש.' }
  };

  return (
    <section id="booking" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[50px] overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-white/5 transition-colors">
          
          <div className="lg:w-2/5 gold-gradient p-12 lg:p-16 text-primary flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <h3 className={cn("text-4xl lg:text-5xl font-black mb-8 leading-tight tracking-tighter", isRTL ? "font-arabic" : "font-inter")}>
                {labels.plan[language]}
              </h3>
              <p className="text-primary/80 text-xl font-medium mb-12">
                {labels.desc[language]}
              </p>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6 group">
                <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Calendar className="w-8 h-8" /></div>
                <div>
                  <p className="font-black text-xl">{labels.flexible[language]}</p>
                  <p className="text-primary/70">{labels.reschedule[language]}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Users className="w-8 h-8" /></div>
                <div>
                  <p className="font-black text-xl">{labels.discounts[language]}</p>
                  <p className="text-primary/70">{t.booking.groupDiscount}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:w-3/5 p-12 lg:p-16 bg-gray-50/50 dark:bg-zinc-900 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 dark:text-white/40 block uppercase tracking-[0.2em]">{t.nav.tours}</label>
                <select 
                  name="tour" 
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-[20px] p-5 focus:ring-4 focus:ring-accent/20 outline-none transition-all text-gray-900 dark:text-white"
                >
                  <option value="" className="text-gray-900 dark:text-white">{t.booking.form.selectTour}</option>
                  {tours.map(tour => (
                    <option key={tour.id} value={tour.id} className="text-gray-900 dark:text-white">{tour.title[language]}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 dark:text-white/40 block uppercase tracking-[0.2em]">{t.booking.form.date}</label>
                <input 
                  type="date" 
                  name="date"
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-[20px] p-5 focus:ring-4 focus:ring-accent/20 outline-none transition-all text-gray-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark]" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 dark:text-white/40 block uppercase tracking-[0.2em]">{t.booking.form.people}</label>
                <input 
                  type="number" 
                  name="people"
                  min="1"
                  defaultValue="1"
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-[20px] p-5 focus:ring-4 focus:ring-accent/20 outline-none transition-all text-gray-900 dark:text-white" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 dark:text-white/40 block uppercase tracking-[0.2em]">{t.booking.form.name}</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Giorgi Diasamidze"
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-[20px] p-5 focus:ring-4 focus:ring-accent/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full gold-gradient text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_24px_48px_-12px_rgba(212,175,55,0.4)] active:scale-95 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] group"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:rotate-12 transition-transform duration-300">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-lg uppercase tracking-tight">{t.booking.form.submit}</span>
            </button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" />
                {labels.secure[language]}
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-accent" />
                {t.booking.noHiddenFees}
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
