import { textDecoration } from "@chakra-ui/react";

const Datepicker = {
  baseStyle: {
      color: 'black',
      '.react-datepicker': {
        bg: 'transparent',
      },
      '.react-datepicker__header': {
          background: 'brand.500',
      },
      '.react-datepicker__day': {
        color: 'white',
        width: '3em',
        height: '3rem',
        lineHeight: '3rem',
      },
      '.react-datepicker__day-name': {
        width: '3em',
      },
      '.react-datepicker__day--excluded, .react-datepicker__day--disabled': {
        color: 'gray.500',
        textDecoration: "line-through",
      }
  },
};

export default Datepicker;