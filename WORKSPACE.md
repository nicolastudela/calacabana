# Calacabana — Workspace Index

> Last indexed: March 2026  
> Branch: **EPIC-95-DB-PRISMA**  
> Status: **Baseline updated — Next 14, Prisma 5, TS 5. Build passes with mock or DB**

---

## Project Overview

**Calacabana** is a Next.js 14 vacation rental site for two apartments (Cala + Cabana) in Tanti, Córdoba, Argentina. It includes:

- Apartment listings with galleries, amenities, reviews
- Booking availability (Google Calendar integration)
- Contact/inquiry forms (SendGrid)
- Location map, SEO (sitemap, robots), analytics (GA)

---

## Branch Context: EPIC-95-DB-PRISMA

You were migrating from **static/mock data** to **Prisma + PostgreSQL (Subpabase)**.

### Commits on this branch

1. **fd86ce9** — [EPIC-95] Introducing Prisma & Subpabase. Schema/Migrations. Moving apartment data to DB, creating APIs and fetchers. Moving to Features-based arch
2. **2669238** — bulk of work not verified *(your last commit)*

### What was done

- **Prisma schema** for `Apartment`, `ApartmentImage`, `AmenitiesGroup`, `Amenitiy`, `AmentiesOnAparments`
- **Migrations** in `prisma/migrations/` (initial + priority)
- **Server services** using Prisma: `fetchApartments`, `fetchApartment`, `fetchApartmentSlugs`, `fetchBookings`
- **API routes**: `/api/apartments`, `/api/apartments/[name]`, `/api/apartments/slugs`, `/api/bookings/*`
- **Fetchers** (client-side) calling those APIs
- **Features-based structure**: `features/apartment`, `features/amenities`, `features/booking`, `features/inquiry`, `features/reviews`, etc.
- **Seed script** (`prisma/seed.ts`) populating DB from `apartmentsDataStubber`

### What was NOT merged

- `prisma/not_included.prisma` — User, Booking, UserProfile models (Subpabase Auth integration) — **not in main schema**
- `prisma/not_supported.sql` — Subpabase auth triggers (sync `auth.users` ↔ `public.User`) — **not applied**

---

## Planned Features (future work)

Planned but not implemented. Baseline is being updated so we can start fresh when ready.

### 1. Reservations / Bookings in DB

- Store reservations in DB (today: availability comes from Google Calendar only)
- Booking model with statuses: CONFIRMED, CANCELLED, WAITING_FOR_USER, WAITING_FOR_HOST, DRAFT
- Link bookings to apartments and users
- Decide: DB as source of truth, or sync with Google Calendar

### 2. Admin functionality

- Admin APIs to CRUD apartment data (images, amenities, descriptions, etc.)
- Role-based access: `ADMIN` vs `GUEST` (see `not_included.prisma`)
- Protected API routes for admin-only actions

### 3. Booking manager

- UI for admins to create, edit, cancel bookings
- View reservations, manage status, assign guests

### 4. Auth (provider-agnostic)

- User sign-up / login
- Originally planned with Supabase Auth, but **not married to Supabase**
- Alternatives: NextAuth.js, Clerk, Auth.js, Lucia, or Supabase/Neon/Railway auth
- `not_included.prisma` + `not_supported.sql` are Supabase-specific; can be adapted for other providers

### DB hosting options (all work with Prisma + PostgreSQL)

- **Local** — Docker, Postgres.app (dev only)
- **Neon** — Serverless Postgres, generous free tier
- **Railway** — Simple, good free tier
- **Supabase** — Postgres + optional Auth, Storage, Realtime
- **Vercel Postgres** (Neon under the hood)
- **PlanetScale** — MySQL, not Postgres (would require schema changes)

---

## Architecture

```
pages/           → Next.js pages (index, alojamiento/[apartment], reserva/[bookApt], etc.)
pages/api/       → API routes (apartments, bookings, contact, reviews)
features/        → Feature modules (apartment, amenities, booking, inquiry, reviews, etc.)
components/      → Shared UI (Layout, headers, DatePicker, etc.)
server/          → Server-side services, serializers, sanitizers
fetchers/        → Client-side API fetchers
shared/          → Hooks, mocks, types, models
lib/             → Prisma client, httpClient, gtag
prisma/          → Schema, migrations, seed
```

---

## Baseline (updated March 2026)

| Package | Version |
|---------|---------|
| Next.js | 14.2.x |
| Prisma | 5.22.x |
| React | 18.3.x |
| TypeScript | 5.6.x |
| Node | 20.x (via @tsconfig/node20) |
| Chakra UI | 2.8.x |
| dotenv-cli | 7.4.x (for Prisma scripts) |

Build verified with `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1`. DB-agnostic: works with local Postgres, Neon, Railway, Supabase, or any PostgreSQL provider.

---

## Environment

