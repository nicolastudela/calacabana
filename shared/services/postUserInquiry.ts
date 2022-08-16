import { IUserInquiryRequestSerialized, IUserInquiryResposePayload, ISuccessGenericRes } from "@/types/api";
import { UserInquiryRequest } from "@/types/shared";
import userInquiryRequestSerialize from "@/utils/serializers/userInquirySerializer";
import { post } from "./fetch";

const postUserInquiry = async (userInquiryReq: UserInquiryRequest) => {
  return post<IUserInquiryRequestSerialized, IUserInquiryResposePayload>("/api/contact", userInquiryRequestSerialize(userInquiryReq));
};

export default postUserInquiry;
