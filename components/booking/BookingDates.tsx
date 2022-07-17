import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { differenceInCalendarDays, format } from "date-fns";

import {
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import DatePicker from "@/components/booking/DatePicker";
import { useRouter } from "next/router";
import {
  flattenDateRanges,
  isBookingDateRangeAvailable,
  validateAndFormatBookingDates,
} from "@/utils/dateRanges";
import { updateQueryStringWithBookingDates } from "@/utils/queryStringHandler";
import { EPageDefaultDatesErrorType } from "@/shared/hooks/usePageDefaultDates";

const DatesInput = ({
  startDate,
  endDate,
  onExpand,
  onError = false,
}: {
  onExpand: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onError?: boolean
}) => {
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startDate && !endDate) {
      endDateInputRef.current?.focus();
    }
  }, [startDate, endDate]);

  const onEndDateClick = useCallback(() => {
    if (startDate && endDate) {
      startDateInputRef.current?.focus();
      endDateInputRef.current?.blur();
    }
  }, [startDate, endDate]);
  return (
    <Flex
      direction={"row"}
      wrap="nowrap"
      gap="0"
      width={"90%"}
      onClick={onExpand}
    >
      <FormControl>
        <FormLabel htmlFor="checkin" fontSize={"xs"}>
          Check In
        </FormLabel>
        <Input
          ref={startDateInputRef}
          w={40}
          id="checkin"
          type="text"
          placeholder="Check In"
          borderRight="0px"
          borderRadius="10px 0px 0px 10px;"
          autoComplete="off"
          value={startDate ? format(startDate, "dd-MM-yyyy") : ""}
          readOnly
          borderColor={onError ? "red" : "unset"}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="checkout" fontSize={"xs"}>
          Check Out
        </FormLabel>
        <Input
          onClick={onEndDateClick}
          ref={endDateInputRef}
          w={40}
          id="checkout"
          type="text"
          placeholder="Check Out"
          borderLeft="0px"
          borderRadius="0 10px 10px 0;"
          autoComplete="off"
          value={endDate ? format(endDate, "dd-MM-yyyy") : ""}
          readOnly
          borderColor={onError ? "red" : "unset"}
        />
      </FormControl>
    </Flex>
  );
};

interface IBookingDatesProps extends BoxProps {
  apartmentName: string;
  forceInline: boolean;
  onDatesSelected: (dates: Date[] | null) => void;
  defaultDates?: [Date, Date];
  excludeDatesRanges?: Date[][];
  defaultDatesError: EPageDefaultDatesErrorType | null | undefined;
}

function BookingDates(
  {
    apartmentName,
    forceInline,
    onDatesSelected,
    defaultDates,
    excludeDatesRanges,
    defaultDatesError,
    ...props
  }: IBookingDatesProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [startDate, setStartDate] = useState<Date | null>(defaultDates ? defaultDates[0] : null);
  const [pickerOpen, setPickerOpen] = useState(forceInline);
  const [endDate, setEndDate] = useState<Date | null>(defaultDates ? defaultDates[1] : null);
  const [error, setError] = useState<boolean>(false);
  //TODO(#19) no visuals are not shown on the component yet
  const router = useRouter();

  useEffect(() => {
    setError(!!defaultDatesError)
  },[defaultDatesError])

  /**
   * Flattens excluded dates (not availbe for booking)
   */
  const excludeDates: Date[] | undefined = useMemo(
    () => flattenDateRanges(excludeDatesRanges),
    [excludeDatesRanges]
  );

  const onChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      if (start && !end) {
        // valid start date
        setStartDate(start);
        if (router) {
          updateQueryStringWithBookingDates(router,[start, null]);
        }
        setEndDate(null);
      // valid range selection
      } else if (start && end && isBookingDateRangeAvailable([start, end], excludeDatesRanges)) {
        setStartDate(start);
        setEndDate(end);
        if (router) {
          updateQueryStringWithBookingDates(router,[start, end]);
        }
        // TODO: maybe move this to some useEffect. It closes/hide date picker when dates are properly selected
        if (!forceInline) {
          setPickerOpen(false);
        }
        onDatesSelected([start, end]);
        setError(false);
      } else { // range selection invalid
        updateQueryStringWithBookingDates(router,null);
        setStartDate(null);
        setEndDate(null);
      }
    },
    [excludeDatesRanges, forceInline, router, onDatesSelected]
  );

  const dateSelectionText = useMemo(() => {
    if (startDate) {
      if (endDate) {
        const nights = differenceInCalendarDays(endDate, startDate);
        return `${nights} noche${nights > 1 ? "s" : ""} en ${apartmentName}`;
      } else {
        return "Selecciona la fecha del check-out";
      }
    }
    return "Selecciona la fecha del check-in";
  }, [apartmentName, startDate, endDate]);

  const onClearDates = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    onDatesSelected(null);
    setError(false);
    if (router) {
      updateQueryStringWithBookingDates(router,null);
    }
  }, [onDatesSelected, router]);

  return (
    <Flex
      direction={"column"}
      ref={ref}
      justifyContent="flex-start"
      {...props}
      gap={4}
    >
      {forceInline ? (
        <Heading fontSize={"lg"} as="h3">
          {dateSelectionText}
        </Heading>
      ) : (
        <DatesInput
          startDate={startDate}
          endDate={endDate}
          onExpand={() => setPickerOpen(true)}
          onError={error}

        />
      )}

      {pickerOpen && (
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          excludeDates={excludeDates}
          onChangeDates={onChange}
        />
      )}
      {(startDate || endDate) && (
        <Button
          variant={"link"}
          textDecoration="underline"
          size="sm"
          onClick={onClearDates}
        >
          Borrar fechas
        </Button>
      )}
    </Flex>
  );
}

export default React.forwardRef<HTMLDivElement, IBookingDatesProps>(
  BookingDates
);
