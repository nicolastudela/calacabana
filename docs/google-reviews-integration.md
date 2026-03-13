## Google Reviews mock sync & UX tweaks

### Overview

- **Goal**: Refresh guest reviews from Google, wire them into the existing mock API, and improve the reviews section UX (including outbound links to Google).
- **Scope**: Mock data only – no change to the real Google Places API calls, still controlled via `MOCK_GOOGLE_PLACES_REVIEWS_API`.

### Changes

- **New mock data source**
  - Created `shared/mocks/reviews-from-site.json` based on the latest Google reviews page (HTML exported + manually curated texts, ratings, and relative dates).
  - Added `scripts/extractReviewsFromSite.ts` (one-off helper using `cheerio`) and `scripts/patchReviewTimesFromRelative.ts` to:
    - Parse author metadata (name, profile URL, avatar URL) from the saved HTML.
    - Derive Unix `time` values from `relative_time_description` (e.g. `"Hace un mes"`, `"2 semanas atrás"`), preserving ordering (first = newest).
  - Introduced `shared/mocks/googlePlaceAPIReviewsFromSiteStubber.ts` that returns the new JSON as `IRawGoogleReview[]`.

- **Hooked mock into server**
  - Switched `server/services/fetchOutstandingReviews.ts` to use `googlePlaceAPIReviewsFromSiteStubber` when `MOCK_GOOGLE_PLACES_REVIEWS_API === "1"`.
  - The sanitize logic and API response shape (`IReview`) remain unchanged.

- **Reviews UI & UX updates**
  - `features/reviews/Reviews.tsx`:
    - Reviewer header:
      - Names are now links to the reviewer’s Google profile (`review.authorUrl`; opens in a new tab).
      - Avatars:
        - By default, Chakra `Avatar` shows initials only (no remote image).
        - New flag `NEXT_PUBLIC_SHOW_GOOGLE_AVATARS` – when set to `"1"`, the component uses `review.profilePhotoURL` as `src`. This is off by default to avoid `429` / rate-limits from `lh3.googleusercontent.com`.
    - Header row:
      - Shows `★ {overallRating} · {reviewsCount} Opiniones` with tighter alignment between the star icon and the text.
      - Added a Google reviews link (opens in a new tab) using the project’s saved URL and the local favicon `public/icons/goo-fav-ic.ico` as the icon.
      - Layout tweaks: responsive padding, `Spacer` to push the Google icon to the right, and better spacing on mobile/desktop.
    - Layout on mobile:
      - Added horizontal padding on the outer container so the section is not stuck to the left edge.
      - Centered the “Mostrar todas las opiniones” button with `alignSelf="center"` and a small top margin.
    - Number of reviews shown by default (when `onExpand` is provided):
      - Mobile: 5 reviews.
      - Desktop: 16 reviews.

- **Dependencies**
  - Added `cheerio` as a dev dependency in `package.json` / `package-lock.json` for the HTML parsing helper scripts.

### How to use / toggle behavior

- **Use mock reviews from JSON instead of live Google API**
  - Ensure `process.env.MOCK_GOOGLE_PLACES_REVIEWS_API === "1"` (e.g. in `.env.local`).
  - `fetchOutstandingReviews` will return data from `googlePlaceAPIReviewsFromSiteStubber` → `reviews-from-site.json`.

- **Toggle Google avatar images**
  - Default: no remote avatars (initials only) → safe, no external image requests.
  - To enable avatar images from Google:
    - Set `NEXT_PUBLIC_SHOW_GOOGLE_AVATARS=1` in `.env.local`.
    - Note: These hit Google’s image CDN and may trigger `429 Too Many Requests` if overused.

- **Regenerate timestamps (optional)**
  - If `relative_time_description` values change, you can recompute `time` fields:
    - `node -r ts-node/register scripts/patchReviewTimesFromRelative.ts`
  - This keeps the mock data roughly aligned with “X months/weeks ago” while preserving sorting.

