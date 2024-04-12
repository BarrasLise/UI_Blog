import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const LogoutButton = () => {
    const [open, setOpen] = useState(false);
    const {unLogin}=useContext(AuthContext);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleLogout = () => {
      unLogin();
      setOpen(false);
    };

    return ( 
        <Box component="div" >
        <Button onClick={handleOpen} >
          <LogoutIcon />
        </Button>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              Se déconnecter
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

    );
}
 
export default LogoutButton
;