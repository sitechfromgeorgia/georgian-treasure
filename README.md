# Georgian Treasure 🇬🇪

Premium tour service in Batumi, Georgia — ბათუმის ტურები და ექსკურსიები.

🔗 **Live:** [georgiantreasure.ge](https://georgiantreasure.ge)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Fonts | Inter (Latin), Noto Sans Georgian (ქართული), Noto Sans Arabic, Noto Sans Hebrew |
| State | React Context (Language, Theme) |
| Data | TanStack React Query |
| PWA | @ducanh2912/next-pwa |
| Deploy | Cloudflare Pages (GitHub integration) |

## 🌍 Supported Languages

- 🇬🇪 ქართული (ka)
- 🇬🇧 English (en)
- 🇷🇺 Русский (ru)
- 🇺🇦 Українська (uk)
- 🇸🇦 العربية (ar)
- 🇮🇱 עברית (he)

## 📦 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx            # Main page (Hero, Tours, Booking, Contact)
│   ├── globals.css         # Global styles, CSS variables
│   ├── admin/page.tsx      # Admin panel
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── home/               # Hero, PopularTours, BookingForm, Contact
│   ├── layout/             # Header
│   └── ui/                 # PWAInstallPrompt, ServiceWorkerRegister
├── context/                # LanguageContext, ThemeContext
├── data/                   # content.ts (translations, tours)
├── lib/                    # utils.ts
├── types/                  # TypeScript interfaces
└── public/                 # Static assets (images, manifest.json)
```

## 🚀 Deployment

### Cloudflare Pages (Current)

| Setting | Value |
|---------|-------|
| Platform | Cloudflare Pages |
| Project | `georgian-treasure` (CF Dashboard) |
| Branch | `main` (auto-deploy on push) |
| Build command | `npm run build` |
| Output dir | `.next` |
| Domain | georgiantreasure.ge |
| DNS | CNAME → `georgian-treasure.pages.dev` (proxied) |

### How to Deploy

1. Push to `main` branch → Cloudflare auto-builds and deploys
2. CF Pages GitHub integration handles the pipeline
3. No manual steps needed

### Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
npm run start
```

## 📊 SEO & Performance

- ✅ Open Graph tags (og:image, og:title, og:description)
- ✅ Twitter Card (summary_large_image)
- ✅ JSON-LD Schema (LocalBusiness)
- ✅ Sitemap auto-generation
- ✅ robots.txt
- ✅ Multi-language meta tags
- ✅ PWA support (installable, offline capable)

## 📝 Notes

- Font: **Noto Sans Georgian** (Google Fonts) — loaded via `next/font/google`
- WhatsApp booking: +995 599 033 319
- Dark mode supported via ThemeContext
- RTL support for Arabic/Hebrew

## 🏢 Maintained by

**SiTech Agency** — sitech.ge | ბათუმი
