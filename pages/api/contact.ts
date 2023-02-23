import {
  GenericResponseStatus,
  IGenericErrorRes,
  IGenericResponse,
  IUserInquiryRequestSerialized,
  IUserInquiryResposePayload,
} from "@/types/api";

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import sgMail from "@sendgrid/mail";
import { toErrorWithMessage } from "server/utils/genericErrorsHandler";
import { toDDMMYYYY } from "@/utils/dates";

export type EmailData = string|{ name?: string; email: string; }


const formatFromYYYYMMDDtoDDMMYYYY = (datStr: string) => toDDMMYYYY(new Date(datStr))

const handleSengridError = (maybeError: unknown) => {
  const error = toErrorWithMessage(maybeError); 

  return {
    isError: true,
    error: error.message
  } as IGenericErrorRes
} 

sgMail.setApiKey(process.env.SENDGRID_KEY as string)

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
    const { apartmentName,  period, apartmentLink, userContact: {firstName, lastName, email, phone, body } } = req.body as IUserInquiryRequestSerialized

    const periodStr = [formatFromYYYYMMDDtoDDMMYYYY(period[0]), formatFromYYYYMMDDtoDDMMYYYY(period[1])];

    let cc: EmailData[] | undefined;
    if (process.env.OTHER_NOTICE_EMAIL_RECIPENTS as string) {
      const otherRecipents = process.env.OTHER_NOTICE_EMAIL_RECIPENTS?.split(",");
      cc = otherRecipents?.map((recip) => ({ email: recip, name: recip} as EmailData))
    }

    
    let resp: IGenericResponse<IUserInquiryResposePayload>;
    try {
      const mailToOwnerResp = await sgMail.send({
        to: process.env.OWNER_NOTICE_EMAIL_RECIPIENT as string,
        cc,
        from: {name: "Calacabana", email: "automated@calacabana.ar"},
        replyTo: email,
        templateId: "d-7153545f200e42c4a6fd20c53a843228",
        dynamicTemplateData: {
          firstName,
          lastName,
          email,
          phone,
          apartment: apartmentName,
          startDate: periodStr[0],
          endDate: periodStr[1],
          body
        }
      });

      try {
        const mailToUser = await sgMail.send({
          to: email,
          from: {name: "Calacabana", email: "automated@calacabana.ar"},
          replyTo: process.env.OWNER_NOTICE_EMAIL_RECIPIENT,
          templateId: "d-6af40358672347bc920313f75b507177",
          dynamicTemplateData: {
            firstName,
            lastName,
            apartment: apartmentName,
            startDate: periodStr[0],
            endDate: periodStr[1],
            body,
            apartmentLink
          }
        })

        res.status(200)
        .json({
          status: GenericResponseStatus.SUCCESFUL,
          isError: false,
          data: null,
        })
      }
      catch(error) {
        res.status(200)
        .json({
          status: GenericResponseStatus.SUCCESFUL,
          isError: false,
          data: null,
        })
        console.error(`[CONTACT-US-OP] Can't send email to the user who made inquiry. Error message: ${toErrorWithMessage(error)}. Errror ${error}`);
      }
    } catch(error) {
        resp = handleSengridError(error);
        res
        .status(200)
        .json(resp)
        console.error(`[CONTACT-US-OP] Can't send the notice email to the owner. Error message: ${toErrorWithMessage(error)}. Errror ${error}`);
    }

  } catch (error) {
    res.status(200).json({ isError: true, data: null, error} as IGenericErrorRes)
  }
});

export default handler;
