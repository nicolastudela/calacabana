import { Box, BoxProps, Divider, useBreakpointValue } from "@chakra-ui/react"
import React from "react";
import BookingButton from "./BookingButton"
import BookingDates from "./BookingDates"


interface IBookingDatesContainerProps extends BoxProps {
  apartmentName: string;
  forceInline: boolean;
  onDatesSelected: (dates: Date[] | null) => void;
  defaultDates?: [string, string];
  displayName: string;
  excludeDatesRanges?: Date[][];
}

const BookingDatesContainer = ({
  apartmentName,
  displayName,
  forceInline,
  onDatesSelected,
  defaultDates,
  excludeDatesRanges,
  ...props}:IBookingDatesContainerProps,
  ref: React.ForwardedRef<HTMLDivElement>) => {
    const isMobile = useBreakpointValue({ base: true, md: false });


  return (
    <Box
    display="flex"
    alignItems={"center"}
    flexDirection={"column"}
    rounded={{ base: "none", md: "md" }}
    width={"fit-content"}
    margin="auto"
    padding={{ base: "unset", md: "24px" }}
    borderTop="0"
    borderLeft="0"
    borderBottom={{base:"none", md: "2px solid"}}
    borderRight={{base:"none", md: "2px solid"}}
    borderColor="brand.500"
    shadow={{base:"none", md: "brand"}}
  >
    <BookingDates
      
      m={"auto"}
      width="fit-content"
      apartmentName={displayName}
      forceInline={!!isMobile}
      onDatesSelected={onDatesSelected}
      excludeDatesRanges={excludeDatesRanges}
      defaultDates={defaultDates}
    />
    {!isMobile && (
      <>
        <Divider my={4} width="75%" />
        <BookingButton
          // enabled={!!datesSelected}
          onBookingAction={() => {}}
        />
      </>
    )}
  </Box>  
  )
}

export default React.forwardRef<HTMLDivElement, IBookingDatesContainerProps>(
  BookingDatesContainer
);
