import { calendar_v3, google } from "googleapis";
import { GaxiosPromise } from "googleapis-common";
import {
  BookingsInfoResponseStatus,
  IAparmentBookingsResponseError,
  IAparmentBookingsResponseSuccessful,
} from "../types";
import { BookingPeriod } from "@/types/types";

import stubEvents from "@/shared/mocks/calendarEventStubber";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";

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
      const period: BookingPeriod = [new Date(startDate), subDays(new Date(endDate),1)]
      if (isBefore(period[0], period[1])) {
        acc.push(period)
      } 
    }
    return acc;
  }, initValue);
};

const getCalendarIdForApartment = (apartmentName: string): string | null => {
  switch (apartmentName) {
    case "cala":
      return process.env.CALA_GOOGLE_CALENDAR_ID ?? null;
    case "cabana":
      return process.env.CABANA_GOOGLE_CALENDAR_ID ?? null;
    default:
      return null;
  }
};

const sanitizeEventListResponse = (
  promise: GaxiosPromise<calendar_v3.Schema$Events>
) =>
  promise
    .then(
      (resp) =>{
        return ({
          status: BookingsInfoResponseStatus.SUCCESFUL,
          statusText: resp.statusText,
          bookedPeriods: sanitizeBookingPeriods(resp.data?.items),
        } as IAparmentBookingsResponseSuccessful)
      }
    )
    .catch((error) => {
      console.error(error)
      return {
        status: BookingsInfoResponseStatus.ERROR,
        errorCode: error?.response?.data?.error?.code,
        statusText: error?.response?.status || error,
        errorsDetails: error?.response?.data?.error?.message,
      } as IAparmentBookingsResponseError;
    });

const fetchBookings = (apartmentName: string) => {
  if (process.env.MOCK_CALENDAR_API && process.env.MOCK_CALENDAR_API === "1") {
    return stubEvents(apartmentName);
  }
  const calendarId = getCalendarIdForApartment(apartmentName);
  if (!calendarId) {
    return Promise.resolve({
      status: BookingsInfoResponseStatus.ERROR,
      errorCode: 400,
      statusText: "A proper calendar id must be provided",
      errorsDetails: `No calendar ID configured for apartment: ${apartmentName}`,
    } as IAparmentBookingsResponseError);
  }
  return sanitizeEventListResponse(
    calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })
  );
};

export default fetchBookings;
