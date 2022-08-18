import {
  GenericResponseStatus,
  IGenericErrorRes,
  IGenericResponse,
  ISuccessGenericRes,
  IUserInquiryRequestSerialized,
  IUserInquiryResposePayload,
} from "@/types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import sgMail from "@sendgrid/mail";
import { toErrorWithMessage } from "@/utils/genericErrorsHandler";

export type EmailData = string|{ name?: string; email: string; }

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
    const { apartment,  period, userContact: {firstName, lastName, email, phone, body } } = req.body as IUserInquiryRequestSerialized

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
          apartment,
          startDate: period[0],
          endDate: period[1],
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
            apartment,
            startDate: period[0],
            endDate: period[1],
            body,
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
        console.error(`[CONTACT-US-OP] Can't send email to the user who made inquiry. Error message: ${toErrorWithMessage(error)}. Errror ${error}`);
    }

  } catch (error) {
    res.status(200).json({ isError: true, data: null, error} as IGenericErrorRes)
  }
});

export default handler;
