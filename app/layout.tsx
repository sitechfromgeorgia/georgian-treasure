import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian, Noto_Sans_Arabic, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const notoGeorgian = Noto_Sans_Georgian({ subsets: ["georgian"], variable: "--font-noto-georgian" });
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
        url: "https://images.unsplash.com/photo-1563220318-7b447883296c?q=80&w=1200&auto=format&fit=crop",
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
    images: ["https://images.unsplash.com/photo-1563220318-7b447883296c?q=80&w=1200&auto=format&fit=crop"],
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
    "telephone": "+995593123456",
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
      <body className={`${inter.variable} ${notoGeorgian.variable} ${notoArabic.variable} ${notoHebrew.variable} font-inter antialiased bg-white dark:bg-zinc-950 transition-colors duration-500`}>
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
