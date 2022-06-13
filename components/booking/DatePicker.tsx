import Datepicker, {registerLocale} from "react-datepicker";
import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

export interface DatePickerProps extends BoxProps {
  startDate: Date | null;
  endDate: Date | null;
  onChangeDates: (dates: [Date | null,Date | null]) => void;
  excludeDates: Date[] | undefined;
}

const DatePicker = ({startDate, endDate, onChangeDates, excludeDates}: DatePickerProps) => {

  const datepickerStyles = useStyleConfig('DatePicker');
  return (
    <Box  __css={datepickerStyles}>
      <Datepicker
        selected={startDate}
        onChange={onChangeDates}
        startDate={startDate}
        endDate={endDate}
        excludeDates={excludeDates}
        selectsRange
        locale={"es"}
        inline
      />
  </Box>
  )
}

export default DatePicker;