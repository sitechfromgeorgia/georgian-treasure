import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic, Noto_Sans_Hebrew, Noto_Sans_Georgian } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ChatbotWrapper } from '@/components/ui/ChatbotWrapper';
import { SiteSchemas } from '@/components/seo/StructuredData';
import { SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-noto-georgian',
  weight: ['400', '700'],
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-noto-hebrew',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Georgian Treasure - Premium Georgia Tours & Travel Experiences',
    template: '%s | Georgian Treasure',
  },
  description:
    'Discover Georgia with Georgian Treasure - the leading tour operator for private tours, wine experiences, adventure activities, and cultural journeys across Georgia. Explore Tbilisi, Kazbegi, Svaneti, Batumi, and Kakheti with expert local guides.',
  manifest: '/manifest.json',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ka': '/ka',
      'ru': '/ru',
      'uk': '/uk',
      'ar': '/ar',
      'he': '/he',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  openGraph: {
    title: 'Georgian Treasure - Premium Georgia Tours & Travel Experiences',
    description:
      'Discover Georgia with expert local guides. Private tours, wine experiences, adventure activities, and cultural journeys across Tbilisi, Kazbegi, Svaneti, Batumi, and Kakheti.',
    url: SITE_URL,
    siteName: 'Georgian Treasure',
    images: [
      {
        url: '/tours/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Georgian Treasure - Premium Georgia Tours',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@georgiantreasure',
    creator: '@georgiantreasure',
    title: 'Georgian Treasure - Premium Georgia Tours & Travel Experiences',
    description:
      'Discover Georgia with expert local guides. Private tours, wine experiences, adventure activities, and cultural journeys.',
    images: ['/tours/hero.jpg'],
  },
  keywords: [
    'Georgia tours',
    'Georgia travel',
    'Tbilisi tours',
    'Kazbegi tours',
    'Svaneti travel',
    'Batumi excursions',
    'Kakheti wine tours',
    'Georgia private tours',
    'Georgia tour operator',
    'Caucasus travel',
    'Georgia adventure tours',
    'Georgian wine tasting',
    'Georgia cultural tours',
    'Georgia hiking tours',
    'Georgia family tours',
    'Georgia budget travel',
    'Georgia itinerary',
    'things to do in Georgia',
    'best time to visit Georgia',
    'Georgia travel guide',
  ],
  authors: [{ name: 'Georgian Treasure' }],
  category: 'travel',
  classification: 'Travel & Tourism',
  other: {
    'geo.region': 'GE',
    'geo.placename': 'Batumi',
    'geo.position': '41.6168;41.6367',
    'ICBM': '41.6168, 41.6367',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="GE" />
        <meta name="geo.placename" content="Batumi" />
        <meta name="geo.position" content="41.6168;41.6367" />
        <meta name="ICBM" content="41.6168, 41.6367" />
      </head>
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${notoArabic.variable} ${notoHebrew.variable} font-inter antialiased bg-white dark:bg-zinc-950 transition-colors duration-500`}
      >
        <LanguageProvider>
          <ThemeProvider>
            <SiteSchemas />
            {children}
            <ChatbotWrapper />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
