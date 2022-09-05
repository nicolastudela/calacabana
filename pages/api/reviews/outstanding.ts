

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import fetchOutStandingReviews from "api-services/fetchOutstandingReviews";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (_req, res) => {
  const reviewsResponse = await fetchOutStandingReviews();
  res
  .status(200)
  .json(reviewsResponse)
})

export default handler;