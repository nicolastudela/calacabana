import { IUserInquiryRequestSerialized } from "@/types/api";
import { UserInquiryRequest } from "@/types/shared";
import { bookeableValidPeriodSerialize } from "./bookingPeriodSerializer";

const userInquiryRequestSerialize = (userInquiry: UserInquiryRequest) => {
  return { ...userInquiry, period: bookeableValidPeriodSerialize(userInquiry.period)} as IUserInquiryRequestSerialized
}

export default userInquiryRequestSerialize;