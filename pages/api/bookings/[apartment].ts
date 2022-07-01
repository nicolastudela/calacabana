
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import fetchBookings from "../../../services/fetchBookings";
import { APARMENTS_NAME } from "../../../types/shared";

const handler = nc<NextApiRequest, NextApiResponse>({ 
  onError: (err, _req, res) => {
    res.status(500).json({ error: err });
  },
  attachParams: true 
}).get(async (req, res) => {
  const bookings = await fetchBookings(req.query.apartment as APARMENTS_NAME);

  res
  .status(200)
  .json(bookings)
  

  // res.send(`Hello ${req.query?.apartment}`);
});


export default handler;

