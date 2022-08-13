import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  BookingsInfoResponseStatus,
  IBookingsInfoResponseError,
  IBookingsInfoResponsePartial,
  IBookingsInfoResponseSuccessful,
} from "@/types/api";
import intersectDateRanges from "@/utils/intersectDateRanges";
import fetchBookings from "../../../api-services/fetchBookings";
import { APARMENTS_NAME } from "@/types/shared";


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

  const [calaEventsResponse, cabanaEventsResponse] = await Promise.all([
    fetchBookings(APARMENTS_NAME.CALA),
    fetchBookings(APARMENTS_NAME.CABANA)
  ]);

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



  /////

  // if (
  //   calaEventsResponse.status !== BookingsInfoResponseStatus.SUCCESFUL ||
  //   cabanaEventsResponse.status !== BookingsInfoResponseStatus.SUCCESFUL
  // ) {
  //   res
  //     .status(200)
  //     .json({
  //       status: BookingsInfoResponseStatus.PARTIAL,
  //       ...bookingsReservation,
  //     } as IBookingsInfoResponsePartial);
  // } else if (
  //   calaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL ||
  //   cabanaEventsResponse.status === BookingsInfoResponseStatus.SUCCESFUL
  // ) {
  //   res
  //     .status(200)
  //     .json({
  //       status: BookingsInfoResponseStatus.SUCCESFUL,
  //       fullBookedPeriods: intersectDateRanges(
  //         calaEventsResponse.bookedPeriods,
  //         cabanaEventsResponse.bookedPeriods
  //       ),
  //       ...bookingsReservation,
  //     } as IBookingsInfoResponseSuccessful);
  // } else {
  //   res
  //     .status(200)
  //     .json({
  //       status: BookingsInfoResponseStatus.ERROR,
  //       ...bookingsReservation,
  //     } as IBookingsInfoResponseError);
  // }
});
// .post((req,_post,next) => {
//   console.log(`1er post: ${req}`);
//   next();
// }).post((_req,res) => res.status(404).send("LA CONCHA DE TU MADRE ALBOYS"));

export default handler;
