import { APARMENTS_NAME, BookingPeriod, UserInquiry } from "@/types/shared";

export enum BookingsInfoResponseStatus {
  SUCCESFUL = "OK",
  PARTIAL = "PARTIAL",
  ERROR = "ERROR",
}

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

interface IBookingsInfoResponse  {
  status: BookingsInfoResponseStatus;
  cala: IAparmentBookingsResponse;
  cabana: IAparmentBookingsResponse;
}

// TODO (#44) : These three types shouldn't exist anymore.
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

export interface IUserInquiryRequestSerialized {
  apartment: APARMENTS_NAME;
  period: [string, string];
  userContact: UserInquiry;
  apartmentLink: string
}

export type IUserInquiryResposePayload  = null