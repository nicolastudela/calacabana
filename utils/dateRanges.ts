import { addDays, isBefore } from "date-fns";
import { FIRST_BOOKING_DAY } from "./dates";

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
        isBefore(rangeToCompare[0], range[1]) &&
        isBefore(range[0], rangeToCompare[1])
      );
    }) < 0
  );
};

const isValidBookingDateRange  = (range: [Date, Date] | null) => {
  if (range && range.length == 2) {
    return isBefore(range[0],range[1]) && isBefore(FIRST_BOOKING_DAY, range[0])
  }
}

const validateAndFormatBookingDates = (defaultDates: [string, string]): [Date, Date] | null => {
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

export { isBookingDateRangeAvailable, isValidBookingDateRange, validateAndFormatBookingDates, flattenDateRanges };
