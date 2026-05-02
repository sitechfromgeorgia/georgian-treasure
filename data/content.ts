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
      uk: { name: 'Батумі та Аджарія', description: 'Чорноморське узбережжя, ботанічний сад, фортеця Гоніо, водоспад Махунцеті, нац. парк Мтірала' },
      ar: { name: 'باتومي وأجاريا', description: 'شاطئ البحر الأسود، الحديقة النباتية، قلعة غونيو، شلال ماخونتسيتي، منتزه متيرالا الوطني' },
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
      uk: { name: 'Тбілісі та Мцхета', description: 'Старий Тбілісі, Нарікала, сірчані лазні, Мцхета-Джварі-Светіцховелі, Хроніка Грузії' },
      ar: { name: 'تبليسي ومتسخيتا', description: 'تبليسي القديمة، ناريكالا، الحمامات الكبريتية، متسخيتا-جفاري-سفيتيتسخوفيلي، تواريخ جورجيا' },
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
      uk: { name: 'Кахетія', description: 'Винний регіон, Сігнахі, Телаві, Цинандалі, збір винограду Ртвелі, свято Супра, винний льох' },
      ar: { name: 'كاخيتي', description: 'منطقة النبيذ، سيغناغي، تيلافي، تسيناندالي، حصاد رتفيلي، وليمة سوبرا، قبو النبيذ التقليدي' },
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
      uk: { name: 'Казбегі та Гудаурі', description: 'Гергетська Трійця, Військово-Грузинська дорога, гірськолижний курорт Гудаурі, парапланеризм, квадроцикли' },
      ar: { name: 'كازبيجي وغوداوري', description: 'الثالوث الغرجيتي، الطريق العسكري، منتجع التزلج غوداوري، الطيران الشراعي، ATV' },
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
      uk: { name: 'Сванетія', description: 'Ушгулі, Местіа, середньовічні вежі, льодовик Шхара, озера Корулді, Тлещі, Латпарі' },
      ar: { name: 'سفانيتي', description: 'أوشغولي، ميستيا، الأبراج القرون الوسطى، نهر شخارا، بحيرات كورولدي' },
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
      uk: { name: 'Західна Грузія', description: 'Каньйон Мартвілі, печера Прометея, каньйон Окаце, водоспад Кінчха, палац Дадіані' },
      ar: { name: 'غرب جورجيا', description: 'كانيون مارتفيلي، كهف بروميثيوس، كانيون أوكاتسي، شلال كينشخا، قصر دادياني' },
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
      uk: { name: 'Самцхе-Джавахеті', description: 'Печерне місто Вардзіа, фортеця Рабаті, Сапара, Хертвісі, Боржомі-Харагаулі, озеро Паравані' },
      ar: { name: 'سامتسخه-جافاخيتي', description: 'مدينة كهوف فاردزيا، قلعة راباتي، سابارا، خيرتفيسي، بورجومي-خاراغاولي، بحيرة بارافاني' },
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
      uk: { name: 'Імеретія', description: 'Кутаїсі, монастир Гелаті, Моцамета, Сатаплія, стовп Кацхі, каньйонінг, Білий міст' },
      ar: { name: 'إيميريتي', description: 'كوتايسي، دير غيلاتي، موتساميتا، ساتابليا، عمود كاتشخي، كانيونينغ' },
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
      uk: { name: 'Рача-Лечхумі', description: 'Озеро Шаорі, церква Нікорцмінда, Оні, Глола, Бараконі, Шові, Зелене озеро' },
      ar: { name: 'راتشا-ليتشخومي', description: 'بحيرة شاوري، كنيسة نيكورتسميندا، أوني، جلولا، باراكوني، شوفي، البحيرة الخضراء' },
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
      uk: { name: 'Гурія', description: 'Наґір\'я Бахмаро, чайні плантації, Шекветілі, пляж Урекі на Чорному морі, субтропічні сади' },
      ar: { name: 'جوريا', description: 'مرتفعات باخمارو، مزارع الشاي، شيفيتيلي، شاطئ أوريكي، الحدائق شبه الاستوائية' },
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
      uk: { name: 'Самегрело', description: 'Палац Дадіані, Поті, Колхідські водно-болотні угіддя, Нокалакеві, Мартвілі, Хобі' },
      ar: { name: 'ساميغريلو', description: 'قصر دادياني، بوتي، أراضي كولخيس الرطبة، نوكالاكيفي، مارتفيلي' },
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
      uk: { name: 'Тушетія', description: 'Омало, Дартло, Шенако, перевал Абано, Гомецарі, Дікло, середньовічні села і вежі' },
      ar: { name: 'توشيتي', description: 'أومالو، دارتلو، شيناكو، ممر أبانو، قوميتساري، ديكلو، القرون الوسطى' },
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
      uk: { name: 'Міські тури', description: 'Тбілісі, Батумі, Кутаїсі — міська культура, історія, архітектура' },
      ar: { name: 'جولات المدينة', description: 'تبليسي، باتومي، كوتايسي — الثقافة الحضرية، التاريخ، العمارة' },
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
      uk: { name: 'Гірські тури', description: 'Казбегі, Сванетія, Тушетія, Рача — гори, вежі, озера, пішохідні тури' },
      ar: { name: 'جولات الجبال', description: 'كازبيجي، سفانيتي، توشيتي، راتشا — جبال، أبراج، بحيرات، مشي' },
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
      uk: { name: 'Винні тури', description: 'Кахетія, Імеретія, Рача — дегустація вин, льох, виноградники, свято Супра' },
      ar: { name: 'جولات النبيذ', description: 'كاخيتي، إيميريتي، راتشا — تذوق النبيذ، قبو الكرمة، وليمة سوبرا' },
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
      uk: { name: 'Екстремальні тури', description: 'Рафтинг, парапланеризм, квадроцикли, джип-тури, зіплайн, каньйонінг' },
      ar: { name: 'جولات المغامرة', description: 'الرافتينغ، الطيران الشراعي، ATV، جولات الجيب، زيبلاين، كانيونينغ' },
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
      uk: { name: 'Культурні тури', description: 'Монастирі ЮНЕСКО, музеї, археологічні пам\'ятки, традиції' },
      ar: { name: 'جولات ثقافية', description: 'أديرة اليونسكو، المتاحف، المواقع الأثرية، التقاليد' },
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
      uk: { name: 'Гастрономічні тури', description: 'Свято Супра, хачапурі, хінкалі, вино, кулінарні майстер-класи' },
      ar: { name: 'جولات الطعام والطبخ', description: 'وليمة سوبرا، خاتشابوري، خينكالي، نبيذ، دروس الطبخ' },
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
      uk: { name: 'Трансфери', description: 'Трансфер з аеропорту, між містами, приватний водій' },
      ar: { name: 'النقل', description: 'نقل المطار، بين المدن، سائق خاص' },
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
      uk: { name: 'Індивідуальні тури', description: 'Тури на замовлення — будь-який напрямок, будь-яка тривалість' },
      ar: { name: 'جولات مخصصة', description: 'جولات مخصصة — أي وجهة، أي مدة، بطريقتك' },
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
  uk: {
    hero: {
      title: 'Відкрийте для себе скарби Грузії',
      subtitle: 'Ексклюзивні тури та незабутні пригоди по всій Грузії',
      cta: 'Забронювати зараз',
      watchVideo: 'Дивитися відео'
    },
    nav: {
      tours: 'Тури',
      about: 'Про нас',
      booking: 'Бронювання',
      contact: 'Контакт',
      regions: 'Регіони',
      blog: 'Блог',
      customTour: 'Індивідуальний тур'
    },
    sections: {
      popularTours: 'Популярні тури',
      whyUs: 'Чому ми?',
      howToBook: 'Як забронювать',
      testimonials: 'Відгуки',
      faq: 'Часті запитання',
      exploreRegions: 'Досліджуйте регіони',
      tourCategories: 'Категорії турів',
      featuredTours: 'Рекомендовані тури'
    },
    about: {
      title: 'Чому Georgian Treasure?',
      features: [
        { title: 'Професійні гіди', desc: 'Наші гіди розмовляють 6 мовами та знають кожен потаємний куточок Грузії.' },
        { title: 'Персональний підхід', desc: 'VIP-тури або групові пригоди, адаптовані під ваш ритм.' },
        { title: 'Гарантія найкращої ціни', desc: 'Преміум сервіс за конкурентними цінами. Без прихованих комісій.' },
        { title: 'Повний сервіс', desc: 'Трансфер, гід, готель, харчування — все в одному пакеті.' }
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
      instructions: 'Встановіть наш додаток для швидкого доступу та офлайн-бронювання в Грузії!',
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
    },
    regionsPage: {
      title: 'Оберіть регіон',
      subtitle: 'Грузія з 12 регіонами — кожен зі своєю унікальною культурою, природою та традиціями'
    },
    toursPage: {
      title: 'Всі тури',
      subtitle: '58+ турів з кожного куточка Грузії',
      filters: 'Фільтри',
      search: 'Пошук турів...',
      allRegions: 'Всі регіони',
      allCategories: 'Всі категорії',
      allDurations: 'Всі тривалості',
      allDifficulties: 'Всі складності',
      priceRange: 'Ціновий діапазон',
      groupSize: 'Розмір групи',
      duration: 'Тривалість',
      difficulty: 'Складність',
      priceLowHigh: 'Ціна: за зростанням',
      priceHighLow: 'Ціна: за спаданням',
      popular: 'Популярність',
      resultsFound: 'турів знайдено'
    }
  },
  ar: {
    hero: {
      title: 'اكتشف الكنز الجورجي',
      subtitle: 'جولات حصرية ومغامرات لا تنسى في جميع أنحاء جورجيا',
      cta: 'احجز الآن',
      watchVideo: 'شاهد الفيديو'
    },
    nav: {
      tours: 'جولات',
      about: 'معلومات عنا',
      booking: 'حجز',
      contact: 'اتصال',
      regions: 'المناطق',
      blog: 'مدونة',
      customTour: 'جولة مخصصة'
    },
    sections: {
      popularTours: 'الجولات الشهيرة',
      whyUs: 'لماذا نحن؟',
      howToBook: 'كيفية الحجز',
      testimonials: 'اراء السياح',
      faq: 'الأسئلة الشائعة',
      exploreRegions: 'استكشف المناطق',
      tourCategories: 'فئات الجولات',
      featuredTours: 'جولات مميزة'
    },
    about: {
      title: 'لماذا الكنز الجورجي؟',
      features: [
        { title: 'أدلة محليون خبراء', desc: 'يتحدث أدلاؤنا 6 لغات ويعرفون كل زاوية سرية في جورجيا.' },
        { title: 'تجربة شخصية', desc: 'جولات VIP خاصة أو مغامرات جماعية مصممة حسب إيقاعك.' },
        { title: 'ضمان أفضل الأسعار', desc: 'خدمة متميزة بأسعار محلية تنافسية. لا توجد رسوم خفية.' },
        { title: 'خدمة كاملة', desc: 'نقل، مرشد، فندق، وجبات — كل شيء في حزمة واحدة.' }
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
      instructions: 'قم بتثبيت تطبيقنا للوصول السريع والحجز دون اتصال في جورجيا!',
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
    },
    regionsPage: {
      title: 'اختر منطقة',
      subtitle: 'جورجيا بـ 12 منطقة — كل منطقة بثقافتها وطبيعتها وتقاليدها الفريدة'
    },
    toursPage: {
      title: 'جميع الجولات',
      subtitle: '58+ جولة من كل زاوية من جورجيا',
      filters: 'الفلاتر',
      search: 'البحث في الجولات...',
      allRegions: 'جميع المناطق',
      allCategories: 'جميع الفئات',
      allDurations: 'جميع المدد',
      allDifficulties: 'جميع المستويات',
      priceRange: 'نطاق السعر',
      groupSize: 'حجم المجموعة',
      duration: 'المدة',
      difficulty: 'المستوى',
      priceLowHigh: 'السعر: من الأقل للأعلى',
      priceHighLow: 'السعر: من الأعلى للأقل',
      popular: 'الشعبية',
      resultsFound: 'جولة تم العثور عليها'
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
