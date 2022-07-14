
import { BookingsInfoResponseStatus, IAparmentBookingsResponseSerializedSuccessful, IAparmentBookingsResponseSuccessful } from "@/types/api";
import { toYYYYMMDD } from "@/utils/date";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import fetchBookings from "../../../services/fetchBookings";
import { APARMENTS_NAME } from "../../../types/shared";


const serializeBookingPeriods = (bookings: IAparmentBookingsResponseSuccessful) => {
  const serializedDates: [string, string][] = bookings.bookedPeriods.map((period: [Date, Date]) => (
    [toYYYYMMDD(period[0]), toYYYYMMDD(period[1])]
  ))
  return {
    status: bookings.status,
    bookedPeriods: serializedDates,
  } as IAparmentBookingsResponseSerializedSuccessful
} 

const handler = nc<NextApiRequest, NextApiResponse>({ 
  onError: (err, _req, res) => {
    res.status(500).json({ error: err });
  },
  attachParams: true 
}).get(async (req, res) => {
  const bookingsResponse = await fetchBookings(req.query.apartment as APARMENTS_NAME);
  const serializedResponse = bookingsResponse.status === BookingsInfoResponseStatus.SUCCESFUL ? serializeBookingPeriods(bookingsResponse) : bookingsResponse;

  res
  .status(200)
  .json(serializedResponse)
  

  // res.send(`Hello ${req.query?.apartment}`);
});


export default handler;

