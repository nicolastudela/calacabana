import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {
  BookingsInfoResponseStatus,
  IBookingsInfoResponseError,
  IBookingsInfoResponsePartial,
  IBookingsInfoResponseSuccessful,
} from "@/server/types";
import intersectDateRanges from "@/server/utils/intersectDateRanges";
import fetchBookings from "@/server/services/fetchBookings";
import prisma from "@/lib/prisma";

const MOCK_APARTMENTS = [
  { name: "cala", googleCalendarId: "mock" },
  { name: "cabana", googleCalendarId: "mock" },
] as const;

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (_req, res) => {
  // Mock mode: use stub data, no Prisma
  if (process.env.NEXT_PUBLIC_MOCK_APARTMENTS_DATA === "1") {
    const [calaEventsResponse, cabanaEventsResponse] = await Promise.all(
      MOCK_APARTMENTS.map((apt) => fetchBookings(apt.name, apt.googleCalendarId))
    );
    const bookingsReservation = {
      cala: calaEventsResponse,
      cabana: cabanaEventsResponse,
    };
    if (
      calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL &&
      cabanaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
    ) {
      res.status(200).json({
        status: BookingsInfoResponseStatus.SUCCESFUL,
        fullBookedPeriods: intersectDateRanges(
          calaEventsResponse.bookedPeriods,
          cabanaEventsResponse.bookedPeriods
        ),
        ...bookingsReservation,
      } as IBookingsInfoResponseSuccessful);
    } else if (
      calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL ||
      cabanaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
    ) {
      res.status(200).json({
        status: BookingsInfoResponseStatus.PARTIAL,
        ...bookingsReservation,
      } as IBookingsInfoResponsePartial);
    } else {
      res.status(200).json({
        status: BookingsInfoResponseStatus.ERROR,
        ...bookingsReservation,
      } as IBookingsInfoResponseError);
    }
    return;
  }

  const apartments = await prisma.apartment.findMany({
    select: { name: true, googleCalendarId: true },
    where: { type: "APARTAMENT" },
  });

  const aptsSort = apartments.slice(0, 2).sort((a, _) => (a.name === "cala" ? 0 : 1))


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

export default router.handler({
  onError: (err, _req, res) => {
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
});
