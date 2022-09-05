
import { BookingsInfoResponseStatus, IAparmentBookingsResponseError, IAparmentBookingsResponseSerializedSuccessful, IAparmentBookingsResponseSuccessful } from "@/types/api";
import { bookingPeriodSerialize } from "@/utils/serializers/bookingPeriodSerializer";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import fetchBookings from "../../../api-services/fetchBookings";
import { APARMENTS_NAME } from "@/types/shared";
import joinArrayBookingPeriods from "@/utils/joinDateRanges";


const serializeBookingPeriods = (bookings: IAparmentBookingsResponseSuccessful) => {
  const serializedDates: [string, string][] = bookings.bookedPeriods.map(bookingPeriodSerialize)
  return {
    status: bookings.status,
    bookedPeriods: serializedDates,
  } as IAparmentBookingsResponseSerializedSuccessful
} 

const handler = nc<NextApiRequest, NextApiResponse>({ 
  onError: (err, _req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: err });
  },
  attachParams: true 
}).get(async (req, res) => {
  const apartmentName = req.query.apartment as APARMENTS_NAME;
  const apartmentNames = Object.values(APARMENTS_NAME).filter(x => typeof x === 'string') as String[]
  if (!req.query.apartment || !(apartmentNames.find((x) => x == apartmentName))) {
    res.status(404).end("Apartment not found");
    return;
  }

  let bookingsResponse: IAparmentBookingsResponseSuccessful | IAparmentBookingsResponseError;
  // if its compound property
  if (apartmentName === APARMENTS_NAME.CALACABANA) {
    const [calaEventsResponse, cabanaEventsResponse] = await Promise.all([
      fetchBookings(APARMENTS_NAME.CALA),
      fetchBookings(APARMENTS_NAME.CABANA)
    ]);

    if (
      calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL &&
      cabanaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
    ) {
      bookingsResponse = {
        status: BookingsInfoResponseStatus.SUCCESFUL,
        bookedPeriods: joinArrayBookingPeriods(
          calaEventsResponse.bookedPeriods,
          cabanaEventsResponse.bookedPeriods
          )
        } as IAparmentBookingsResponseSuccessful
      } else {
        bookingsResponse = {
          status: BookingsInfoResponseStatus.ERROR,
          errorsDetails: `Apt-Cala status: ${calaEventsResponse.status}. Apt-Cabana status: ${cabanaEventsResponse.status}.`,
          } as IAparmentBookingsResponseError
      }
  } else {
    bookingsResponse = await fetchBookings(req.query.apartment as APARMENTS_NAME);
  }
  
  const serializedResponse = (bookingsResponse.status === BookingsInfoResponseStatus.SUCCESFUL) ? serializeBookingPeriods(bookingsResponse) : bookingsResponse;

  res
  .status(200)
  .json(serializedResponse)
});


export default handler;

