// 1. Import `extendTheme`
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const breakpoints = createBreakpoints({
  sm: '768px',
  md: '1024px',
  lg: '1440px',
  xl: '1740px',
  '2xl': '2040px'
});

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config,
  breakpoints,
  semanticTokens: {
    colors: {
      white: {
        default: '#FFFFFF',
        _dark: '#242529'
      },
      black: {
        default: '#121625',
        _dark: '#FFFFFF'
      },
      gray_1: {
        default: '#F8F8F9',
        _dark: '#101011'
      },
      gray_2: {
        default: '#F0F0F3',
        _dark: '#1D1E22'
      },
      gray_3: {
        default: '#E6E6EA',
        _dark: '#323339'
      },
      gray_4: '#A5A8B3',
      gray_5: {
        default: '#8C909C',
        _dark: '#757883'
      },
      gray_6: {
        default: '#515561',
        _dark: '#3D4150'
      },

      primary: '#32D4A4',
      primary_pastel: 'rgba(50, 212, 164, 0.1)',
      primary_neon: '#36E4A6',
      primary_dark: '#09C598',

      primary_graded: 'linear-gradient(90deg, #36859D 0%, #32D4A4 100%)',

      cancel: '#EC555E',

      red: '#D04566',
      light_blue: '#3FCBF8',
      blue: '#3684FA',
      orange: '#EDA73F',
      blue_pastel: 'rgba(68, 105, 235, 0.1)'
    }
  }
});

export { theme };
