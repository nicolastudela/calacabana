import { BookingPeriod } from "@/types/shared";

import { isSameDay, addDays, isBefore, isAfter } from 'date-fns'

function areOverlappingRanges(R1: BookingPeriod, R2: BookingPeriod) {
  return (isSameDay(R1[0],R2[1]) || isBefore(R1[0],R2[1])) && (isSameDay(R2[0],R1[1]) || isBefore(R2[0],R1[1]))
}

/**
 * 
 * Given 2 Booking periods. Will calculate the union/join.
 * It will try combine both periods into a single one, since they overlaps or are consecutive. If not it will return both periods sorted.
 * 
 * 
 * 
 * @param range1: BookingPeriod
 * @param range1: BookingPeriod
 * @return Array Booking Periods. Will contain one element if periods can be joind into one, or two different if they are not possible to combine 
 */
const joinBookingPeriods: (range1: BookingPeriod, range2: BookingPeriod) => BookingPeriod[] = ( range1: BookingPeriod, range2: BookingPeriod) => {
  if (!range1 && !range2) {
    throw new Error("Can't join if both are undefined range");
  }

  if (!range1) {
    return [range2];
  } 

  if (!range2) {
    return [range1];
  }  

  // if are overlapping we know its one result
  if (areOverlappingRanges(range1, range2))  {
    let start, end;
    start = (range1[0] <= range2[0]) ? range1[0] : range2[0]
    end = (range1[1] >= range2[1]) ? range1[1] : range2[1]
    return [[start,end]];
  } 
  
  let result : [BookingPeriod, BookingPeriod];
  // if they not orverlaps then will have 2 periods as result
  if (range1[0] < range2[0] && range1[1] < range2[1]) {
    result = [range1,range2]
  } else if (range2[0] < range1[0] && range2[1] < range1[1]) {
    result = [range2, range1];
  } else {
    throw new Error("Or either the arrays were overlapping and something went bad")
  }

  // we try to group result arrays if its possible (arrays ends meet)
  if ((isSameDay(result[0][1],result[1][0])) || isSameDay(addDays(result[0][1], 1),result[1][0])) {
    return [[result[0][0], result[1][1]]];
  } else {
    return result;
  }
}


/**
 * 
 * Given 2 arrays of booking periods (one per apt). Calculates the union/join of both booked periods into a single array.
 * Where it will also concatenate consecutive periods. Meaning if we have two periods [2,5] and [5,7] will contain a single
 * period [2,7]. 
 * 
 * @param p: Array of Booking Periods (best if its sorted asc). Representing booked periods for an apartment
 * @param q: Array of Booking Periods (best if its sorted asc). Representing booked periods for an apartment
 * @return Array Booking Periods. Each BookingPeriod represents where one or the other aparment is booked.  
 */
const joinArrayBookingPeriods = (p: BookingPeriod[], q: BookingPeriod[]) => {
  const allBookingPeriods: BookingPeriod[] = p.concat(q);
  // sort periods by startDate
  allBookingPeriods.sort((a,b) => { 
    if (isAfter(a[0],b[0])) {
      return 1
    } else if (isSameDay(a[0], b[0])) {
      return 0
    }
    return -1;
  })

  return allBookingPeriods.reduce((prev: BookingPeriod[], curr: BookingPeriod) => {
    if (prev.length > 0) {
      const joinedBookingPeriod: BookingPeriod[] = joinBookingPeriods(prev[prev.length -1], curr);
      return prev.slice(0,prev.length - 1).concat(joinedBookingPeriod)
    } else {
      return prev.concat([curr])
    }
  }, [] as BookingPeriod[])
}

export default joinArrayBookingPeriods;