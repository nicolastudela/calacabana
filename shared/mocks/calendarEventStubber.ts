import { BookingsInfoResponseStatus, IAparmentBookingsResponseSuccessful } from "@/types/api";
import { APARMENTS_NAME } from "@/types/shared";
import { addDays } from "date-fns"; 


const stubEvents = (apartment: APARMENTS_NAME) => {
    return Promise.resolve({
        status: BookingsInfoResponseStatus.SUCCESFUL,
        statusText: "OK",
        bookedPeriods: apartment === APARMENTS_NAME.CABANA? 
        [[ addDays(new Date(), 3), addDays(new Date(), 5)], [ addDays(new Date(), 10), addDays(new Date(), 18)]]
        : [[ addDays(new Date(), 7), addDays(new Date(), 9)], [ addDays(new Date(), 10), addDays(new Date(), 30)]]
    } as IAparmentBookingsResponseSuccessful) 
}

export default stubEvents;