**Required for DB (EPIC-95):**

- `DATABASE_URL` — PostgreSQL connection string (Supabase, Neon, Railway, local, etc.)
- `SHADOW_DATABASE_URL` — For Prisma migrations (optional for `db push`)

**Other env vars** — See README (Google Calendar, Places, SendGrid, GA, etc.)

**Mock flags** (for dev without external APIs):

- `MOCK_CALENDAR_API=1`
- `MAINTENANCE_MODE=1`
- `NEXT_PUBLIC_MOCK_MAPS=1`
- `MOCK_GOOGLE_PLACES_REVIEWS_API=1`
- `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` — Uses stub data instead of DB

---

## Known Issues & TODOs

| Location | Issue |
|----------|-------|
| **Build** | ✅ Fixed: `types/types.ts` barrel + Layout export. Full build needs DB or mock flag. |
| `features/amenities/utils/amenitiesIconMapper.tsx` | FIXME: Bundle size ~100k — use file paths for icons |
| `pages/alojamiento/[apartment].tsx` | TODO: Invalid dates in URL — remove them |
| `components/Footer.tsx` | Copyright year still 2022 |
| `shared/mocks/apartmentsDataStubber.ts` | Typo: "CALABANA" instead of "CALACABANA" |

---

## Type System

Types are split across:

- `shared/types.ts` — IApartment, IImage, IImagesGroup
- `features/amenities/types.ts` — AMENITY, AMENITIES_GROUP, IAmenity, IAmenitiesGroup
- `features/booking/types.ts` — BookeableValidPeriod, BookingPeriod
- `features/inquiry/types.ts` — UserInquiryRequest, UserData
- `features/reviews/types.ts` — IReview
- `server/types.ts` — API response types

Many files import from `@/types/types`. A **barrel file** at `types/types.ts` re-exports from feature modules to keep these imports working.

---

## Quick Start

```bash
# Install deps
npm install

# DB (requires .env.local with DATABASE_URL, SHADOW_DATABASE_URL)
npm run prisma:db:push      # Push schema
npm run prisma:db:seed     # Seed apartments

# Or use mock data (no DB needed)
# Set NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1 in .env.local

npm run dev
```

---

## Vercel deployment

`.env.local` is **not** deployed. Configure env vars in **Vercel → Project Settings → Environment Variables**.

**Required for EPIC-95 build:**
- `DATABASE_URL` — PostgreSQL connection string (build runs `getStaticPaths` which hits Prisma)
- `SHADOW_DATABASE_URL` — For migrations (optional if using `db push`)

**Or** set `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` to build without DB (uses stub data in prod too).

**Other vars** (same as local): SENDGRID_KEY, Google Calendar, Google Places, GA, etc. Use production values.

---

## Vercel Deployment

`.env.local` is **not** deployed. Configure env vars in **Vercel → Project Settings → Environment Variables**.

**Required for build** (EPIC-95 uses DB for static generation):
- `DATABASE_URL` — Production Postgres (Neon, Railway, Supabase, etc.)
- `SHADOW_DATABASE_URL` — For Prisma migrations during build

**Or** set `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` to build without DB (uses stub data in prod too).

**Other vars** (same as local): SENDGRID_KEY, Google Calendar, Google Places, GA, etc. Use production values.

---

## Suggested Next Steps

1. **Verify build** — `npm run build` (needs DB or `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` for static pages)
2. **Run app** — With mock or real DB
3. **Minor polish** — Amenities bundle size, Footer copyright year
4. **Future: Reservations + Admin** — When ready, add User/Booking models, auth (Supabase, NextAuth, Clerk, etc.), and admin APIs

---

## Vercel Deployment

`.env.local` is **not** deployed. Configure env vars in **Vercel → Project Settings → Environment Variables**.

**Required for EPIC-95 build:**
- `DATABASE_URL` — Production Postgres (Neon, Railway, Supabase, etc.)
- `SHADOW_DATABASE_URL` — For Prisma migrations during build

**Or** set `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` to build without DB (uses stub data in prod too).

**Also add** (same as local): SENDGRID_KEY, Google Calendar vars, Google Places, GA, OWNER_NOTICE_EMAIL_RECIPIENT, etc.

---

## Vercel Deployment

`.env.local` is **not** deployed. Configure env vars in **Vercel → Project Settings → Environment Variables**.

**Required for EPIC-95 build:**
- `DATABASE_URL` — PostgreSQL connection string (build runs `getStaticPaths` which hits Prisma)
- `SHADOW_DATABASE_URL` — For Prisma migrations (optional for `db push`)

**Or** set `NEXT_PUBLIC_MOCK_APARTMENTS_DATA=1` to build without DB (uses stub data in prod too).

**Other vars** (same as local): SENDGRID_KEY, Google Calendar, Google Places, GA, etc. Use production values.
