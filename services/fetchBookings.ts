import { calendar_v3, google } from "googleapis";
import { GaxiosPromise } from "googleapis-common";
import {
  BookingsInfoResponseStatus,
  IAparmentBookingsResponseError,
  IAparmentBookingsResponseSuccessful,
} from "../types/api";
import { APARMENTS_NAME } from "../types/shared";

import stubEvents from "../shared/mocks/calendarEventStubber";
import { BookingPeriod } from "@/types/types";
import isBefore from "date-fns/isBefore";

const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  undefined,
  process.env.GOOGLE_PRIVATE_KEY,
  process.env.GOOGLE_CALENDAR_SCOPES_READ_ONLY
);

const calendar = google.calendar({
  version: "v3",
  // project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

const sanitizeBookingPeriods = (periods?: calendar_v3.Schema$Event[]) => {
  const initValue: BookingPeriod[] = [];
  if (!periods) {
    return initValue;
  }
  return periods.reduce((acc, actual) => {
    const startDate = actual?.start?.date;
    const endDate = actual?.end?.date;
    if (startDate && endDate) {
      const period: BookingPeriod = [new Date(startDate), new Date(endDate)]
      if (isBefore(period[0], period[1])) {
        acc.push(period)
      } 
    }
    return acc;
  }, initValue);
};

const sanitizeEventListResponse = (
  promise: GaxiosPromise<calendar_v3.Schema$Events>
) =>
  promise
    .then(
      (resp) =>
        ({
          status: BookingsInfoResponseStatus.SUCCESFUL,
          statusText: resp.statusText,
          bookedPeriods: sanitizeBookingPeriods(resp.data?.items),
        } as IAparmentBookingsResponseSuccessful)
    )
    .catch((error) => {
      console.error(error.response);
      return {
        status: BookingsInfoResponseStatus.ERROR,
        errorCode: error.response.data.error.code,
        statusText: error.response.status,
        errorsDetails: error.response.data.error.message,
      } as IAparmentBookingsResponseError;
    });

const fetchBookings = (apartment: APARMENTS_NAME) => {
  let calendarId =
    apartment === APARMENTS_NAME.CABANA
      ? process.env.CABANA_GOOGLE_CALENDAR_ID
      : process.env.CALA_GOOGLE_CALENDAR_ID;

  //TODO (#23) REMOVE THIS, IT'S JUST TO NOT TO CALL CALENDAR_API ON EACH CALL
  if (process.env.MOCK_CALENDAR_API) {
    return stubEvents(apartment);
  } else {
    return sanitizeEventListResponse(
      calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        //TODO: remove to enable all events
        maxResults: 10,
        // don't know what this is
        singleEvents: true,
        orderBy: "startTime",
      })
    );
  }
};

export default fetchBookings;