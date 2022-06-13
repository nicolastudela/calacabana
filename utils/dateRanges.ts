import { addDays, isAfter, isBefore } from "date-fns";



interface RangesIterator {
  allRanges: Date[][];
  move: () => void;
  range: () => Date[];
}

/**
 * 
 * @param {sorted ranges. Ai[n]<Ai[n+1] && Ai[n]<Ai+1[n]} A Array
 * @param {sorted ranges. Bi[n]<Bi[n+1] && Bi[n]<Bi+1[n]} B Array
 */
const intersectDateRanges = (A: Date[][] = [], B: Date[][] = []) => {

  const buildRangeObj = (allRanges : Date[][]) => (
    { allRanges, 
      move() {
        this.allRanges = this.allRanges.slice(1);
      },
      range() {
        return this.allRanges[0];
      }
    } as RangesIterator
  )
  
  const calculateRangesOrder = ( rngIt1: RangesIterator, rngIt2: RangesIterator) => {
    const range1 = rngIt1.range(); 
    const range2 = rngIt2.range();
  
    if (!range1 || !range2) {
      return { found: false };
    }
  
    if (range1[0] >= range2[0])  {
      return {
        ranges: [rngIt1,rngIt2],
        found: true,
      }
    } else {
      return {
        ranges: [rngIt2,rngIt1],
        found: true,
      }
    } 
  }

  let intersectons = [];
  let rangeOrder = calculateRangesOrder(buildRangeObj(A),buildRangeObj(B));
  while (rangeOrder.found && rangeOrder.ranges) {

    const [rangeStart, rangeEnd] = rangeOrder.ranges;
    
    const P = rangeStart.range();
    const Q = rangeEnd.range();

    if (P[0] > Q[1]) {
      rangeEnd.move();
    } else if (P[0] === Q[1]) {
      intersectons.push([P[0],P[0]]);
      rangeEnd.move();
    } else  { // P[0] < Q[1]
      if (P[1] < Q[1]) {
        intersectons.push([P[0],P[1]]);
        rangeStart.move();
      } else if (P[1] > Q[1]) {
        intersectons.push([P[0],Q[1]]);
        rangeEnd.move();
      } else {
        intersectons.push([P[0],Q[1]]);
        rangeStart.move();
        rangeEnd.move();
      }
    }
    rangeOrder = calculateRangesOrder(rangeStart,rangeEnd);
  }
  
  return intersectons;

};

export {
  intersectDateRanges,
}