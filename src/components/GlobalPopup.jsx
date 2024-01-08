import React, { useContext } from 'react';
import { EntityContext } from '../contexts/EntityContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const GlobalPopup = ({ context }) => {
  // const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
  // const ContextChoice = context === "users" ? AuthContext : EntityContext;
  // const contextValue = useContext(ContextChoice);

  // const { alertOpen, alertMessage, alertSeverity, setAlertOpen } = useContext(contextValue);
  const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext) || {};

  // Vérifiez si les valeurs du contexte sont définies avant de les déstructurer
  const { alertOpen, alertMessage, alertSeverity, setAlertOpen } = ContextChoice;

  
  const navigate = useNavigate();

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);

    if (alertSeverity === "success" ){
      navigate('/');
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={alertOpen}
      autoHideDuration={alertSeverity === "success" ? 1000 : 10000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseAlert}
        severity={alertSeverity}
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default GlobalPopup;
