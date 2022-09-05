import { APARMENTS_NAME, BookingPeriod, IReview, UserInquiry } from "@/types/shared";


// -----------------------------------------------------
// Basic/Generic Request/Response types for standard requests GET/POST. 

export enum GenericResponseStatus {
  SUCCESFUL = "OK",
  ERROR = "ERROR",
}

export interface IGenericResponse<Payload> { 
  isError: boolean;
  status: GenericResponseStatus;
  data?: Payload
}

export interface IGenericErrorRes extends IGenericResponse<null> {
  isError: true
  error?: string | unknown
  data: null
}

export interface ISuccessGenericRes<Payload> extends IGenericResponse<Payload>{
  isError: false;
  data: Payload;
}

// -----------------------------------------------------

// IBookingsInfoResponse is used to represent /bookings , where it returns booking info of all apartments and 
// period where the whole place is full

export enum BookingsInfoResponseStatus {
  SUCCESFUL = "OK",
  PARTIAL = "PARTIAL",
  ERROR = "ERROR",
}

interface IBookingsInfoResponse  {
  status: BookingsInfoResponseStatus;
  cala: IAparmentBookingsResponse;
  cabana: IAparmentBookingsResponse;
}
export interface IBookingsInfoResponseSuccessful extends IBookingsInfoResponse {
  status: BookingsInfoResponseStatus.SUCCESFUL;
  fullBookedPeriods: BookingPeriod[];
}

export interface IBookingsInfoResponsePartial extends IBookingsInfoResponse {
  status: BookingsInfoResponseStatus.PARTIAL;
}

export interface IBookingsInfoResponseError  {
  status: BookingsInfoResponseStatus.ERROR;
}

// -----------------------------------------------------
// IAparmentBookingsResponse is used to represent /bookings for an specific Aparment
export interface IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus;
}

export interface IAparmentBookingsResponseSuccessful extends IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus.SUCCESFUL;
  bookedPeriods: BookingPeriod[];
}

export interface IAparmentBookingsResponseSerializedSuccessful extends IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus.SUCCESFUL;
  bookedPeriods: [string, string][];
}

export interface IAparmentBookingsResponseError extends IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus.ERROR;
  errorCode?: number;
  errorStatusText?: string;
  errorsDetails?: string | undefined
}

// -----------------------------------------------------
// IUserInquiry Requests/Responses types are meant to be used through IGenericResponse 

export interface IUserInquiryRequestSerialized {
  apartment: APARMENTS_NAME;
  period: [string, string];
  userContact: UserInquiry;
  apartmentLink: string
}

export type IUserInquiryResposePayload  = null
export interface IReviewsResposePayload {
  reviews: IReview[];
}
