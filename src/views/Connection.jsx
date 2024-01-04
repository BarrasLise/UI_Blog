import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import {  Container, CssBaseline } from '@mui/material';


const Connection = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return ( 
    <>
        <CssBaseline />
        <Container maxWidth={"lg"}>

          {isLoginForm ? (
              <Login switchForm={switchForm} />
          ) : (
              <Register switchForm={switchForm} />
          )}

        </Container>
    </>
   );
}
 
export default Connection;