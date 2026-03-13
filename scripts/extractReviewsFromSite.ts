import { readFileSync } from "fs";
import path from "path";
import * as cheerio from "cheerio";
import type { IRawGoogleReview } from "../server/services/fetchOutstandingReviews";

const htmlPath = path.join(
  process.cwd(),
  "shared",
  "mocks",
  "reviews-from-site.html",
);

const html = readFileSync(htmlPath, "utf8");
const $ = cheerio.load(html);

const reviews: IRawGoogleReview[] = [];

// NOTE: Selectors are based on the current HTML saved from Google.
// If Google changes their markup, you may need to adjust these.
$(".aSzfg .bwb7ce").each((_, el) => {
  const root = $(el);

  const profile = root.find('.wSokxc[role="img"]').first();
  const author_name = (profile.attr("aria-label") || "").trim();

  const style = profile.attr("style") || "";
  const urlMatch = style.match(/background-image:\s*url\("([^"]+)"\)/);
  const profile_photo_url = urlMatch ? urlMatch[1] : "";

  const author_url = root.find("a.yC3ZMb").attr("href") || "";

  const ratingLabel =
    root.find('span[aria-label$="estrellas"]').first().attr("aria-label") ||
    root.find('[aria-label*="estrellas"]').first().attr("aria-label") ||
    "";
  const ratingMatch = ratingLabel.match(/(\d(?:,\d)?)/);
  const rating = ratingMatch ? Number(ratingMatch[1].replace(",", ".")) : 0;

  // Try to grab the actual user review text, not the owner's reply.
  let text =
    root.find(".wiI7pd").first().text().trim() || "";

  // Fallback: generic text search, prefer the first substantial text block
  if (!text) {
    text =
      root
        .find('[jscontroller="MZnM8e"], [jsname="fbQN7e"], span, div')
        .filter((_, node) => $(node).text().trim().length > 0)
        .first()
        .text()
        .trim() || "";
  }

  const relative_time_description =
    root
      .find("span")
      .filter((_, node) => !!$(node).text().trim().match(/^Hace\s+\d+/))
      .first()
      .text()
      .trim() || "";

  // HTML doesn't include the Unix time; use 0 as a placeholder.
  const time = 0;

  reviews.push({
    author_name,
    author_url,
    language: "es",
    profile_photo_url,
    rating,
    relative_time_description,
    text,
    time,
  } as IRawGoogleReview);
});

// Print JSON to stdout so you can redirect it to a file:
// npx ts-node scripts/extractReviewsFromSite.ts > shared/mocks/reviews-from-site.json
// or run it via a package.json script.
// eslint-disable-next-line no-console
console.log(JSON.stringify(reviews, null, 2));

