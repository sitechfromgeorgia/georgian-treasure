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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoGeorgian.variable} ${notoArabic.variable} ${notoHebrew.variable} font-inter antialiased bg-white dark:bg-zinc-950 transition-colors duration-500`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
