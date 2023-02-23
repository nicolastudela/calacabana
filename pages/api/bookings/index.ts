import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  BookingsInfoResponseStatus,
  IBookingsInfoResponseError,
  IBookingsInfoResponsePartial,
  IBookingsInfoResponseSuccessful,
} from "@/types/api";
import intersectDateRanges from "@/server/utils/intersectDateRanges";
import fetchBookings from "@/server/services/fetchBookings";


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

  const apartments = await prisma.apartment.findMany({ select: {
    name: true,
    googleCalendarId: true,
  }, where: {
    type: "APARTAMENT"
  }})

  const aptsSort = apartments.slice(0,2).sort((a,_) => a.name === "cala" ? 0 : 1)


  const [calaEventsResponse, cabanaEventsResponse] = await Promise.all(aptsSort.map( aptSort => fetchBookings(aptSort.name, aptSort.googleCalendarId)));

  const bookingsReservation = {
    cala: calaEventsResponse,
    cabana: cabanaEventsResponse,
  };

  if (
    calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL &&
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
  } else if (
    calaEventsResponse.status == BookingsInfoResponseStatus.SUCCESFUL ||
    cabanaEventsResponse.status == BookingsInfoResponseStatus.SUCCESFUL
  ) {
    res
      .status(200)
      .json({
        status: BookingsInfoResponseStatus.PARTIAL,
        ...bookingsReservation,
      } as IBookingsInfoResponsePartial);
  } else {
    res
    .status(200)
    .json({
      status: BookingsInfoResponseStatus.ERROR,
      ...bookingsReservation,
    } as IBookingsInfoResponseError);
  }
});

export default handler;
