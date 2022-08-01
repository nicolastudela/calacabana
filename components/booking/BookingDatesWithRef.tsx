import React from "react";
import {BookingDatesWithRef, IBookingDatesProps } from "../../components/booking/BookingDates"

export default React.forwardRef<HTMLDivElement, IBookingDatesProps>(
  BookingDatesWithRef
);