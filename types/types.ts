/**
 * Central type re-exports for backward compatibility.
 * Types have been moved to feature modules; this barrel keeps old @/types/types imports working.
 */

export type {
  IApartment,
  IImage,
  IImagesGroup,
} from "@/shared/types";

export {
  AMENITY,
  AMENITIES_GROUP,
} from "@/features/amenities/types";

export type {
  IAmenity,
  IAmenitiesGroup,
} from "@/features/amenities/types";

export type {
  BookeableValidPeriod,
  BookingPeriod,
} from "@/features/booking/types";

export type {
  UserInquiry,
  UserInquiryRequest,
} from "@/features/inquiry/types";

export type { IReview } from "@/features/reviews/types";
