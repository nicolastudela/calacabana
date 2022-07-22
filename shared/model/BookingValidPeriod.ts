import { BookingPeriod, BookeableValidPeriod } from "@/types/types";
import { isValidBookingDateRange } from "@/utils/dateRanges";

function createBookeableValidPeriod(period: BookingPeriod| null) {
  let _period: BookingPeriod;

  if (period && isValidBookingDateRange(period)) {
    _period = [period[0], period[1]];
    return {
      startDate: _period[0],
      endDate: _period[1]
    } as BookeableValidPeriod
  } else {
    return null
  }
}

export default createBookeableValidPeriod;