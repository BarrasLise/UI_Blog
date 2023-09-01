import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: 15,
    },
    palette: {
      // inherit : {
      //   // main : "#000",//noir
      // },
      primary: {
        main: '#3bb4fc',//blue clair
        light: '#88E1F8',
        lighter: '#E3F8FD', 
        dark : '#32C3E7',
        darker : '#297db0',
        contrastText : '#fff', //blanc
      },
      secondary : {
        main : '#fff',
        contrastText : '#3bb4fc',
      },
      info: {
        main: '#5ce1e4', //vert d'eau claire
        light : '#7ce7e9',
        dark : '#30b8bc', // vertd'eau foncé
        contrastText : '#000', //noir
      },
      action : {
        visited : '#000',
        visitedOpacity : 1,
        focus : "000",
        focusOpacity: 1,
      }
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            // color : "inherit",
            // '&:hover': {
            //   color : "inherit",
            // }, 
            '&:visited': {
              color : "inherit !important",
            }, 

  
          }
        }
      },
      
    },
  });

export default theme;