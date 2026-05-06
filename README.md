# Georgian Treasure 🇬🇪

Premium tour service in Batumi, Georgia — ბათუმის ტურები და ექსკურსიები.

🔗 **Live:** [georgiantreasure.ge](https://georgiantreasure.ge)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, static export) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Fonts | Inter (Latin), Noto Sans Georgian (ქართული), Noto Sans Hebrew |
| i18n | next-intl v4 (4 locales) |
| State | React Context (Language, Theme) |
| Data | TanStack React Query |
| PWA | @ducanh2912/next-pwa |
| Deploy | Cloudflare Pages |

## 🌍 Supported Languages (4)

- 🇬🇪 ქართული (ka) - default
- 🇬🇧 English (en)
- 🇷🇺 Русский (ru)
- 🇮🇱 עברית (he) - RTL

## 📦 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx            # Root redirect to /en
│   ├── [lang]/page.tsx     # Localized home pages
│   ├── globals.css         # Global styles
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── home/               # Hero, Tours, Booking, Contact
│   └── layout/             # Header, Footer
├── context/                # LanguageContext, ThemeContext
├── i18n/                   # next-intl config
│   ├── config.ts           # Locales array
│   └── request.ts          # Message loading
├── messages/               # Translation files (en, ka, ru, he)
├── lib/                    # Utils, SEO helpers
├── public/                 # Static assets
└── types/                  # TypeScript interfaces
```

## 🚀 Deployment

### Cloudflare Pages

| Setting | Value |
|---------|-------|
| Platform | Cloudflare Pages |
| Build command | `npm run build` |
| Output dir | `dist/` |
| Node version | 20.x |

### Build

```bash
npm install
npm run build
# Output: dist/
```

## 📝 Notes

- Static export (`output: 'export'`) - no SSR/API routes
- `trailingSlash: false` for clean URLs
- Images: `unoptimized: true` (required for static export)
- WhatsApp: +995 599 03 33 19

## 🏢 Maintained by

**SiTech Agency** — sitech.ge | ბათუმი
