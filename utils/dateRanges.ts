import { BookingPeriod } from "@/types/types";
import { addDays, isBefore, isAfter} from "date-fns";
import { FIRST_BOOKING_DAY } from "./dates";


/**
 * This checks if a Booking period is available to be bookable, 
 * this means is a sematically valid Period and is not included on other bookings
 */
const isBookingDateRangeAvailable = (
  rangeToCompare: [Date, Date],
  excludedDateRanges?: Date[][]
) => {
  if (!excludedDateRanges) {
    return true;
  }
  return (
    excludedDateRanges.findIndex((range) => {
      return (
        !isAfter(rangeToCompare[0],range[1]) &&
        !isAfter(range[0],rangeToCompare[1])
      );
    }) < 0
  );
};

/**
 * This checks if a BookingPeriod is valid. 
 * Meaning is a sematically valid period and startDate is after FIRST_BOOKING_DAY.
 */
const isValidBookingDateRange  = (range: [Date, Date] | null) => {
  if (range && range.length == 2) {
    return isBefore(range[0],range[1]) && isBefore(FIRST_BOOKING_DAY, range[0])
  }
}

/**
 * This converts a string formatted period into a BookingPeriod if possible 
 * Will parse strings dates and validates if sematically valid period and start date is after FIRST_BOOKING_DAY.
 */
const validateAndFormatBookingDates = (defaultDates: [string, string]): BookingPeriod | null => {
  const range = formatStringDateRange(defaultDates)
  if (range && isValidBookingDateRange(range)) {
    return range
  }
  return null;
}

const formatStringDateRange = (stringRange: [string, string]): [Date, Date] | null => {
  if (stringRange && stringRange.length == 2) { 
    const checkin = new Date(stringRange[0]);
    const checkout = new Date(stringRange[1]);
    if (checkin && checkout) {
      return [checkin, checkout];
    }
  }
  return null;
}

const flattenDateRanges = (excludeDatesRanges: Date[][] | undefined) => {
  if (excludeDatesRanges) {
    return excludeDatesRanges.flatMap((range) => {
      const dates = [];
      for (
        let lowerBound = range[0];
        lowerBound <= range[1];
        lowerBound = addDays(lowerBound, 1)
      ) {
        dates.push(lowerBound);
      }
      return dates;
    });
  } else {
    return undefined;
  }
};

export { isBookingDateRangeAvailable, isValidBookingDateRange, formatStringDateRange, validateAndFormatBookingDates, flattenDateRanges };
