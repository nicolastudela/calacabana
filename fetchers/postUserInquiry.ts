import { IUserInquiryRequestSerialized, IUserInquiryResposePayload, ISuccessGenericRes } from "@/types/api";
import { UserInquiryRequest } from "@/types/shared";
import userInquiryRequestSerialize from "server/serializers/userInquirySerializer";
import { post } from "../lib/httpClient";

const postUserInquiry = async (userInquiryReq: UserInquiryRequest) => {
  return post<IUserInquiryRequestSerialized, IUserInquiryResposePayload>("/api/contact", userInquiryRequestSerialize(userInquiryReq));
};

export default postUserInquiry;
