import { calendar_v3, google } from "googleapis";
import { GaxiosPromise } from "googleapis-common";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  BookingsInfoResponseStatus,
  IAparmentBookingsResponseError,
  IBookingsInfoResponseError,
  IBookingsInfoResponsePartial,
  IBookingsInfoResponseSuccessful,
} from "../../types/api";
import { intersectDateRanges } from "../../utils/dateRanges";

const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  undefined,
  process.env.GOOGLE_PRIVATE_KEY,
  process.env.GOOGLE_CALENDAR_SCOPES_READ_ONLY
);

const sanitizeBookingPeriods = (periods?: calendar_v3.Schema$Event[]) => {
  const initValue: Date[][] = [];
  if (!periods) {
    return initValue;
  }
  return periods.reduce((acc, actual) => {
    const startDate = actual?.start?.date;
    const endDate = actual?.end?.date;
    if (startDate && endDate) {
      acc.push([new Date(startDate), new Date(endDate)]);
    }
    return acc;
  }, initValue);
};

const calendar = google.calendar({
  version: "v3",
  // project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

const BUENOS_AIRES_ISO_TIME = "T15:00:00-03:00";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (_req, res) => {
  const sanitizeEventListResponse = (
    promise: GaxiosPromise<calendar_v3.Schema$Events>
  ) =>
    promise
      .then((resp) => ({
        status: BookingsInfoResponseStatus.SUCCESFUL,
        statusText: resp.statusText,
        bookedPeriods: sanitizeBookingPeriods(resp.data?.items),
      }))
      .catch(
        (error) =>
          ({
            status: BookingsInfoResponseStatus.ERROR,
            errorCode: error.response.code,
            statusText: error.response?.statusText,
            errorsDetails:
              error.errors && (JSON.stringify(error.errors) as string),
          } as IAparmentBookingsResponseError)
      );

  const calaEventsResponsePromise = sanitizeEventListResponse(
    calendar.events.list({
      calendarId: process.env.CALA_GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      //TODO: remove to enable all events
      maxResults: 10,
      // don't know what this is
      singleEvents: true,
      orderBy: "startTime",
    })
  );

  const cabanaEventsResponsePromise = sanitizeEventListResponse(
    calendar.events.list({
      calendarId: process.env.CABANA_GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      //TODO: remove to enable all events
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })
  );

  const [calaEventsResponse, cabanaEventsResponse] = await Promise.all([
    calaEventsResponsePromise,
    cabanaEventsResponsePromise,
  ]);

  const bookingsReservation = {
    cala: calaEventsResponse,
    cabana: cabanaEventsResponse,
  };

  if (
    calaEventsResponse.status !== BookingsInfoResponseStatus.SUCCESFUL ||
    cabanaEventsResponse.status !== BookingsInfoResponseStatus.SUCCESFUL
  ) {
    res
      .status(200)
      .json({
        status: BookingsInfoResponseStatus.PARTIAL,
        ...bookingsReservation,
      } as IBookingsInfoResponsePartial);
  } else if (
    calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL ||
    cabanaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
  ) {
    res
      .status(200)
      .json({
        status: BookingsInfoResponseStatus.SUCCESFUL,
        fullBookedPeriods: intersectDateRanges(
          calaEventsResponse.bookedPeriods,
          cabanaEventsResponse.bookedPeriods
        ),
        ...bookingsReservation,
      } as IBookingsInfoResponseSuccessful);
  } else {
    res
      .status(200)
      .json({
        status: BookingsInfoResponseStatus.ERROR,
        ...bookingsReservation,
      } as IBookingsInfoResponseError);
  }
});
// .post((req,_post,next) => {
//   console.log(`1er post: ${req}`);
//   next();
// }).post((_req,res) => res.status(404).send("LA CONCHA DE TU MADRE ALBOYS"));

export default handler;
