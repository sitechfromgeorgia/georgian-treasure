import { LegacyTour, Translation, Language } from '../types';
import { extendedTours } from './extended-tours';

// Export extended tours as the primary tours array
export { extendedTours as tours };

// Legacy tours kept for backward compatibility
export const legacyTours: LegacyTour[] = [
  {
    id: 'batumi-city-tour',
    title: {
      ka: 'ბათუმის ქალაქის ტური',
      en: 'Batumi City Tour',
      ru: 'Тур по Батуми',

      he: 'סיור בעיר בטומי'
    },
    description: {
      ka: 'აღმოაჩინეთ ბათუმის ისტორია და თანამედროვეობა ერთ დღეში.',
      en: 'Discover Batumi\'s history and modernity in one day.',
      ru: 'Откройте для себя историю и современность Батуми за один день.',

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

      he: 'אג\'ארה ההררית'
    },
    description: {
      ka: 'ულამაზესი ჩანჩქერები, თამარის ხიდები და ღვინის დეგუსტაცია.',
      en: 'Beautiful waterfalls, Queen Tamar bridges and wine tasting.',
      ru: 'Красивые водопады, мосты царицы Тамары и дегустация вин.',

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

// Regions data
export const regions = [
  {
    id: 'adjara',
    slug: 'adjara',
    image: '/tours/hero-batumi.jpg',
    translations: {
      ka: { name: 'ბათუმი და აჭარა', description: 'შავი ზღვის სანაპირო, ბოტანიკური ბაღი, გონიოს ციხე, მახუნცეთის ჩანჩქერი, მტირალას ეროვნული პარკი' },
      en: { name: 'Batumi & Adjara', description: 'Black Sea coast, botanical garden, Gonio fortress, Makhuntseti waterfall, Mtirala National Park' },
      ru: { name: 'Батуми и Аджария', description: 'Черноморское побережье, ботанический сад, крепость Гонио, водопад Махунцети, нац. парк Мтирала' },

      he: { name: 'בטומי ואג\'אריה', description: 'חוף הים השחור, הגן הבוטני, מצודת גוניו, מפל מחונצתי, פארק לאומי מטירלה' }
    }
  },
  {
    id: 'tbilisi',
    slug: 'tbilisi',
    image: '/tours/hero-tbilisi.jpg',
    translations: {
      ka: { name: 'თბილისი და მცხეთა', description: 'ძველი თბილისი, ნარიყალა, აბანოები, მცხეთა-ჯვარი-სვეტიცხოველი, მთის წმინდა' },
      en: { name: 'Tbilisi & Mtskheta', description: 'Old Tbilisi, Narikala, sulphur baths, Mtskheta-Jvari-Svetitskhoveli, Chronicles of Georgia' },
      ru: { name: 'Тбилиси и Мцхета', description: 'Старый Тбилиси, Нарикала, серные бани, Мцхета-Джвари-Светицховели, Хроника Грузии' },

      he: { name: 'טביליסי ומצחתה', description: 'טביליסי העתיקה, נריקלה, מרחצאות הגופרית, מצחתה-גווארי-סבטיצחובלי, דברי ימי גאורגיה' }
    }
  },
  {
    id: 'kakheti',
    slug: 'kakheti',
    image: '/tours/kakheti-wine.jpg',
    translations: {
      ka: { name: 'კახეთი', description: 'ღვინის რეგიონი, სიღნაღი, თელავი, ცინდანდალი, რთველი, სუპრა, მზიური ღვინის მარანი' },
      en: { name: 'Kakheti', description: 'Wine region, Sighnaghi, Telavi, Tsinandali, Rtveli harvest, Supra feast, traditional wine cellar' },
      ru: { name: 'Кахетия', description: 'Винный регион, Сигнахи, Телави, Цинандали, сбор винограда Ртвели, застолье Супра, винный погреб' },

      he: { name: 'קאחתי', description: 'אזור היין, סיגנאגי, תלאווי, ציננדאלי, קציר רטוולי, סעודת סופרה, מרתף יין מסורתי' }
    }
  },
  {
    id: 'kazbegi',
    slug: 'kazbegi',
    image: '/tours/kazbegi-mountain.jpg',
    translations: {
      ka: { name: 'ყაზბეგი და გუდაური', description: 'გერგეტის სამება, სამხედრო გზა, გუდაურის სასრიალო კურორტი, პარაპლანი, ATV, მყინვარწვერი' },
      en: { name: 'Kazbegi & Gudauri', description: 'Gergeti Trinity, Military Road, Gudauri ski resort, paragliding, ATV, Mount Kazbek' },
      ru: { name: 'Казбеги и Гудаури', description: 'Гергетская Троица, Военно-Грузинская дорога, горнолыжный курорт Гудаури, парапланеризм, квадроциклы' },

      he: { name: 'קאזבגי וגודאורי', description: 'טריניטי גרגטי, הדרך הצבאית, אתר הסקי גודאורי, רחיפה, טרקטורונים, הר קאזבק' }
    }
  },
  {
    id: 'svaneti',
    slug: 'svaneti',
    image: '/tours/svaneti-towers.jpg',
    translations: {
      ka: { name: 'სვანეთი', description: 'უშგული, მესტია, კოშკები, მყინვარი შხარა, კორულდის ტბები, ტბეთი, ლათპარის ტბა' },
      en: { name: 'Svaneti', description: 'Ushguli, Mestia, medieval towers, Shkhara glacier, Koruldi Lakes, Tskhoumberi, Latpari' },
      ru: { name: 'Сванетия', description: 'Ушгули, Местиа, средневековые башни, ледник Шхара, озера Корулди, Тлещи, Латпари' },

      he: { name: 'סוונטי', description: 'אושגולי, מסטיה, מגדלים בימי הביניים, קרחון שחארה, אגמי קורולדי' }
    }
  },
  {
    id: 'west',
    slug: 'west',
    image: '/tours/martvili-canyon.jpg',
    translations: {
      ka: { name: 'დასავლეთი საქართველო', description: 'მარტვილის კანიონი, პრომეთეს მღვიმე, ოკაცეს კანიონი, კინჩხის ჩანჩქერი, დადიანების სასახლე' },
      en: { name: 'West Georgia', description: 'Martvili Canyon, Prometheus Cave, Okatse Canyon, Kinchkha Waterfall, Dadiani Palace' },
      ru: { name: 'Западная Грузия', description: 'Каньон Мартвили, пещера Прометея, каньон Окаце, водопад Кинчха, дворец Дадиани' },

      he: { name: 'מערב גאורגיה', description: 'קניון מרטווילי, מערת פרומתאוס, קניון אוקאצה, מפל קינצ\'חה, ארמון דאדיאני' }
    }
  },
  {
    id: 'samtskhe',
    slug: 'samtskhe',
    image: '/tours/vardzia-cave.jpg',
    translations: {
      ka: { name: 'სამცხე-ჯავახეთი', description: 'ვარძია, რაბათის ციხე, საფარა, ხერთვისი, ბორჯომ-ხარაგაული, ფარავნის ტბა' },
      en: { name: 'Samtskhe-Javakheti', description: 'Vardzia cave city, Rabati fortress, Sapara, Khertvisi, Borjomi-Kharagauli, Paravani Lake' },
      ru: { name: 'Самцхе-Джавахетия', description: 'Пещерный город Вардзиа, крепость Рабати, Сапара, Хертвиси, Боржоми-Харагаули, озеро Паравани' },

      he: { name: 'סאמצחה-גאוואחתי', description: 'עיר המערות ורדזיה, מצודת רבאתי, סאפארה, חרטוויסי, בורג\'ומי-חרגאולי, אגם פאראוואני' }
    }
  },
  {
    id: 'imereti',
    slug: 'imereti',
    image: '/tours/prometheus-cave.jpg',
    translations: {
      ka: { name: 'იმერეთი', description: 'ქუთაისი, გელათი, მოწამეთა, სათაფლია, კაცხის სვეტი, ბზიფი, საწყნური' },
      en: { name: 'Imereti', description: 'Kutaisi, Gelati Monastery, Motsameta, Sataplia, Katskhi Pillar, canyoning, White Bridge' },
      ru: { name: 'Имеретия', description: 'Кутаиси, монастырь Гелати, Моцамета, Сатаплия, столб Кацхи, каньонинг, Белый мост' },

      he: { name: 'אימרתי', description: 'קוטאיסי, מנזר גלתי, מוצאמטה, סטאפליה, עמוד קאצחי, קניונינג, הגשר הלבן' }
    }
  },
  {
    id: 'racha',
    slug: 'racha',
    image: '/tours/racha-lake.jpg',
    translations: {
      ka: { name: 'რაჭა-ლეჩხუმი', description: 'შაორის ტბა, ნიკორწმინდა, ონი, გლოლა, ბარაკონი, შოვი, მწვანე ტბა' },
      en: { name: 'Racha-Lechkhumi', description: 'Shaori Lake, Nikortsminda Church, Oni, Glola, Barakoni, Shovi, Green Lake' },
      ru: { name: 'Рача-Лечхуми', description: 'Озеро Шаори, церковь Никорцминда, Они, Глола, Баракони, Шови, Зеленое озеро' },

      he: { name: 'ראצ\'ה-לצ\'חומי', description: 'אגם שאורי, כנסיית ניקורצמינדה, אוני, גלולה, ברקוני, שובי, האגם הירוק' }
    }
  },
  {
    id: 'guria',
    slug: 'guria',
    image: '/tours/borjomi-park.jpg',
    translations: {
      ka: { name: 'გურია', description: 'ბახმარო, ჩაის პლანტაციები, შეკვეთილი, ურეკი, შავი ზღვა, სუბტროპიკული ბაღი' },
      en: { name: 'Guria', description: 'Bakhmaro highland, tea plantations, Shekvetili, Ureki Black Sea beach, subtropical gardens' },
      ru: { name: 'Гурия', description: 'Нагорье Бахмаро, чайные плантации, Шекветили, пляж Уреки на Черном море, субтропические сады' },

      he: { name: 'גוריה', description: 'רמת בחמרו, מטעי תה, שקווטילי, חוף אורקי, גנים סובטרופיים' }
    }
  },
  {
    id: 'samegrelo',
    slug: 'samegrelo',
    image: '/tours/martvili-canyon.jpg',
    translations: {
      ka: { name: 'სამეგრელო', description: 'დადიანების სასახლე, ფოთი, კოლხეთის ჭარბტენიანი ტერიტორია, ნოქალაქევი, მარტვილი' },
      en: { name: 'Samegrelo', description: 'Dadiani Palace, Poti, Colchis wetlands, Nokalakevi, Martvili, Khobi' },
      ru: { name: 'Самегрело', description: 'Дворец Дадиани, Поти, Колхидские водно-болотные угодья, Нокалакеви, Мартвили, Хоби' },

      he: { name: 'סאמגרלו', description: 'ארמון דאדיאני, פותי, ביצות קולחיס, נוקלקווי, מרטווילי, חובי' }
    }
  },
  {
    id: 'tusheti',
    slug: 'tusheti',
    image: '/tours/tusheti-village.jpg',
    translations: {
      ka: { name: 'თუშეთი', description: 'ომალო, დართლო, შენაყო, აბანოს უღელტეხილი, გომეწრი, დიკლო, ხეობები და კოშკები' },
      en: { name: 'Tusheti', description: 'Omalo, Dartlo, Shenako, Abano Pass, Gometsari, Diklo, medieval villages and towers' },
      ru: { name: 'Тушетия', description: 'Омало, Дартло, Шенаско, перевал Абано, Гомецари, Дикло, средневековые села и башни' },

      he: { name: 'תושטיה', description: 'אומלו, דרטלו, שנאקו, מעבר אבנו, גומצארי, דיקלו, כפרים ומגדלים מימי הביניים' }
    }
  }
];

// Categories data
export const categories = [
  {
    id: 'city',
    icon: 'Building2',
    translations: {
      ka: { name: 'ქალაქური ტურები', description: 'თბილისი, ბათუმი, ქუთაისი — ქალაქური კულტურა, ისტორია, არქიტექტურა' },
      en: { name: 'City Tours', description: 'Tbilisi, Batumi, Kutaisi — urban culture, history, architecture' },
      ru: { name: 'Городские туры', description: 'Тбилиси, Батуми, Кутаиси — городская культура, история, архитектура' },

      he: { name: 'סיורי ערים', description: 'טביליסי, בטומי, קוטאיסי — תרבות עירונית, היסטוריה, אדריכלות' }
    }
  },
  {
    id: 'mountain',
    icon: 'Mountain',
    translations: {
      ka: { name: 'მთის ტურები', description: 'ყაზბეგი, სვანეთი, თუშეთი, რაჭა — მთები, კოშკები, ტბები, ლაშქრობა' },
      en: { name: 'Mountain Tours', description: 'Kazbegi, Svaneti, Tusheti, Racha — mountains, towers, lakes, hiking' },
      ru: { name: 'Горные туры', description: 'Казбеги, Сванетия, Тушетия, Рача — горы, башни, озера, походы' },

      he: { name: 'סיורי הרים', description: 'קאזבגי, סוונטי, תושטיה, ראצה — הרים, מגדלים, אגמים, טיולים רגליים' }
    }
  },
  {
    id: 'wine',
    icon: 'Wine',
    translations: {
      ka: { name: 'ღვინის ტურები', description: 'კახეთი, იმერეთი, რაჭა — ღვინის დეგუსტაცია, მარანი, ვენახები, სუპრა' },
      en: { name: 'Wine Tours', description: 'Kakheti, Imereti, Racha — wine tasting, cellar, vineyards, Supra feast' },
      ru: { name: 'Винные туры', description: 'Кахетия, Имеретия, Рача — дегустация вин, погреб, виноградники, застолье Супра' },

      he: { name: 'סיורי יין', description: 'קאחתי, אימרתי, ראצה — טעימות יין, מרתף, כרמים, סעודת סופרה' }
    }
  },
  {
    id: 'adventure',
    icon: 'Compass',
    translations: {
      ka: { name: 'ექსტრემალური ტურები', description: 'რაფტინგი, პარაპლანი, ATV, ჯიპ-ტურები, ზიპლაინი, კანიონინგი' },
      en: { name: 'Adventure Tours', description: 'Rafting, paragliding, ATV, jeep tours, zipline, canyoning' },
      ru: { name: 'Экстремальные туры', description: 'Рафтинг, парапланеризм, квадроциклы, джип-туры, зиплайн, каньонинг' },

      he: { name: 'סיורי הרפתקאות', description: 'רפטינג, רחיפה, טרקטורונים, סיורי ג\'יפ, זיפליין, קניונינג' }
    }
  },
  {
    id: 'cultural',
    icon: 'Landmark',
    translations: {
      ka: { name: 'კულტურული ტურები', description: 'UNESCO მონასტრები, მუზეუმები, არქეოლოგიური ძეგლები, ტრადიციები' },
      en: { name: 'Cultural Tours', description: 'UNESCO monasteries, museums, archaeological sites, traditions' },
      ru: { name: 'Культурные туры', description: 'Монастыри ЮНЕСКО, музеи, археологические памятники, традиции' },

      he: { name: 'סיורים תרבותיים', description: 'מנזרי אונסק\'ו, מוזיאונים, אתרים ארכיאולוגיים, מסורות' }
    }
  },
  {
    id: 'food',
    icon: 'UtensilsCrossed',
    translations: {
      ka: { name: 'გასტრონომიული ტურები', description: 'სუპრა, ხაჭაპური, ხინკალი, ღვინო, კულინარიული მასტერკლასები' },
      en: { name: 'Food & Cooking Tours', description: 'Supra feast, khachapuri, khinkali, wine, cooking masterclasses' },
      ru: { name: 'Гастрономические туры', description: 'Застолье Супра, хачапури, хинкали, вино, кулинарные мастер-классы' },

      he: { name: 'סיורי אוכל ובישול', description: 'סעודת סופרה, חצ\'אפורי, חינקאלי, יין, סדנאות בישול' }
    }
  },
  {
    id: 'transfer',
    icon: 'Car',
    translations: {
      ka: { name: 'ტრანსფერები', description: 'აეროპორტის ტრანსფერი, ქალაქებს შორის, პრივატი მძღოლი' },
      en: { name: 'Transfers', description: 'Airport transfers, inter-city, private driver services' },
      ru: { name: 'Трансферы', description: 'Трансфер из аэропорта, между городами, частный водитель' },

      he: { name: 'הסעות', description: 'הסעות משדה תעופה, בין ערים, נהג פרטי' }
    }
  },
  {
    id: 'custom',
    icon: 'Settings',
    translations: {
      ka: { name: 'ინდივიდუალური ტურები', description: 'თქვენზე მორგებული ტური — ნებისმიერი მიმართულება, ნებისმიერი ხანგრძლივობა' },
      en: { name: 'Custom Tours', description: 'Tailor-made tours — any destination, any duration, your way' },
      ru: { name: 'Индивидуальные туры', description: 'Туры на заказ — любое направление, любая продолжительность' },

      he: { name: 'סיורים מותאמים אישית', description: 'סיורים בהתאמה אישית — כל יעד, כל משך, בדרך שלך' }
    }
  }
];

export const translations: Record<Language, any> = {
  ka: {
    hero: {
      title: 'აღმოაჩინე საქართველოს საგანძური',
      subtitle: 'ექსკლუზიური ტურები და დაუვიწყარი თავგადასავლები საქართველოს ყველა კუთხეში',
      cta: 'დაჯავშნე ახლავე',
      watchVideo: 'ვიდეოს ნახვა'
    },
    nav: {
      tours: 'ტურები',
      about: 'ჩვენს შესახებ',
      booking: 'დაჯავშნა',
      contact: 'კონტაქტი',
      regions: 'რეგიონები',
      blog: 'ბლოგი',
      customTour: 'ინდივიდუალური ტური'
    },
    sections: {
      popularTours: 'პოპულარული ტურები',
      whyUs: 'რატომ ჩვენ?',
      howToBook: 'როგორ დავჯავშნოთ',
      testimonials: 'რას ამბობენ ტურისტები',
      faq: 'ხშირად დასმული კითხვები',
      exploreRegions: 'აღმოაჩინე რეგიონები',
      tourCategories: 'ტურის კატეგორიები',
      featuredTours: 'რეკომენდებული ტურები'
    },
    about: {
      title: 'რატომ Georgian Treasure?',
      features: [
        { title: 'პროფესიონალი გიდები', desc: 'ჩვენი გიდები საუბრობენ 6 ენაზე და იციან საქართველოს ყველა საიდუმლო კუთხე.' },
        { title: 'პერსონალური გამოცდილება', desc: 'VIP ტურები ან ჯგუფური თავგადასავლები თქვენს რიტმზე მორგებული.' },
        { title: 'საუკეთესო ფასის გარანტია', desc: 'პრემიუმ სერვისი კონკურენტუნარიან ფასებში. ფარული ხარჯების გარეშე.' },
        { title: 'სრული მომსახურება', desc: 'ტრანსფერი, გიდი, სასტუმრო, კვება — ყველაფერი ერთ პაკეტში.' }
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
      instructions: 'დააინსტალირე ჩვენი აპი სწრაფი წვდომისთვის და საქართველოში ოფლაინ დაჯავშნებისთვის!',
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
    },
    regionsPage: {
      title: 'შეარჩიე რეგიონი',
      subtitle: 'საქართველო 12 რეგიონით — თითოეული თავისი უნიკალური კულტურით, ბუნებით და ტრადიციებით'
    },
    toursPage: {
      title: 'ყველა ტური',
      subtitle: '58+ ტური საქართველოს ყველა კუთხიდან',
      filters: 'ფილტრები',
      search: 'მოძებნე ტური...',
      allRegions: 'ყველა რეგიონი',
      allCategories: 'ყველა კატეგორია',
      allDurations: 'ყველა ხანგრძლივობა',
      allDifficulties: 'ყველა სირთულე',
      priceRange: 'ფასის დიაპაზონი',
      groupSize: 'ჯგუფის ზომა',
      duration: 'ხანგრძლივობა',
      difficulty: 'სირთულე',
      priceLowHigh: 'ფასი: ზრდადი',
      priceHighLow: 'ფასი: კლებადი',
      popular: 'პოპულარობა',
      resultsFound: 'ტური მოიძებნა'
    }
  },
  en: {
    hero: {
      title: 'Discover Georgian Treasure',
      subtitle: 'Exclusive tours and unforgettable adventures across all of Georgia',
      cta: 'Book Now',
      watchVideo: 'Watch Video'
    },
    nav: {
      tours: 'Tours',
      about: 'About Us',
      booking: 'Booking',
      contact: 'Contact',
      regions: 'Regions',
      blog: 'Blog',
      customTour: 'Custom Tour'
    },
    sections: {
      popularTours: 'Popular Tours',
      whyUs: 'Why Choose Us?',
      howToBook: 'How to Book',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      exploreRegions: 'Explore Regions',
      tourCategories: 'Tour Categories',
      featuredTours: 'Featured Tours'
    },
    about: {
      title: 'Why Georgian Treasure?',
      features: [
        { title: 'Expert Local Guides', desc: 'Our guides speak 6 languages and know every secret corner of Georgia.' },
        { title: 'Personalized Experience', desc: 'Private VIP tours or group adventures tailored to your rhythm.' },
        { title: 'Best Price Guarantee', desc: 'Premium service at competitive local prices. No hidden fees.' },
        { title: 'Full Service', desc: 'Transfer, guide, hotel, meals — everything in one package.' }
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
      instructions: 'Install our app for faster access and offline bookings in Georgia!',
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
    },
    regionsPage: {
      title: 'Choose a Region',
      subtitle: 'Georgia with 12 regions — each with its unique culture, nature, and traditions'
    },
    toursPage: {
      title: 'All Tours',
      subtitle: '58+ tours from every corner of Georgia',
      filters: 'Filters',
      search: 'Search tours...',
      allRegions: 'All Regions',
      allCategories: 'All Categories',
      allDurations: 'All Durations',
      allDifficulties: 'All Difficulties',
      priceRange: 'Price Range',
      groupSize: 'Group Size',
      duration: 'Duration',
      difficulty: 'Difficulty',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      popular: 'Popular',
      resultsFound: 'tours found'
    }
  },
  ru: {
    hero: {
      title: 'Откройте для себя сокровища Грузии',
      subtitle: 'Эксклюзивные туры и незабываемые приключения по всей Грузии',
      cta: 'Забронировать сейчас',
      watchVideo: 'Смотреть видео'
    },
    nav: {
      tours: 'Туры',
      about: 'О нас',
      booking: 'Бронирование',
      contact: 'Контакт',
      regions: 'Регионы',
      blog: 'Блог',
      customTour: 'Индивидуальный тур'
    },
    sections: {
      popularTours: 'Популярные туры',
      whyUs: 'Почему мы?',
      howToBook: 'Как забронировать',
      testimonials: 'Отзывы',
      faq: 'Часто задаваемые вопросы',
      exploreRegions: 'Исследуйте регионы',
      tourCategories: 'Категории туров',
      featuredTours: 'Рекомендуемые туры'
    },
    about: {
      title: 'Почему Georgian Treasure?',
      features: [
        { title: 'Профессиональные гиды', desc: 'Наши гиды говорят на 6 языках и знают каждый потайной уголок Грузии.' },
        { title: 'Персональный подход', desc: 'VIP-туры или групповые приключения, адаптированные под ваш ритм.' },
        { title: 'Гарантия лучшей цены', desc: 'Премиум сервис по конкурентным ценам. Без скрытых комиссий.' },
        { title: 'Полный сервис', desc: 'Трансфер, гид, отель, питание — всё в одном пакете.' }
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
      instructions: 'Установите наше приложение для быстрого доступа и оффлайн-бронирования в Грузии!',
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
    },
    regionsPage: {
      title: 'Выберите регион',
      subtitle: 'Грузия с 12 регионами — каждый со своей уникальной культурой, природой и традициями'
    },
    toursPage: {
      title: 'Все туры',
      subtitle: '58+ туров из каждого уголка Грузии',
      filters: 'Фильтры',
      search: 'Поиск туров...',
      allRegions: 'Все регионы',
      allCategories: 'Все категории',
      allDurations: 'Все длительности',
      allDifficulties: 'Все сложности',
      priceRange: 'Ценовой диапазон',
      groupSize: 'Размер группы',
      duration: 'Длительность',
      difficulty: 'Сложность',
      priceLowHigh: 'Цена: по возрастанию',
      priceHighLow: 'Цена: по убыванию',
      popular: 'Популярность',
      resultsFound: 'туров найдено'
    }
  },
  he: {
    hero: {
      title: 'גלו את האוצר הגיאורגי',
      subtitle: 'סיורים בלעדיים והרפתקאות בלתי נשכחות בכל רחבי גאורגיה',
      cta: 'הזמן עכשיו',
      watchVideo: 'צפה בווידאו'
    },
    nav: {
      tours: 'סיורים',
      about: 'עלינו',
      booking: 'הזמנה',
      contact: 'צור קשר',
      regions: 'אזורים',
      blog: 'בלוג',
      customTour: 'סיור מותאם אישית'
    },
    sections: {
      popularTours: 'סיורים פופולריים',
      whyUs: 'למה אנחנו?',
      howToBook: 'איך להזמין',
      testimonials: 'המלצות',
      faq: 'שאלות נפוצות',
      exploreRegions: 'גלה אזורים',
      tourCategories: 'קטגוריות סיורים',
      featuredTours: 'סיורים מומלצים'
    },
    about: {
      title: 'למה האוצר הגיאורגי?',
      features: [
        { title: 'מדריכים מקומיים מומחים', desc: 'המדריכים שלנו דוברים 6 שפות ומכירים כל פינה סודית בגאורגיה.' },
        { title: 'חוויה אישית', desc: 'סיורי VIP פרטיים או הרפתקאות קבוצתיות המותאמות לקצב שלך.' },
        { title: 'התחייבות למחיר הטוב ביותר', desc: 'שירות פרימיום במחירים מקומיים תחרותיים. ללא עמלות נסתרות.' },
        { title: 'שירות מלא', desc: 'הסעות, מדריך, מלון, ארוחות — הכל בחבילה אחת.' }
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
      instructions: 'התקן את האפליקציה שלנו לגישה מהירה יותר והזמנות לא מקוונות בגאורגיה!',
      addToHomeScreen: 'הוסף למסך הבית'
    },
    contact: {
      title: 'צור קשר',
      phone: 'טלפון / WhatsApp',
      address: 'כתובת',
      addressValue: 'בטומי, אג\'ארה, גאורגיה'
    },
    footer: {
      allRights: 'כל הזכויות שמורות.',
      chat: 'דבר עם גיורגי'
    },
    regionsPage: {
      title: 'בחר אזור',
      subtitle: 'גאורגיה עם 12 אזורים — כל אחד עם תרבותו, טבעו ומסורותיו הייחודיים'
    },
    toursPage: {
      title: 'כל הסיורים',
      subtitle: '58+ סיורים מכל פינה של גאורגיה',
      filters: 'מסננים',
      search: 'חפש סיורים...',
      allRegions: 'כל האזורים',
      allCategories: 'כל הקטגוריות',
      allDurations: 'כל משכי הזמן',
      allDifficulties: 'כל רמות הקושי',
      priceRange: 'טווח מחירים',
      groupSize: 'גודל קבוצה',
      duration: 'משך',
      difficulty: 'רמת קושי',
      priceLowHigh: 'מחיר: מהנמוך לגבוה',
      priceHighLow: 'מחיר: מהגבוה לנמוך',
      popular: 'פופולריות',
      resultsFound: 'סיורים נמצאו'
    }
  }
};
