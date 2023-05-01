import { IUserInquiryRequestSerialized } from "@/server/types";
import { UserInquiryRequest } from "@/types/types";
import { bookeableValidPeriodSerialize } from "./bookingPeriodSerializer";

const userInquiryRequestSerialize = (userInquiry: UserInquiryRequest) => {
  return { ...userInquiry, period: bookeableValidPeriodSerialize(userInquiry.period)} as IUserInquiryRequestSerialized
}

export default userInquiryRequestSerialize;