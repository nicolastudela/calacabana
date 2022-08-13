import { IUserInquiryRequestSerialized, IUserInquiryRespose } from "@/types/api";
import { UserInquiryRequest } from "@/types/shared";
import userInquiryRequestSerialize from "@/utils/serializers/userInquirySerializer";
import { GenericRes, post, responseIsOk } from "./fetch";

const postUserInquiry = async (userInquiryReq: UserInquiryRequest) => {
  const response = await post<IUserInquiryRequestSerialized, GenericRes>("/api/contact", userInquiryRequestSerialize(userInquiryReq));
  if (response.isError) {
    return response;
  } else {
    return response as unknown as IUserInquiryRespose
  }
};

export default postUserInquiry;
