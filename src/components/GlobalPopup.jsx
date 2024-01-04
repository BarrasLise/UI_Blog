
import React, { useContext } from 'react';
import { EntityContext } from '../contexts/EntityContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const GlobalPopup = () => {
  const { alertOpen, alertMessage, alertSeverity, setAlertOpen } = useContext(EntityContext);
  const navigate = useNavigate();

  console.log('alertOpen:', alertOpen);
  console.log('alertMessage:', alertMessage);
  console.log('alertSeverity:', alertSeverity);
  console.log('popup');

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // closePopup();
    setAlertOpen(false);
    navigate('/');
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={alertOpen}
      autoHideDuration={10000}
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
