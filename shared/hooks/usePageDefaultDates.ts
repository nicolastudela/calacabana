import { BookeableValidPeriod, BookingPeriod } from "@/types/shared";
import {
  isBookingDateRangeAvailable,
  validateAndFormatBookingDates,
} from "@/utils/dateRanges";
import { getBookingDatesFromQueryString } from "@/utils/queryStringHandler";
import { useEffect, useState } from "react";
import createBookeableValidPeriod from "@/shared/model/BookingValidPeriod";

export enum EPageDefaultDatesErrorType {
  DEFAULT_DATES_INVALID = "DEFAULT_DATES_INVALID",
  DEFAULT_DATES_ALREADY_TAKEN = "DEFAULT_DATES_TAKEN",
}

interface IUsePageDefaultDatesProps {
  excludedDatesRanges: BookingPeriod[] | undefined;
}

const usePageDefaultDates = ({
  excludedDatesRanges,
}: IUsePageDefaultDatesProps) => {
  const [defaultDates, setDefaultDates] = useState<BookingPeriod | undefined>(
    undefined
  );
  const [bookeableDefaultDates, setBookeableDefaultDates] = useState<BookeableValidPeriod | undefined | null>(
    undefined
  );
  const [pageDefaultDatesError, setPageDefaultDatesError] = useState<
    EPageDefaultDatesErrorType | null | undefined
  >(undefined);
  const [queryDefaultDates, setQueryDefaultDates] = useState<[string, string]>();

  useEffect(() => {
    const defaultBookingDates = getBookingDatesFromQueryString(
      window.location.search
    );

    if (defaultBookingDates) {
      setQueryDefaultDates([
        defaultBookingDates.checkInStr,
        defaultBookingDates.checkOutStr,
      ]);
    }
  },[]);

  /**
   * Handles passed default dates:
   * - if its a format valid date range format be returned as default date with no error
   * - Will validate if date range is bookeable
   * - Returns a default dates or error
   */
  useEffect(() => {
    if (queryDefaultDates && queryDefaultDates.length == 2) {
      const validDefaultDates =
        validateAndFormatBookingDates(queryDefaultDates);
      if (validDefaultDates) {
        const [defaultStartDate, defaultEndDate] = validDefaultDates;

        setPageDefaultDatesError(null);
        setDefaultDates([defaultStartDate, defaultEndDate]);
        if (
          excludedDatesRanges &&
          !isBookingDateRangeAvailable(validDefaultDates, excludedDatesRanges)
        ) {
          setBookeableDefaultDates(null);
          setPageDefaultDatesError(
            EPageDefaultDatesErrorType.DEFAULT_DATES_ALREADY_TAKEN
          );
        } else {
          excludedDatesRanges && setBookeableDefaultDates(createBookeableValidPeriod(validDefaultDates))
        }
      } else {
        setPageDefaultDatesError(
          EPageDefaultDatesErrorType.DEFAULT_DATES_INVALID
        );
      }
    }
  }, [queryDefaultDates, excludedDatesRanges]);

  return { defaultDates, bookeableDefaultDates, pageDefaultDatesError }; 
};

export default usePageDefaultDates;
