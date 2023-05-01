import { IUserInquiryRequestSerialized, IUserInquiryResposePayload, ISuccessGenericRes } from "@/server/types";
import { UserInquiryRequest } from "@/types/types";
import userInquiryRequestSerialize from "server/serializers/userInquirySerializer";
import { post } from "../lib/httpClient";

const postUserInquiry = async (userInquiryReq: UserInquiryRequest) => {
  return post<IUserInquiryRequestSerialized, IUserInquiryResposePayload>("/api/contact", userInquiryRequestSerialize(userInquiryReq));
};

export default postUserInquiry;
