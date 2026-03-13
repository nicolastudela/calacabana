import type { IRawGoogleReview } from "@/server/services/fetchOutstandingReviews";
import reviewsFromSite from "./reviews-from-site.json";

const MOCK_GOOGLE_REVIEWS = reviewsFromSite as IRawGoogleReview[];

const stubGooglePlaceAPIResponseReviewsFromSite = () => {
  return MOCK_GOOGLE_REVIEWS;
};

export default stubGooglePlaceAPIResponseReviewsFromSite;

