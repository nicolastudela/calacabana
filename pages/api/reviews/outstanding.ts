

import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import fetchOutStandingReviews from "@/server/services/fetchOutstandingReviews";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (_req, res) => {
  const reviewsResponse = await fetchOutStandingReviews();
  res
  .status(200)
  .json(reviewsResponse)
})

export default router.handler({
  onError: (err, _req, res) => {
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
});