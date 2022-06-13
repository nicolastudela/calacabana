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
  fullBookedPeriods: Date[][];
}

export interface IBookingsInfoResponsePartial extends IBookingsInfoResponse {
  status: BookingsInfoResponseStatus.PARTIAL;
}

export interface IBookingsInfoResponseError  {
  status: BookingsInfoResponseStatus.ERROR;
}

interface IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus;
}

export interface IAparmentBookingsResponseSuccessful extends IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus.SUCCESFUL;
  bookedPeriods: Date[][];
}

export interface IAparmentBookingsResponseError extends IAparmentBookingsResponse {
  status: BookingsInfoResponseStatus.ERROR;
  errorCode?: number;
  errorStatusText?: string;
  errorsDetails?: string | undefined
}