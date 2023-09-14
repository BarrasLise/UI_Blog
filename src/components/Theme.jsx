import { createTheme } from '@mui/material/styles';

 const theme = createTheme({
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