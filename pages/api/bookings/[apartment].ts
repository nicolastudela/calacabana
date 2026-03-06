import {
  BookingsInfoResponseStatus,
  IAparmentBookingsResponse,
  IAparmentBookingsResponseError,
  IAparmentBookingsResponseSerializedSuccessful,
  IAparmentBookingsResponseSuccessful,
} from "@/server/types";
import { bookingPeriodSerialize } from "server/serializers/bookingPeriodSerializer";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import fetchBookings from "../../../server/services/fetchBookings";
import joinArrayBookingPeriods from "@/server/utils/joinDateRanges";
import { stubApartmentSlugs } from "@/shared/mocks/apartmentsDataStubber";

import prisma from "@/lib/prisma";

const MOCK_APARTMENT_NAMES = stubApartmentSlugs();

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

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  if (!req.query.apartment || Array.isArray(req.query.apartment)) {
    res.status(404).end("Apartment not found");
    return;
  }
  const apartmentName = req.query.apartment as string;

  // Mock mode: use stub apartment list, no Prisma. Calendar IDs resolved in fetchBookings.
  if (process.env.NEXT_PUBLIC_MOCK_APARTMENTS_DATA === "1") {
    if (!MOCK_APARTMENT_NAMES.includes(apartmentName as typeof MOCK_APARTMENT_NAMES[number])) {
      res.status(404).end("Apartment not found");
      return;
    }
    let bookingsResponse: IAparmentBookingsResponseSuccessful | IAparmentBookingsResponseError;
    if (apartmentName === "calacabana") {
      const [calaResponse, cabanaResponse] = await Promise.all([
        fetchBookings("cala"),
        fetchBookings("cabana"),
      ]);
      bookingsResponse =
        calaResponse.status === BookingsInfoResponseStatus.SUCCESFUL &&
        cabanaResponse.status === BookingsInfoResponseStatus.SUCCESFUL
          ? {
              status: BookingsInfoResponseStatus.SUCCESFUL,
              bookedPeriods: joinArrayBookingPeriods(
                calaResponse.bookedPeriods,
                cabanaResponse.bookedPeriods
              ),
            }
          : calaResponse.status === BookingsInfoResponseStatus.ERROR
            ? calaResponse
            : cabanaResponse;
    } else {
      bookingsResponse = await fetchBookings(apartmentName);
    }
    const serializedResponse =
      bookingsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
        ? serializeBookingPeriods(bookingsResponse)
        : bookingsResponse;
    res.status(200).json(serializedResponse);
    return;
  }

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
      fetchBookings(subApartment.name)))
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
    bookingsResponse = await fetchBookings(apartment.name);
  }

  const serializedResponse =
    bookingsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
      ? serializeBookingPeriods(bookingsResponse)
      : bookingsResponse;

  res.status(200).json(serializedResponse);
});

export default router.handler({
  onError: (err, _req, res) => {
    console.error(err instanceof Error ? err.stack : err);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
});
