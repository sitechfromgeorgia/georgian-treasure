import { Tour, Translation, Language } from '../types';

export const tours: Tour[] = [
  {
    id: 'batumi-city-tour',
    title: {
      ka: 'ბათუმის ქალაქის ტური',
      en: 'Batumi City Tour',
      ru: 'Тур по Батуми',
      uk: 'Тур по Батумі',
      ar: 'جولة في مدينة باتومي',
      he: 'סיור בעיר בטומי'
    },
    description: {
      ka: 'აღმოაჩინეთ ბათუმის ისტორია და თანამედროვეობა ერთ დღეში.',
      en: 'Discover Batumi\'s history and modernity in one day.',
      ru: 'Откройте для себя историю и современность Батуми за один день.',
      uk: 'Відкрийте для себе історію та сучасність Батумі за один день.',
      ar: 'اكتشف تاريخ وحداثة باتومي في يوم واحد.',
      he: 'גלה את ההיסטוריה והמודרניות של בטומי ביום אחד.'
    },
    priceGEL: 50,
    priceUSD: 20,
    duration: { ka: '4 საათი', en: '4 hours', ru: '4 часа', uk: '4 години', ar: '4 ساعات', he: '4 שעות' },
    difficulty: 'Easy',
    image: '/images/batumi/night-skyline.jpg',
    category: 'day'
  },
  {
    id: 'mountainous-adjara',
    title: {
      ka: 'მთიანი აჭარა',
      en: 'Mountainous Adjara',
      ru: 'Горная Аджария',
      uk: 'Гірська Аджарія',
      ar: 'أجاريا الجبلية',
      he: 'אג\'ארה ההררית'
    },
    description: {
      ka: 'ულამაზესი ჩანჩქერები, თამარის ხიდები და ღვინის დეგუსტაცია.',
      en: 'Beautiful waterfalls, Queen Tamar bridges and wine tasting.',
      ru: 'Красивые водопады, мосты царицы Тамары и дегустация вин.',
      uk: 'Красиві водоспади, мости цариці Тамари та дегустація вин.',
      ar: 'شلالات جميلة وجسور الملكة تامار وتذوق النبيذ.',
      he: 'מפלים יפהפיים, גשרי המלכה תמר וטעימות יין.'
    },
    priceGEL: 80,
    priceUSD: 30,
    duration: { ka: '7 საათი', en: '7 hours', ru: '7 часов', uk: '7 годин', ar: '7 ساعات', he: '7 שעות' },
    difficulty: 'Medium',
    image: '/images/batumi/green-cityscape.jpg',
    category: 'day'
  }
];

