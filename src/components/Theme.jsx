import { createTheme } from '@mui/material/styles';
// import Quicksand from '../font/Quicksand'; 

 const theme = createTheme({
  typography: {
    // fontFamily : 'Quicksand, sans-serif',
    fontFamily: [
      'Quicksand',
      // 'Itim',
      // 'Nosifer',
      
      'cursive',
    ].join(','),
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       @font-face {
  //         font-family: 'Quicksand';
  //         font-style: normal;
  //         font-display: swap;
  //         font-weight: 400;
  //         src: local('Quicksand'), local('Quicksand-Regular'), url(${Quicksand}) format('woff2');
  //         unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  //       }
  //     `,
  //   },

  // },
  palette: {
    mode: 'light',
    primary: {
      main: '#3bb5fc',
      light: '#88E1F8',
      lighter: '#E3F8FD',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText : '#3bb4fc',
    },
    info: {
      main: '#5ce2e4',
      light: '#7ce7e9',
      dark: '#30b8bc',
      contrastText: '#ffffff',

    },
    warning: {
      main: '#fc823b',
    },
  },
 });
export default theme;