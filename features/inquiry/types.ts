import { BookeableValidPeriod } from "../booking/types";

export type UserInquiry = UserData & {
  body: string;
};

export type UserInquiryRequest = {
  apartmentName: string;
  // apartmentId: Number;
  period: BookeableValidPeriod;
  userContact: UserInquiry;
  apartmentLink: string;
}

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
};