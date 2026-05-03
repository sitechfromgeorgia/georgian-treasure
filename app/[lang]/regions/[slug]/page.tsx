import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/content';
import { extendedTours } from '@/data/extended-tours';
import { RegionDetailClient, RegionDetails } from '@/components/tours/RegionDetailClient';

const supportedLocales = ['ka', 'en', 'ru', 'he'];

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const locale of supportedLocales) {
    for (const region of regions) {
      params.push({ lang: locale, slug: region.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;

  const region = regions.find((r) => r.slug === slug);
  if (!region) {
    return { title: 'Region Not Found | Georgian Treasure' };
  }

  const tr = region.translations[lang as keyof typeof region.translations] || region.translations.en;

  const title = `${tr.name} | Georgian Treasure - ${tr.name} Tours & Travel Guide`;
  const description = tr.description;

  const keywords = [
    `${tr.name} tours`,
    `${tr.name} travel`,
    `${tr.name} Georgia`,
    `${slug} region`,
    'Georgian Treasure',
    'Georgia travel',
    `${tr.name} attractions`,
    `${tr.name} guide`,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: region.image, width: 1200, height: 630, alt: tr.name }],
      type: 'article',
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [region.image],
    },
    alternates: {
      canonical: `/${lang}/regions/${slug}`,
      languages: Object.fromEntries(
        supportedLocales.map((l) => [l, `/${l}/regions/${slug}`])
      ),
    },
  };
}

