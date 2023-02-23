import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { GenericResponseStatus, IGenericErrorRes } from "@/types/api";
import { toErrorWithMessage } from "server/utils/genericErrorsHandler";
import fetchApartment from "@/server/services/fetchApartment";


const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (req, res) => {
  const { name } = req.query;

  try {
    if (!!name && !Array.isArray(name)) {

      const apartment = await fetchApartment(name)

      if (!apartment) {
        res.status(204).json({
          status: GenericResponseStatus.SUCCESFUL,
          isError: false,
          data: null,
        });
      } else {
        res.status(200).json({
          status: GenericResponseStatus.SUCCESFUL,
          isError: false,
          data: apartment,
        });
      }
    } else {
      res.status(404).json({ isError: true, data: null, error: "Apartment name not found" } as IGenericErrorRes)
    }
  } catch (error) {
    res
      .status(200)
      .json({ isError: true, data: null, error: toErrorWithMessage(error).message } as IGenericErrorRes);
  }
});

export default handler;
