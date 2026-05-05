# Georgian Treasure

Next.js 15 static-export PWA for a premium tour service in Batumi, Georgia. Deployed to Cloudflare Pages.

## Stack
- Next.js 15 (App Router, `output: 'export'`), React 19, Tailwind CSS v4, TypeScript
- `next-intl` for i18n (4 locales: en, ka, ru, he — Hebrew is RTL)
- Supabase (client + admin), `@tanstack/react-query`
- PWA via `@ducanh2912/next-pwa`, Framer Motion, Recharts
- OpenAI for chatbot (admin panel)

## Key Files
- `next.config.ts` — static export config with `output: 'export'`, `trailingSlash: false`
- `middleware.ts` — `next-intl` locale routing (dev only; not active in static export)
- `lib/seo.tsx` — canonical URL, org data, meta/JSON-LD generators (`SITE_URL = georgiantreasure.ge`)
- `i18n/config.ts` — locales array, default locale
- `i18n/request.ts` — next-intl request config, message map
- `lib/supabase/admin.ts` — service-role client (server-only), admin data helpers
- `lib/supabase/client.ts` — browser Supabase client, public data helpers
- Scripts: `setup-supabase.sql` (run in Supabase SQL Editor)

## Build & Deploy
- `npm run build` → `out/` (static HTML)
- `.github/workflows/deploy.yml` — pushes `out/` to Cloudflare Pages
- Cloudflare Pages config: `_headers`, `_redirects` in `public/` → copied to `out/`

## Routing
- Root `/` → redirects to `/en` via Cloudflare `_redirects` (301) + meta refresh fallback
- `/[lang]/...` — all public routes are localized
- `/admin/...` — not localized, static client-rendered admin panel

## Constraints
- `output: 'export'` means: no middleware at runtime, no SSR, no API routes, no `cookies()`/`headers()` in server components
- All data fetching is client-side via Supabase browser client + React Query
- `images.unoptimized: true` (required for static export)
