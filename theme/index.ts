import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import DatePicker from './components/DatePicker';

import Link from './components/Link'

const colors = {
  brand: {
    100: '#b7d4d0',
    200: '#649e94',
    400: '#478c80',
    500: '#347a6c',
    600: '#306e61',
    700: '#2b5f53',
    800: '#255045',
    900: '#19362d',
  },
};

const fonts = {
  body: "Montserrat, sans-serif",
  heading: "Montserrat, sans-serif",
  mono: "Montserrat, monospace",
};

const shadows = {
  brand: 'rgb(100, 158, 148) 2px 3px 6px'
}

const overrides = {
  colors,
  fonts,
  shadows,
  components: {
    Link,
    DatePicker
  }
}



// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({config, ...overrides})

export default theme
