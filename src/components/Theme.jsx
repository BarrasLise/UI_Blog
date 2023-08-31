import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: 15,
    },
    palette: {
      inherit : {
        // main : "#000",//noir

      },
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
      a: {
        styleOverrides: {
          root: {
            color : "inherit",
            '&:hover': {
              color : "inherit",
            }, 
            '&:visited': {
              color : "inherit",
            }, 

  
          }
        }
      },
      MuiBox: {
        styleOverrides: {
          root: {
  
  
          }
        }
      },
      
      // MuiTextField : {
      //   styleOverrides: {
      //       root: {
              
      //         '& label.Mui-hover': {
      //           color: 'primary',
      //         },
      //         '& label.Mui-focused': {
      //           color: 'primary',
      //         },
      //         '& .MuiInput-underline:after': {
      //           borderBottomColor: 'black',
      //         },
      //         '& .MuiOutlinedInput-root': {
      //           '& fieldset': {
      //             borderColor: 'primary',
      //           },
      //           '&:hover': {
      //             borderColor: 'primary',
      //             borderWidth: '0.15rem',

      //           },
              
      //           '&:hover fieldset': {
      //             borderColor: 'primary',
      //             borderWidth: '0.15rem',
      //           },
      //           '&.Mui-focused fieldset': {
      //             borderColor: 'primary',
      //           },
      //         },
            
      //     },
      //   },
      // },
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       // backgroundColor: '#3bb4fc',
      //       color: 'white',
      //     //  // Styles au survol
      //       ':hover': {
      //         backgroundColor: '3FB8FEff',
      //         color: '#30b8bc',
      //       },
      //       '&.NavButton': {
      //         textDecoration: 'none',
      //         my: 2,
      //         color: 'inherit',
      //       },
      //       '&.NavButton:hover': {
      //         color: '#3bb4fc',
      //       },
      //       '&.IconButton': {
      //         color : '#3bb4fc',
      //       },
      //     },
      //   },
      // },
      // MuiTypography: {
      //   styleOverrides: {
      //     root: {
              
      //     },
            
      //       '&.Navbar': {
      //         textDecoration: 'none', 
      //         color: 'inherit'
      //       },
      //       '&.petitTitre': {
      //         mr: 2,
      //         display: { xs: 'flex', md: 'none' },
      //         flexGrow: 1,
      //         fontFamily: 'monospace',
      //         fontWeight: 700,
      //         letterSpacing: '.3rem',
      //         color: 'inherit',
      //         textDecoration: 'none',
      //       },
      //     },
      //   },
      // },
      MuiAvatar: {
        styleOverrides: {
          root:{
            
  
          },
        },
      },
    },
  });

export default theme;