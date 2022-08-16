import {
  GenericResponseStatus,
  IGenericErrorRes,
  ISuccessGenericRes,
  IUserInquiryRequestSerialized,
  IUserInquiryResposePayload,
} from "@/types/api";
import { UserInquiryRequest } from "@/types/shared";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({ error: err });
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).post(async (req, res) => {
  try {
    const userInquiryReq = req.body as IUserInquiryRequestSerialized


    // TODO(#41): replace this with real implementation (emails)
    setTimeout(function timeout() {
      let resp
      if (userInquiryReq.userContact.firstName === "error") {
        resp = {
          status: GenericResponseStatus.ERROR,
          isError: true,
          data: null,
          error: "bad mail",
        } as IGenericErrorRes
      } else {
        resp = {
          status: GenericResponseStatus.SUCCESFUL,
          isError: false,
          data: null,
        } as ISuccessGenericRes<IUserInquiryResposePayload>
      }
      res
        .status(200)
        .json(resp)
    }, 1000);
  } catch (error) {
    res.status(200).json({ isError: true, data: null, error} as IGenericErrorRes)
  }
});

export default handler;
