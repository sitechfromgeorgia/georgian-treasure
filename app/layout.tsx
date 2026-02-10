import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Noto_Sans_Hebrew } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const firaGO = localFont({
  src: [
    { path: '../public/fonts/FiraGO-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/FiraGO-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/FiraGO-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/FiraGO-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-fira-go',
  display: 'swap',
});
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic" });
const notoHebrew = Noto_Sans_Hebrew({ subsets: ["hebrew"], variable: "--font-noto-hebrew" });

export const metadata: Metadata = {
  title: "Georgian Treasure - Batumi Tours & Excursions",
  description: "Premium tour service in Batumi, Georgia. Discover the beauty of Adjara with professional guides.",
  manifest: "/manifest.json",
  themeColor: "#001F3F",
  openGraph: {
    title: "Georgian Treasure - Batumi Tours & Excursions",
    description: "Premium tour service in Batumi, Georgia. Discover the beauty of Adjara with professional guides.",
    url: "https://georgiantreasure.ge",
    siteName: "Georgian Treasure",
    images: [
      {
        url: "/images/batumi/night-beach.jpg",
        width: 1200,
        height: 630,
        alt: "Batumi, Georgia",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Georgian Treasure - Batumi Tours & Excursions",
    description: "Premium tour service in Batumi, Georgia. Discover the beauty of Adjara with professional guides.",
    images: ["/images/batumi/night-beach.jpg"],
  },
  keywords: ["Batumi tours", "Adjara excursions", "Georgia tour guide", "Batumi sightseeing", "private tours Batumi", "ბათუმის ტურები", "აჭარის ექსკურსიები"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Georgian Treasure",
    "image": "https://georgiantreasure.ge/logo.png",
    "@id": "https://georgiantreasure.ge",
    "url": "https://georgiantreasure.ge",
    "telephone": "+995599033319",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Batumi City Center",
      "addressLocality": "Batumi",
      "addressRegion": "Adjara",
      "postalCode": "6000",
      "addressCountry": "GE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6168,
      "longitude": 41.6367
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    }
  };

  return (
    <html lang="ka" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaGO.variable} ${notoArabic.variable} ${notoHebrew.variable} font-inter antialiased bg-white dark:bg-zinc-950 transition-colors duration-500`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
