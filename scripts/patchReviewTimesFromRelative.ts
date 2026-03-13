import { readFileSync, writeFileSync } from "fs";
import path from "path";

type RawReview = {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

const jsonPath = path.join(
  process.cwd(),
  "shared",
  "mocks",
  "reviews-from-site.json",
);

function parseRelativeTimeEs(relative: string): number | null {
  const value = relative.trim().toLowerCase();

  if (!value) return null;

  const nowSeconds = 0; // we'll subtract the computed offset later

  // "Hace un mes", "Hace un año", "Hace un día"
  let match = value.match(/^hace\s+un\s+(\w+)/i);
  if (match) {
    const unit = match[1];
    return nowSeconds + unitToSeconds(1, unit);
  }

  // "Hace 2 meses", "Hace 3 años", "Hace 10 días"
  match = value.match(/^hace\s+(\d+)\s+(\w+)/i);
  if (match) {
    const num = Number(match[1]);
    const unit = match[2];
    return nowSeconds + unitToSeconds(num, unit);
  }

  // "2 semanas atrás"
  match = value.match(/^(\d+)\s+semanas?\s+atr[aá]s$/i);
  if (match) {
    const num = Number(match[1]);
    return nowSeconds + unitToSeconds(num, "semanas");
  }

  return null;
}

function unitToSeconds(num: number, unitRaw: string): number {
  const unit = unitRaw.toLowerCase();
  if (unit.startsWith("día")) return num * 24 * 60 * 60;
  if (unit.startsWith("semana")) return num * 7 * 24 * 60 * 60;
  if (unit.startsWith("mes")) return num * 30 * 24 * 60 * 60;
  if (unit.startsWith("año")) return num * 365 * 24 * 60 * 60;
  return 0;
}

function main() {
  const raw = readFileSync(jsonPath, "utf8");
  const reviews = JSON.parse(raw) as RawReview[];

  const now = Math.floor(Date.now() / 1000);

  const updated = reviews.map((review, index) => {
    const offsetSeconds = parseRelativeTimeEs(review.relative_time_description);

    // If we can't parse, fall back to ordering only by index (newest first)
    const fallbackOffset = index * 24 * 60 * 60; // 1-day spacing
    const totalOffset = (offsetSeconds ?? fallbackOffset) + index;

    return {
      ...review,
      time: now - totalOffset,
    };
  });

  writeFileSync(jsonPath, JSON.stringify(updated, null, 2), "utf8");
  // eslint-disable-next-line no-console
  console.log(
    `Updated ${updated.length} reviews in reviews-from-site.json with synthetic time values.`,
  );
}

main();

