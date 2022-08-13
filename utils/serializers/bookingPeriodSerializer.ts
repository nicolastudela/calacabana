import { BookeableValidPeriod, BookingPeriod } from "@/types/shared";
import { toYYYYMMDD } from "../dates";


export const bookingPeriodSerialize = (period: BookingPeriod) => (
  [toYYYYMMDD(period[0]), toYYYYMMDD(period[1])] as [string, string]
)

export const bookeableValidPeriodSerialize = (period: BookeableValidPeriod) => (
 [toYYYYMMDD(period.startDate), toYYYYMMDD(period.endDate)] as [string, string]
)