// Region details content
const regionDetailsMap: Record<string, RegionDetails> = {
  adjara: {
    about: 'Adjara is a stunning coastal region on the Black Sea, famous for its subtropical climate, beautiful beaches, and lush mountainous hinterland. Batumi, the capital, is a vibrant modern city with world-class architecture, while the highlands offer pristine nature, ancient bridges, and traditional village life. The region combines seaside relaxation with adventurous mountain exploration.',
    facts: [
      'Batumi Boulevard stretches for 7 kilometers along the coastline',
      'The Botanical Garden covers 111 hectares with over 5,000 plant species',
      'Gonio Fortress dates back over 2,000 years to Roman times',
      'Adjara has both subtropical coastal zones and alpine meadows above 2,000m',
      'The region produces excellent tea and citrus fruits',
    ],
    bestTime: 'May to October for the coast; June to September for the highlands. July and August are peak beach season. September offers warm seas and fewer crowds.',
    attractions: [
      { name: 'Batumi Boulevard', desc: 'A 7km seaside promenade with gardens, sculptures, and cafes' },
      { name: 'Botanical Garden', desc: "One of the world's largest botanical gardens with 5,000+ species" },
      { name: 'Gonio Fortress', desc: 'Ancient Roman fortress on the Black Sea coast' },
      { name: 'Makhuntseti Waterfall', desc: 'Beautiful 30m waterfall with a medieval stone bridge' },
      { name: 'Mtirala National Park', desc: 'Tropical rainforest with hiking trails and waterfalls' },
      { name: 'Green Lake', desc: 'Alpine lake at 2,000m in the Adjara highlands' },
    ],
  },
  tbilisi: {
    about: "Tbilisi, the capital of Georgia, is a city of contrasts where ancient history meets bold modern architecture. Founded in the 5th century around natural hot springs, today it offers sulfur baths, a picturesque Old Town, world-class restaurants, and a vibrant arts scene. The surrounding region includes the ancient capital Mtskheta, a UNESCO World Heritage site.",
    facts: [
      'Tbilisi was founded in the 5th century by King Vakhtang Gorgasali',
      'The city has natural sulfur baths that have operated for centuries',
      "Tbilisi's name comes from the Georgian word for 'warm' (tbili)",
      "The Old Town features a mix of Persian, Arabic, and European architecture",
      "Mtskheta, just 20km away, was Georgia's capital for 1,000 years",
    ],
    bestTime: 'April to June and September to November offer the best weather. Spring brings blossoms and comfortable temperatures, while autumn offers golden foliage and harvest festivals.',
    attractions: [
      { name: 'Narikala Fortress', desc: '4th-century fortress overlooking the Old Town' },
      { name: 'Abanotubani', desc: 'Historic sulfur bath district in the Old Town' },
      { name: 'Svetitskhoveli Cathedral', desc: 'UNESCO-listed 11th-century cathedral in Mtskheta' },
      { name: 'Jvari Monastery', desc: '6th-century monastery with panoramic views' },
      { name: 'Chronicle of Georgia', desc: 'Massive monument with biblical and historical scenes' },
      { name: 'Rustaveli Avenue', desc: 'The main boulevard with theaters, museums, and cafes' },
    ],
  },
  kakheti: {
    about: 'Kakheti is Georgia\'s premier wine region and the birthplace of winemaking, with an 8,000-year tradition. The landscape of rolling hills, vineyards, and the snow-capped Caucasus Mountains creates one of the most scenic regions in Georgia. The charming town of Sighnaghi, known as the "City of Love," offers stunning views over the Alazani Valley.',
    facts: [
      'Georgia is the birthplace of wine, with 8,000 years of winemaking history',
      'There are over 525 indigenous grape varieties in Georgia',
      'The qvevri winemaking method is a UNESCO Intangible Heritage',
      'Kakheti produces about 70% of Georgia\'s grapes',
      'Sighnaghi has a 4km defensive wall with 28 towers',
    ],
    bestTime: 'September to October for the Rtveli grape harvest - the most exciting time to visit. May to June offers beautiful vineyard landscapes with fewer crowds.',
    attractions: [
      { name: 'Sighnaghi', desc: 'Charming hilltop town known as the City of Love' },
      { name: 'Telavi', desc: 'Historic capital of Kakheti with a royal palace' },
      { name: 'Tsinandali Estate', desc: 'Historic winery with beautiful gardens' },
      { name: 'Alaverdi Monastery', desc: '11th-century monastery with its own winery' },
      { name: 'David Gareja', desc: '6th-century cave monastery complex on the Azerbaijan border' },
      { name: 'Kvareli Lake', desc: 'Beautiful lake surrounded by wineries' },
    ],
  },
  kazbegi: {
    about: "Kazbegi (officially Stepantsminda) is home to the iconic Gergeti Trinity Church, perched at 2,170 meters beneath the mighty Mount Kazbek (5,047m). The region offers some of the most dramatic alpine scenery in the Caucasus, accessible via the legendary Georgian Military Highway. Gudauri, Georgia's premier ski resort, is nearby.",
    facts: [
      "Mount Kazbek is Georgia's third-highest peak at 5,047m",
      'Gergeti Trinity Church is one of the most photographed sites in the Caucasus',
      'The Georgian Military Highway was built by the Russians in the 19th century',
      'Kazbegi is the setting for the Greek myth of Prometheus',
      'The region has over 20 trekking routes of varying difficulty',
    ],
    bestTime: 'June to September for trekking and hiking. December to March for skiing in nearby Gudauri. October offers stunning autumn colors.',
    attractions: [
      { name: 'Gergeti Trinity Church', desc: 'Iconic 14th-century church at 2,170m beneath Mount Kazbek' },
      { name: 'Gergeti Glacier', desc: 'Challenging full-day trek to the glacier' },
      { name: 'Juta Valley', desc: 'Beautiful alpine valley known as the Dolomites of Georgia' },
      { name: 'Gudauri Ski Resort', desc: "Georgia's premier ski resort with modern lifts" },
      { name: 'Ananuri Fortress', desc: 'Stunning fortress complex on the Military Highway' },
      { name: 'Truso Valley', desc: 'Remote valley with mineral springs and abandoned villages' },
    ],
  },
  svaneti: {
    about: 'Svaneti is a remote mountain region famous for its medieval defensive towers, stunning alpine scenery, and unique cultural heritage. Upper Svaneti, including Ushguli (the highest inhabited village in Europe), is a UNESCO World Heritage site. The region offers some of the best trekking in the Caucasus.',
    facts: [
      'Svaneti has over 175 medieval defensive towers still standing',
      'Ushguli at 2,100m is the highest continuously inhabited settlement in Europe',
      'The Svan language is one of four Kartvelian languages and has no written form',
      'Svaneti was never conquered by invaders due to its remote location',
      "Mount Shkhara at 5,193m is Georgia's highest peak",
    ],
    bestTime: 'July to September for trekking. December to March for skiing. June offers wildflowers and fewer crowds.',
    attractions: [
      { name: 'Ushguli', desc: 'UNESCO-listed medieval village with iconic towers' },
      { name: 'Mestia', desc: 'Regional center with a historic museum and airport' },
      { name: 'Koruldi Lakes', desc: 'Stunning alpine lakes above Mestia' },
      { name: 'Shkhara Glacier', desc: 'Trek to the foot of Georgia\'s highest peak' },
      { name: 'Hatsvali Ski Resort', desc: 'Modern ski resort with cable car from Mestia' },
      { name: 'Latali Church', desc: 'Historic church with medieval frescoes' },
    ],
  },
  west: {
    about: "Western Georgia encompasses several regions along the Black Sea coast and inland areas, known for their subtropical climate, stunning canyons, cave systems, and historic cities. From the dramatic Martvili Canyon to the vast Prometheus Cave, this region showcases nature at its most spectacular.",
    facts: [
      'Martvili Canyon features stunning turquoise waters and waterfalls',
      'Prometheus Cave has 6 underground halls with spectacular formations',
      'Okatse Canyon has a 700m hanging walkway over the canyon',
      'Kinchkha Waterfall is one of Georgia\'s highest at 70m',
      'The region has a humid subtropical climate with abundant rainfall',
    ],
    bestTime: 'May to October. Spring brings lush greenery and full waterfalls. Summer offers the best weather for swimming. September has warm water and fewer tourists.',
    attractions: [
      { name: 'Martvili Canyon', desc: 'Stunning canyon with boat rides on turquoise water' },
      { name: 'Prometheus Cave', desc: 'Vast cave system with underground lakes and formations' },
      { name: 'Okatse Canyon', desc: 'Dramatic canyon with a hanging walkway' },
      { name: 'Kinchkha Waterfall', desc: 'One of Georgia\'s most impressive waterfalls' },
      { name: 'Dadiani Palace', desc: '19th-century palace of the noble Dadiani family' },
      { name: 'Ureki Beach', desc: 'Unique magnetic sand beach with healing properties' },
    ],
  },
  samtskhe: {
    about: 'Samtskhe-Javakheti is a region of dramatic contrasts, from the cave city of Vardzia to the stunning Rabati Fortress in Akhaltsikhe. The region sits at the crossroads of cultures, with influences from Georgia, Turkey, and Armenia. Borjomi, famous for its mineral water, is nestled in beautiful pine forests.',
    facts: [
      'Vardzia is a 12th-century cave city with over 6,000 caves',
      'Rabati Fortress was originally built in the 9th century',
      'Borjomi mineral water has been famous since the 19th century',
      'The region sits at the intersection of three tectonic plates',
      'Paravani Lake at 2,073m is Georgia\'s largest lake',
    ],
    bestTime: 'May to October. Summer offers the best weather for exploring Vardzia. Autumn brings beautiful colors. Winter is great for Borjomi\'s spa resorts.',
    attractions: [
      { name: 'Vardzia Cave City', desc: 'Extraordinary 12th-century cave monastery complex' },
      { name: 'Rabati Fortress', desc: 'Beautifully restored fortress in Akhaltsikhe' },
      { name: 'Borjomi Central Park', desc: 'Historic park where Borjomi water was first discovered' },
      { name: 'Sapara Monastery', desc: '10th-century monastery in a dramatic cliff setting' },
      { name: 'Paravani Lake', desc: "Georgia's largest lake, popular for fishing" },
      { name: 'Khertvisi Fortress', desc: "One of Georgia's oldest fortresses" },
    ],
  },
  imereti: {
    about: "Imereti is the historic heartland of western Georgia, home to the country's second-largest city Kutaisi, the stunning Gelati Monastery (a UNESCO World Heritage site), and the fascinating Sataplia Nature Reserve with dinosaur footprints.",
    facts: [
      'Kutaisi is one of the oldest continuously inhabited cities in the world',
      'Gelati Monastery is a UNESCO World Heritage site founded in 1106',
      'Sataplia Reserve has real dinosaur footprints from the Cretaceous period',
      'The region produces excellent Imeretian-style wine',
      'Katskhi Pillar has a tiny church atop a 40m limestone monolith',
    ],
    bestTime: 'April to October. Spring is beautiful and uncrowded. Summer is warm and lively. September offers harvest season activities.',
    attractions: [
      { name: 'Gelati Monastery', desc: 'UNESCO-listed 12th-century monastery complex' },
      { name: 'Sataplia Nature Reserve', desc: 'Nature reserve with dinosaur footprints and a cave' },
      { name: 'Prometheus Cave', desc: "One of Georgia's largest caves with underground lakes" },
      { name: 'Katskhi Pillar', desc: '40m limestone pillar with a tiny church on top' },
      { name: 'Motsameta Monastery', desc: 'Beautiful monastery on a cliff above a river canyon' },
      { name: 'Kutaisi Green Bazaar', desc: 'Vibrant traditional market with local produce' },
    ],
  },
  racha: {
    about: 'Racha-Lechkhumi is one of Georgia\'s most beautiful and least-visited regions, often called "Georgian Switzerland." With its pristine alpine lakes, medieval churches, and lush forests, Racha offers an authentic, off-the-beaten-path experience.',
    facts: [
      'Lake Shaori is one of Georgia\'s most beautiful alpine lakes',
      'Racha produces the famous naturally semi-sweet wine Khvanchkara',
      'Nikortsminda Church has some of Georgia\'s finest exterior carvings',
      'The region receives heavy snowfall and is remote year-round',
      'Racha has some of the best-preserved medieval churches in Georgia',
    ],
    bestTime: 'June to September for hiking and sightseeing. October offers stunning autumn colors. Winter is extremely snowy and access is difficult.',
    attractions: [
      { name: 'Lake Shaori', desc: 'Stunning alpine lake surrounded by forests' },
      { name: 'Nikortsminda Church', desc: '11th-century church with exquisite carvings' },
      { name: 'Barakoni Church', desc: 'Beautiful church on a hill overlooking a river' },
      { name: 'Shovi Resort', desc: 'Historic mountain resort in a beautiful valley' },
      { name: 'Green Lake', desc: 'Pristine alpine lake in the mountains' },
      { name: 'Oni Museum', desc: 'Local history museum in the regional center' },
    ],
  },
  guria: {
    about: 'Guria is a small but charming region on the Black Sea coast, famous for its tea plantations, the mountain resort of Bakhmaro, and the unique magnetic sand beaches of Ureki.',
    facts: [
      'Guria is one of Georgia\'s main tea-producing regions',
      'Bakhmaro at 2,000m is known as the "sea in the mountains" due to its cloud cover',
      'Ureki Beach has unique magnetic sand believed to have healing properties',
      'Gurians are famous throughout Georgia for their wit and humor',
      'The region has a humid subtropical climate perfect for tea and citrus',
    ],
    bestTime: 'June to September for beaches and mountain resorts. September for tea harvest. Avoid winter when mountain roads can be difficult.',
    attractions: [
      { name: 'Ureki Beach', desc: 'Black Sea beach with unique magnetic sand' },
      { name: 'Bakhmaro Resort', desc: 'Mountain resort famous for its sea of clouds' },
      { name: 'Shekvetili Dendrological Park', desc: 'Beautiful park with sculptures and a miniature town' },
      { name: 'Tea Plantations', desc: 'Lush green tea fields in the subtropical climate' },
      { name: 'Gomi Mountain', desc: 'Beautiful mountain with panoramic views' },
      { name: 'Ozurgeti History Museum', desc: 'Regional museum with archaeological finds' },
    ],
  },
  samegrelo: {
    about: 'Samegrelo (Mingrelia) is a historic region in western Georgia known for its beautiful wetlands, the elegant Dadiani Palace in Zugdidi, and a distinctive cuisine that is famously spicy.',
    facts: [
      'The Dadiani Palace houses a Napoleon death mask and a Chinese garden',
      'Samegrelo is famous for its spicy cuisine, especially ajika',
      'The Colchis wetlands are a biodiversity hotspot with unique flora',
      'The region has its own distinct Mingrelian language',
      'Poti, on the coast, is one of Georgia\'s oldest cities and main ports',
    ],
    bestTime: 'May to October. Spring is lush and green. Summer offers the best beach weather. September is ideal for sightseeing with mild temperatures.',
    attractions: [
      { name: 'Dadiani Palace', desc: 'Historic palace with a museum and beautiful gardens' },
      { name: 'Nokalakevi', desc: 'Ancient archaeological site with fortress ruins' },
      { name: 'Martvili Canyon', desc: 'Beautiful canyon with boat trips on turquoise water' },
      { name: 'Khobi Monastery', desc: 'Historic monastery with medieval frescoes' },
      { name: 'Colchis Wetlands', desc: 'UNESCO-listed biodiversity hotspot' },
      { name: 'Poti Cathedral', desc: "One of Georgia's largest Orthodox churches" },
    ],
  },
  tusheti: {
    about: 'Tusheti is Georgia\'s most remote and pristine mountain region, accessible only via one of the world\'s most dangerous roads across the Abano Pass (2,850m). With its ancient stone towers, pristine alpine villages, and dramatic mountain scenery, Tusheti offers an unforgettable wilderness experience.',
    facts: [
      'Tusheti is accessible only from June to October via the Abano Pass',
      'The region has only about 50 permanent residents year-round',
      'Tusheti is a protected area with strict conservation regulations',
      'The Tush people have their own distinct traditions and dialect',
      'The Atsunta Pass trek to Khevsureti is one of Georgia\'s best multi-day hikes',
    ],
    bestTime: 'July to September - the only months when the road is reliably open. July and August offer the best weather for trekking.',
    attractions: [
      { name: 'Omalo', desc: 'The main village with the iconic Keselo towers' },
      { name: 'Dartlo', desc: 'Beautiful village known for its traditional architecture' },
      { name: 'Abano Pass', desc: 'Spectacular mountain pass at 2,850m' },
      { name: 'Shenako', desc: 'Charming village with a traditional church' },
      { name: 'Diklo', desc: 'Remote village near the Dagestan border' },
      { name: 'Gometsari Gorge', desc: 'Wild, pristine valley with scattered villages' },
    ],
  },
};

export default async function RegionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const isRTL = lang === 'he';

  const region = regions.find((r) => r.slug === slug);
  const details = regionDetailsMap[slug];

  if (!region || !details) {
    notFound();
  }

  const regionTr = region.translations[lang as keyof typeof region.translations] || region.translations.en;

  // Filter tours for this region
  const regionTours = extendedTours.filter((t) => t.region === slug);

  // Get related regions (excluding current)
  const relatedRegions = regions.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <main
      className="min-h-screen bg-[#001F3F]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <RegionDetailClient
        region={region}
        regionTr={regionTr}
        details={details}
        regionTours={regionTours}
        relatedRegions={relatedRegions}
        lang={lang}
        isRTL={isRTL}
      />
    </main>
  );
}