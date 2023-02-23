import {
  BookingsInfoResponseStatus,
  IAparmentBookingsResponse,
  IAparmentBookingsResponseError,
  IAparmentBookingsResponseSerializedSuccessful,
  IAparmentBookingsResponseSuccessful,
} from "@/types/api";
import { bookingPeriodSerialize } from "server/serializers/bookingPeriodSerializer";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import fetchBookings from "../../../server/services/fetchBookings";
import joinArrayBookingPeriods from "@/server/utils/joinDateRanges";

import prisma from "@/lib/prisma";

const serializeBookingPeriods = (
  bookings: IAparmentBookingsResponseSuccessful
) => {
  const serializedDates: [string, string][] = bookings.bookedPeriods.map(
    bookingPeriodSerialize
  );
  return {
    status: bookings.status,
    bookedPeriods: serializedDates,
  } as IAparmentBookingsResponseSerializedSuccessful;
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: err });
  },
  attachParams: true,
}).get(async (req, res) => {
  if (!req.query.apartment || Array.isArray(req.query.apartment)) {
    res.status(404).end("Apartment not found");
    return;
  }
  const apartmentName = req.query.apartment as string;

  const apartment = await prisma.apartment.findUnique({
    where: {
      name: apartmentName,
    },
    include: {
      subAparments: true
    }
  });

  // const apartmentNames = Object.values(APARMENTS_NAME).filter(x => typeof x === 'string') as String[]
  // if (!req.query.apartment || !(apartmentNames.find((x) => x == apartmentName))) {
  //   res.status(404).end("Apartment not found");
  //   return;
  // }

  if (!apartment) {
    res.status(404).end("Apartment not found");
    return;
  }

  let bookingsResponse:
    | IAparmentBookingsResponseSuccessful
    | IAparmentBookingsResponseError;
  // if its compound property
  if (apartment.type === "COMPOUND" && apartment.subAparments.length > 0) {
    const responses = await Promise.all(apartment.subAparments.map(subApartment => 
      fetchBookings(subApartment.name, subApartment.googleCalendarId)))
    // if (
    //   responses.every(res => res.status === BookingsInfoResponseStatus.SUCCESFUL)
    // ) {
    //   bookingsResponse = {
    //     status: BookingsInfoResponseStatus.SUCCESFUL,
    //     bookedPeriods: joinArrayBookingPeriods(responses.map(sub => (sub.status === BookingsInfoResponseStatus.SUCCESFUL) ? sub.bookedPeriods)
    //       calaEventsResponse.bookedPeriods,
    //       cabanaEventsResponse.bookedPeriods
    //     ),
    //   } as IAparmentBookingsResponseSuccessful;
    // } else {
    //   bookingsResponse = {
    //     status: BookingsInfoResponseStatus.ERROR,
    //     errorsDetails: `Apt-Cala status: ${calaEventsResponse.status}. Apt-Cabana status: ${cabanaEventsResponse.status}.`,
    //   } as IAparmentBookingsResponseError;
    // }
    bookingsResponse = responses.reduce((prev, curr) => {
      if (prev.status === BookingsInfoResponseStatus.ERROR) {
        return prev
      }
      if (curr.status === BookingsInfoResponseStatus.ERROR) {
        return curr
      }
      return {
        status: BookingsInfoResponseStatus.SUCCESFUL,
        bookedPeriods: joinArrayBookingPeriods(prev.bookedPeriods, curr.bookedPeriods),
      } as IAparmentBookingsResponseSuccessful
    }, { status: BookingsInfoResponseStatus.SUCCESFUL, bookedPeriods: []} as IAparmentBookingsResponseSuccessful)
  } else {
    bookingsResponse = await fetchBookings(
      apartment.name, apartment.googleCalendarId
    );
  }

  const serializedResponse =
    bookingsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
      ? serializeBookingPeriods(bookingsResponse)
      : bookingsResponse;

  res.status(200).json(serializedResponse);
});

export default handler;
