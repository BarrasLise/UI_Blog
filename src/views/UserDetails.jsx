import { Box, Typography } from "@mui/material";
import UserForm from "../components/UserForm";

const UserDetails = () => {

  const fields = [
    {
      code : 'Pseudo',
      label : 'Pseudo',
      type : 'text'
    }, 
    {
      code : 'Firstname',
      label : 'Prénom',
      type : 'text'
    },
    {
      code : 'Lastname',
      label : 'Nom',
      type : 'text'
    },
    {
      code : 'Email',
      label : 'Email',
      type : 'text'
    }, 
    {
      code : 'Is_Admin',
      type : 'select'
    }
  ];

  return (
    <>
    <Box component="div" className="form" 
        sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    // maxWidth : "900px"
        }}>
          
        <Typography variant="h2">Détails de l'utilisateur</Typography>
        <UserForm fields={fields} />
    </Box>
    </>
  );
};

export default UserDetails;