import { NextRouter } from "next/router";
import { toYYYYMMDD } from "./dates";

const CHECK_IN_URL_PARAM_NAME = "check_in";
const CHECK_OUT_URL_PARAM_NAME = "check_out";

const updateQueryStringWithBookingDates = (router: NextRouter, dates: [Date, Date | null] | null) => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  if (!dates) {
    searchParams.delete(CHECK_IN_URL_PARAM_NAME);
    searchParams.delete(CHECK_OUT_URL_PARAM_NAME);
  } else {
    const [checkin,checkout] = dates;
    if (checkin) {
      searchParams.set(CHECK_IN_URL_PARAM_NAME, toYYYYMMDD(checkin));
    }
    if (checkout) {
      searchParams.set(CHECK_OUT_URL_PARAM_NAME, toYYYYMMDD(checkout));
    }
  }

  router.push(url,
    undefined,
    { shallow: true })
}

const getBookingDatesFromQueryString = (queryString: string) => {
  const urlSearchParams = new URLSearchParams(queryString);
  const checkInStr = urlSearchParams.get(CHECK_IN_URL_PARAM_NAME);
  const checkOutStr = urlSearchParams.get(CHECK_OUT_URL_PARAM_NAME)
  if (checkInStr && checkOutStr) {
    return {
      checkInStr, checkOutStr
    }
  }
  return null
}

export {
  getBookingDatesFromQueryString,
  updateQueryStringWithBookingDates,
}