/**
 * This type represents a period that is ready and valid to be bookeable.
 * Meaning that a period is sematically valid, startDate is after FIRST_BOOKING_DAY. And period not intersect in other booking periods.
 */
export type BookeableValidPeriod = {
  startDate: Date,
  endDate: Date,
}

/**
 * This type represents a period that is ready sematically valid
 */
export type BookingPeriod = [Date, Date]
