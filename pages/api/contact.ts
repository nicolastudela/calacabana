import { GenericResponseStatus, IUserInquiryRequestSerialized, IUserInquiryRespose } from "@/types/api";
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
  const userInquiryReq = req.body as IUserInquiryRequestSerialized
  

  // TODO(#41): replace this with real implementation (emails)
  console.log(userInquiryReq)
  setTimeout(() => res
  .status(200)
  .json({
    status: userInquiryReq.userContact.firstName === "error" ? GenericResponseStatus.ERROR : GenericResponseStatus.SUCCESFUL,
    data: {}
  } as IUserInquiryRespose), 1000)
});

export default handler;