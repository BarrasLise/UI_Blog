import React, {useContext} from 'react';
import Navbar from "./components/Navbar";
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import AppRoutes from './views/AppRoutes';
import Connection from "./views/Connection";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    //build 
    // <Router basename="/1A/BARRAS/blog"> 
     // //en local : 
    <>
    <Router>
        <CssBaseline />
        <Navbar />
        <Container maxWidth={'xl'} sx={{mt:"20px"}}>
          {isLoggedIn ?  <AppRoutes /> :  <Connection />}
        </Container>
    </Router>
    </>
  );
}

export default App;
