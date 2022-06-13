import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { addDays, differenceInCalendarDays, format, isBefore } from "date-fns";

import { BoxProps, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import DatePicker from "./DatePicker";

const excludedDateRanges = [
  [addDays(new Date(), 1), addDays(new Date(), 5)],
  [addDays(new Date(), 10), addDays(new Date(), 25)]
];

const validRange = (rangeToCompare: [Date, Date]) => {
  // return true;
  return (
    excludedDateRanges.findIndex((range) => {
      // return R1[0] <= R2[1] && R2[0] <= R1[1];
      return (
        isBefore(rangeToCompare[0], range[1]) &&
        isBefore(range[0], rangeToCompare[1])
      );
    }) < 0
  );
};

const excludeDates = excludedDateRanges.flatMap((range) => {
  const dates = [];
  for (
    let lowerBound = range[0];
    lowerBound <= range[1];
    lowerBound = addDays(lowerBound, 1)
  ) {
    dates.push(lowerBound);
  }
  return dates;
});


const DatesInput = ({startDate, endDate, onExpand}: {onExpand: () => void, startDate: Date | null; endDate: Date | null}) => {
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startDate && !endDate) {
      endDateInputRef.current?.focus();
    }
  }, [startDate, endDate])

  const onEndDateClick = useCallback(() => {
    if (startDate && endDate) {
      startDateInputRef.current?.focus();
      endDateInputRef.current?.blur();
    }
  }, [startDate, endDate])
  return (
    <Flex direction={"row"} wrap="nowrap" gap="0" width={"90%"}  onClick={onExpand}>
    <FormControl>
      <FormLabel htmlFor='checkin' fontSize={"xs"}>Check In</FormLabel>
      <Input ref={startDateInputRef}  w={40} id='checkin' type='text' placeholder="Check In" borderRight="0px" borderRadius="10px 0px 0px 10px;" autoComplete="off" value={startDate ? format(startDate, "dd-MM-yyyy") : ''} readOnly/>
    </FormControl>
    <FormControl  >
      <FormLabel htmlFor='checkout' fontSize={"xs"}>Check Out</FormLabel>
      <Input onClick={onEndDateClick} ref={endDateInputRef} w={40} id='checkout' type='text' placeholder="Check Out" borderLeft="0px" borderRadius="0 10px 10px 0;" autoComplete="off" value={endDate ? format(endDate, "dd-MM-yyyy") : ''} readOnly/>
    </FormControl>
    </Flex>
  )
}

interface BookingDatesProps extends BoxProps {
  apartmentName: string; 
  forceInline: boolean;
  onDatesChange: (dates: Date[] | null) => void;
}

const BookingDatesWithRef = React.forwardRef<HTMLDivElement, BookingDatesProps>(function BookingDates({apartmentName, forceInline, onDatesChange, ...props}, ref) {
  const [startDate, setStartDate] = useState<Date| null>(null);
  const [pickerOpen, setPickerOpen] = useState(forceInline)
  const [endDate, setEndDate] = useState<Date| null>(null);


  const onChange = useCallback((dates: [Date | null,Date | null] ) => {
    const [start, end] = dates;
    if (start && !end) {
      // console.log("valid start date");
      setStartDate(start);
      setEndDate(null);
      onDatesChange(null);
    } else if (start && end && validRange([start, end])) {
      // console.log("valid range");
      setStartDate(start);
      setEndDate(end);
      // TODO: maybe move this to some useEffect. It closes/hide date picker when dates are properly selected
      if (!forceInline) {
        setPickerOpen(false);
      }

      onDatesChange([start, end])
    } else {
      // console.log("range invalid dates");
      setStartDate(null);
      setEndDate(null);
      onDatesChange(null);
    }
  },[forceInline, onDatesChange])


  const dateSelectionText = useMemo(() => {
  if (startDate) {
    if (endDate) {
      const nights = differenceInCalendarDays(endDate, startDate);
      return `${nights} noche${nights > 1 ? 's' : ''} en ${apartmentName}`
    } else {
      return "Selecciona la fecha del check-out";
    }
  }
    return "Selecciona la fecha del check-in";
}, [apartmentName, startDate, endDate]);


  const onClearDates = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    onDatesChange(null);
  }, [onDatesChange])


  return (
    <Flex direction={"column"} ref={ref} justifyContent="flex-start" {...props} gap={4}>
        { forceInline ? (<Heading fontSize={"lg"} as="h3">{dateSelectionText}</Heading>): 
          (<DatesInput startDate={startDate} endDate={endDate} onExpand={() =>  setPickerOpen(true)}/>)
        }

        {pickerOpen && (
          <DatePicker startDate={startDate} endDate={endDate} excludeDates={excludeDates} onChangeDates={onChange}/> 
)}
      { (startDate || endDate) && <Button variant={"link"}  textDecoration="underline" size="sm" onClick={onClearDates}>Borrar fechas</Button>}
    </Flex>
  )
});

export default BookingDatesWithRef;
