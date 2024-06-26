import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as HttpProvider } from 'use-http'
import AuthProvider from './contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';
import {  ThemeProvider } from '@mui/material/styles';
import theme from "./components/Theme";
import EntityProvider from './contexts/EntityContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  cachePolicy: 'no-cache', 
  credentials: 'include', 
  headers: 
  {
  'Content-Type': 'application/json',
  }, 
};

root.render(
  //en local 
  <HttpProvider url={"http://localhost/1A/BARRAS/blog/api/v1"} options={options}>
  {/* //   En ligne       */}
  {/* <HttpProvider url={"https://coursx75.fr/1A/BARRAS/blog/api/v1"} options={options}>    */}
{/* <HttpProvider url={"https://coursx75.fr/2023-2024/2A_X75/BARRAS/blog/api/v1"} options={options}>   */}
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <AuthProvider>   
          <EntityProvider>   
         
            <App />
          </EntityProvider>    

        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  </HttpProvider>

);

