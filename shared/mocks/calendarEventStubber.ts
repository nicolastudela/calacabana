import { BookingsInfoResponseStatus, IAparmentBookingsResponseSuccessful } from "@/types/api";
import { addDays } from "date-fns"; 


const stubEvents = (apartmentName: string) => {
    return Promise.resolve({
        status: BookingsInfoResponseStatus.SUCCESFUL,
        statusText: "OK",
        bookedPeriods: apartmentName === "cabana"? 
        [[ addDays(new Date(), 3), addDays(new Date(), 5)], [ addDays(new Date(), 10), addDays(new Date(), 18)]]
        : [[ addDays(new Date(), 7), addDays(new Date(), 9)], [ addDays(new Date(), 10), addDays(new Date(), 30)]]
    } as IAparmentBookingsResponseSuccessful) 
}

export default stubEvents;