export const translations: Record<Language, any> = {
  ka: {
    hero: {
      title: 'აღმოაჩინე ბათუმის საგანძური',
      subtitle: 'ექსკლუზიური ტურები და დაუვიწყარი თავგადასავლები აჭარაში',
      cta: 'დაჯავშნე ახლავე',
      watchVideo: 'ვიდეოს ნახვა'
    },
    nav: {
      tours: 'ტურები',
      about: 'ჩვენს შესახებ',
      booking: 'დაჯავშნა',
      contact: 'კონტაქტი'
    },
    sections: {
      popularTours: 'პოპულარული ტურები',
      whyUs: 'რატომ ჩვენ?',
      howToBook: 'როგორ დავჯავშნოთ',
      testimonials: 'რას ამბობენ ტურისტები',
      faq: 'ხშირად დასმული კითხვები'
    },
    about: {
      title: 'რატომ Georgian Treasure?',
      features: [
        { title: 'პროფესიონალი გიდები', desc: 'ჩვენი გიდები საუბრობენ 6 ენაზე და იციან ბათუმის ყველა საიდუმლო კუთხე.' },
        { title: 'პერსონალური გამოცდილება', desc: 'VIP ტურები ან ჯგუფური თავგადასავლები თქვენს რიტმზე მორგებული.' },
        { title: 'საუკეთესო ფასის გარანტია', desc: 'პრემიუმ სერვისი კონკურენტუნარიან ფასებში. ფარული ხარჯების გარეშე.' }
      ]
    },
    booking: {
      title: 'დაჯავშნე ტური',
      form: {
        name: 'თქვენი სახელი',
        people: 'ადამიანების რაოდენობა',
        date: 'თარიღი',
        tour: 'აირჩიეთ ტური',
        submit: 'დაჯავშნა WhatsApp-ით',
        selectTour: 'აირჩიეთ ტური'
      },
      noHiddenFees: 'ფარული ხარჯების გარეშე',
      groupDiscount: '5+ ადამიანისთვის 20%-მდე ფასდაკლება'
    },
    pwa: {
      installApp: 'დააინსტალირე აპი',
      installNow: 'ახლავე დააინსტალირე',
      iosInstructions: 'დააჭირე "გაზიარება" და შემდეგ "Add to Home Screen" რომ დააინსტალირო Georgian Treasure აპი.',
      instructions: 'დააინსტალირე ჩვენი აპი სწრაფი წვდომისთვის და ბათუმში ოფლაინ დაჯავშნებისთვის!',
      addToHomeScreen: 'დაამატე მთავარ ეკრანზე'
    },
    contact: {
      title: 'დაგვიკავშირდით',
      phone: 'ტელეფონი / WhatsApp',
      address: 'მისამართი',
      addressValue: 'ბათუმი, აჭარა, საქართველო'
    },
    footer: {
      allRights: 'ყველა უფლება დაცულია.',
      chat: 'მიწერე გიორგის'
    }
  },
  en: {
    hero: {
      title: 'Discover Georgian Treasure',
      subtitle: 'Exclusive tours and unforgettable adventures in Adjara',
      cta: 'Book Now',
      watchVideo: 'Watch Video'
    },
    nav: {
      tours: 'Tours',
      about: 'About Us',
      booking: 'Booking',
      contact: 'Contact'
    },
    sections: {
      popularTours: 'Popular Tours',
      whyUs: 'Why Choose Us?',
      howToBook: 'How to Book',
      testimonials: 'Testimonials',
      faq: 'FAQ'
    },
    about: {
      title: 'Why Georgian Treasure?',
      features: [
        { title: 'Expert Local Guides', desc: 'Our guides speak 6 languages and know every secret corner of Batumi.' },
        { title: 'Personalized Experience', desc: 'Private VIP tours or group adventures tailored to your rhythm.' },
        { title: 'Best Price Guarantee', desc: 'Premium service at competitive local prices. No hidden fees.' }
      ]
    },
    booking: {
      title: 'Book a Tour',
      form: {
        name: 'Your Name',
        people: 'Number of People',
        date: 'Date',
        tour: 'Select Tour',
        submit: 'Book via WhatsApp',
        selectTour: 'Select a tour'
      },
      noHiddenFees: 'No hidden fees',
      groupDiscount: 'Up to 20% off for 5+ people'
    },
    pwa: {
      installApp: 'Install App',
      installNow: 'Install Now',
      iosInstructions: 'Tap "Share" and then "Add to Home Screen" to install Georgian Treasure app.',
      instructions: 'Install our app for faster access and offline bookings in Batumi!',
      addToHomeScreen: 'Add to Home Screen'
    },
    contact: {
      title: 'Contact Us',
      phone: 'Phone / WhatsApp',
      address: 'Address',
      addressValue: 'Batumi, Adjara, Georgia'
    },
    footer: {
      allRights: 'All rights reserved.',
      chat: 'Chat with Giorgi'
    }
  },
  ru: {
    hero: {
      title: 'Откройте для себя сокровища Грузии',
      subtitle: 'Эксклюзивные туры и незабываемые приключения в Аджарии',
      cta: 'Забронировать сейчас',
      watchVideo: 'Смотреть видео'
    },
    nav: {
      tours: 'Туры',
      about: 'О нас',
      booking: 'Бронирование',
      contact: 'Контакт'
    },
    sections: {
      popularTours: 'Популярные туры',
      whyUs: 'Почему мы?',
      howToBook: 'Как забронировать',
      testimonials: 'Отзывы',
      faq: 'Часто задаваемые вопросы'
    },
    about: {
      title: 'Почему Georgian Treasure?',
      features: [
        { title: 'Профессиональные гиды', desc: 'Наши гиды говорят на 6 языках и знают каждый потайной уголок Батуми.' },
        { title: 'Персональный подход', desc: 'VIP-туры или групповые приключения, адаптированные под ваш ритм.' },
        { title: 'Гарантия лучшей цены', desc: 'Премиум сервис по конкурентным ценам. Без скрытых комиссий.' }
      ]
    },
    booking: {
      title: 'Забронировать тур',
      form: {
        name: 'Ваше имя',
        people: 'Количество человек',
        date: 'Дата',
        tour: 'Выберите тур',
        submit: 'Забронировать через WhatsApp',
        selectTour: 'Выберите тур'
      },
      noHiddenFees: 'Без скрытых комиссий',
      groupDiscount: 'Скидка до 20% для 5+ человек'
    },
    pwa: {
      installApp: 'Установить приложение',
      installNow: 'Установить сейчас',
      iosInstructions: 'Нажмите "Поделиться", затем "На экран Домой", чтобы установить приложение Georgian Treasure.',
      instructions: 'Установите наше приложение для быстрого доступа и оффлайн-бронирования в Батуми!',
      addToHomeScreen: 'На экран Домой'
    },
    contact: {
      title: 'Свяжитесь с нами',
      phone: 'Телефон / WhatsApp',
      address: 'Адрес',
      addressValue: 'Батуми, Аджария, Грузия'
    },
    footer: {
      allRights: 'Все права защищены.',
      chat: 'Написать Георгию'
    }
  },
  uk: {
    hero: {
      title: 'Відкрийте для себе скарби Грузії',
      subtitle: 'Ексклюзивні тури та незабутні пригоди в Аджарії',
      cta: 'Забронювати зараз',
      watchVideo: 'Дивитися відео'
    },
    nav: {
      tours: 'Тури',
      about: 'Про нас',
      booking: 'Бронювання',
      contact: 'Контакт'
    },
    sections: {
      popularTours: 'Популярні тури',
      whyUs: 'Чому ми?',
      howToBook: 'Як забронювати',
      testimonials: 'Відгуки',
      faq: 'Часті запитання'
    },
    about: {
      title: 'Чому Georgian Treasure?',
      features: [
        { title: 'Професійні гіди', desc: 'Наші гіди розмовляють 6 мовами та знають кожен потаємний куточок Батумі.' },
        { title: 'Персональний підхід', desc: 'VIP-тури або групові пригоди, адаптовані під ваш ритм.' },
        { title: 'Гарантія найкращої ціни', desc: 'Преміум сервіс за конкурентними цінами. Без прихованих комісій.' }
      ]
    },
    booking: {
      title: 'Забронювати тур',
      form: {
        name: 'Ваше ім\'я',
        people: 'Кількість осіб',
        date: 'Дата',
        tour: 'Оберіть тур',
        submit: 'Забронювати через WhatsApp',
        selectTour: 'Оберіть тур'
      },
      noHiddenFees: 'Без прихованих комісій',
      groupDiscount: 'Знижка до 20% для 5+ осіб'
    },
    pwa: {
      installApp: 'Встановити додаток',
      installNow: 'Встановити зараз',
      iosInstructions: 'Натисніть "Поділитися", потім "На головний екран", щоб встановити додаток Georgian Treasure.',
      instructions: 'Встановіть наш додаток для швидкого доступу та офлайн-бронювання в Батумі!',
      addToHomeScreen: 'На головний екран'
    },
    contact: {
      title: 'Зв\'яжіться з нами',
      phone: 'Телефон / WhatsApp',
      address: 'Адреса',
      addressValue: 'Батумі, Аджарія, Грузія'
    },
    footer: {
      allRights: 'Всі права захищені.',
      chat: 'Написати Георгію'
    }
  },
  ar: {
    hero: {
      title: 'اكتشف الكنز الجورجي',
      subtitle: 'جولات حصرية ومغامرات لا تنسى في أجاريا',
      cta: 'احجز الآن',
      watchVideo: 'شاهد الفيديو'
    },
    nav: {
      tours: 'جولات',
      about: 'معلومات عنا',
      booking: 'حجز',
      contact: 'اتصال'
    },
    sections: {
      popularTours: 'الجولات الشهيرة',
      whyUs: 'لماذا نحن؟',
      howToBook: 'كيفية الحجز',
      testimonials: 'اراء السياح',
      faq: 'الأسئلة الشائعة'
    },
    about: {
      title: 'لماذا الكنز الجورجي؟',
      features: [
        { title: 'أدلة محليون خبراء', desc: 'يتحدث أدلاؤنا 6 لغات ويعرفون كل زاوية سرية في باتومي.' },
        { title: 'تجربة شخصية', desc: 'جولات VIP خاصة أو مغامرات جماعية مصممة حسب إيقاعك.' },
        { title: 'ضمان أفضل الأسعار', desc: 'خدمة متميزة بأسعار محلية تنافسية. لا توجد رسوم خفية.' }
      ]
    },
    booking: {
      title: 'احجز جولة',
      form: {
        name: 'اسمك',
        people: 'عدد الأشخاص',
        date: 'التاريخ',
        tour: 'اختر الجولة',
        submit: 'احجز عبر الواتساب',
        selectTour: 'اختر جولة'
      },
      noHiddenFees: 'لا توجد رسوم خفية',
      groupDiscount: 'خصم يصل إلى 20% لـ 5+ أشخاص'
    },
    pwa: {
      installApp: 'تثبيت التطبيق',
      installNow: 'ثبت الآن',
      iosInstructions: 'انقر على "مشاركة" ثم "أضف إلى الشاشة الرئيسية" لتثبيت تطبيق Georgian Treasure.',
      instructions: 'قم بتثبيت تطبيقنا للوصول السريع والحجز دون اتصال في باتومي!',
      addToHomeScreen: 'أضف إلى الشاشة الرئيسية'
    },
    contact: {
      title: 'اتصل بنا',
      phone: 'الهاتف / واتساب',
      address: 'العنوان',
      addressValue: 'باتومي، أجاريا، جورجيا'
    },
    footer: {
      allRights: 'كل الحقوق محفوظة.',
      chat: 'تحدث مع جيورجي'
    }
  },
  he: {
    hero: {
      title: 'גלו את האוצר הגיאורגי',
      subtitle: 'סיורים בלעדיים והרפתקאות בלתי נשכחות באג\'ארה',
      cta: 'הזמן עכשיו',
      watchVideo: 'צפה בווידאו'
    },
    nav: {
      tours: 'סיורים',
      about: 'עלינו',
      booking: 'הזמנה',
      contact: 'צור קשר'
    },
    sections: {
      popularTours: 'סיורים פופולריים',
      whyUs: 'למה אנחנו?',
      howToBook: 'איך להזמין',
      testimonials: 'המלצות',
      faq: 'שאלות נפוצות'
    },
    about: {
      title: 'למה האוצר הגיאורגי?',
      features: [
        { title: 'מדריכים מקומיים מומחים', desc: 'המדריכים שלנו דוברים 6 שפות ומכירים כל פינה סודית בבטומי.' },
        { title: 'חוויה אישית', desc: 'סיורי VIP פרטיים או הרפתקאות קבוצתיות המותאמות לקצב שלך.' },
        { title: 'התחייבות למחיר הטוב ביותר', desc: 'שירות פרימיום במחירים מקומיים תחרותיים. ללא עמלות נסתרות.' }
      ]
    },
    booking: {
      title: 'הזמן סיור',
      form: {
        name: 'השם שלך',
        people: 'מספר אנשים',
        date: 'תאריך',
        tour: 'בחר סיור',
        submit: 'הזמן בוואטסאפ',
        selectTour: 'בחר סיור'
      },
      noHiddenFees: 'ללא עמלות נסתרות',
      groupDiscount: 'עד 20% הנחה ל-5+ אנשים'
    },
    pwa: {
      installApp: 'התקן אפליקציה',
      installNow: 'התקן עכשיו',
      iosInstructions: 'לחץ על "שתף" ואז "הוסף למסך הבית" כדי להתקין את אפליקציית Georgian Treasure.',
      instructions: 'התקן את האפליקציה שלנו לגישה מהירה יותר והזמנות לא מקוונות בבטומי!',
      addToHomeScreen: 'הוסף למסך הבית'
    },
    contact: {
      title: 'צור קשר',
      phone: 'טלפון / WhatsApp',
      address: 'כתובת',
      addressValue: 'בטומי, אג\'ארה, גיאורגיה'
    },
    footer: {
      allRights: 'כל הזכויות שמורות.',
      chat: 'דבר עם גיורגי'
    }
  }
};
