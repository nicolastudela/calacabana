import { BookingsInfoResponseStatus, IAparmentBookingsResponseSerializedSuccessful, IAparmentBookingsResponseError } from "@/types/api";
import { formatStringDateRange } from "@/utils/dateRanges";


const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    if (data.status === BookingsInfoResponseStatus.SUCCESFUL) {
      const bookedPeriods =  (data as IAparmentBookingsResponseSerializedSuccessful).bookedPeriods;
      return bookedPeriods.map(formatStringDateRange).filter((per): per is [Date,Date] => (!!per && per.length === 2));
    } else {
      const error = data as IAparmentBookingsResponseError;
      throw new Error(`${error.errorsDetails}`);
    }
  }
}

export default fetcher;

