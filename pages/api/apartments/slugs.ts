import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { toErrorWithMessage } from "@/server/utils/genericErrorsHandler";
import { GenericResponseStatus, IGenericErrorRes } from "@/types/api";
import fetchApartmentSlugs from "@/server/services/fetchApartmentSlugs";


const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (_req, res) => {

  const slugs = await fetchApartmentSlugs()

  try {
    res.status(200).json({
      status: GenericResponseStatus.SUCCESFUL,
      isError: false,
      data: slugs,
    });

  } catch (error) {
    res
      .status(200)
      .json({ isError: true, data: null, error: toErrorWithMessage(error).message } as IGenericErrorRes);
  }
});

export default handler;