import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { GenericResponseStatus, IGenericErrorRes } from "@/types/api";
import { toErrorWithMessage } from "server/utils/genericErrorsHandler";
import fetchApartments, {
  FETCH_APARTMENTS_INCLUDE_OPTION,
  FETCH_APARTMENTS_INCLUDE_OPTIONS,
} from "@/server/services/fetchApartments";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (req, res) => {
  const { include } = req.query;

  const includes =
    include && typeof include === "string"
      ? ({includes: include
          .split(",")
          .filter((incl) =>
            FETCH_APARTMENTS_INCLUDE_OPTIONS.includes(incl as any)
          ) as FETCH_APARTMENTS_INCLUDE_OPTION[]})
      : null;
  try {
    const apartments = await fetchApartments(includes);

    if (!apartments) {
      res.status(404).json({
        status: GenericResponseStatus.SUCCESFUL,
        isError: false,
        data: null,
      });
    } else {
      res.status(200).json({
        status: GenericResponseStatus.SUCCESFUL,
        isError: false,
        data: apartments,
      });
    }
  } catch (error) {
    res.status(200).json({
      isError: true,
      data: null,
      error: toErrorWithMessage(error).message,
    } as IGenericErrorRes);
  }
});

export default handler;
