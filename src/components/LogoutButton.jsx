import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleLogout = () => {
      // Ajoutez ici votre logique de déconnexion
      // Par exemple, vous pouvez exécuter une action de déconnexion ici
      // Puis, fermez la boîte de dialogue
      setOpen(false);
    };

    return ( 
        <div>
        <Button onClick={handleOpen} variant="contained" color="secondary">
        <LogoutIcon /> Se déconnecter
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
      </div>



    );
}
 
export default LogoutButton
;