import React, { useContext} from 'react';
import { useFetch } from 'use-http';
import { AuthContext } from "../contexts/AuthContext";
import { Box, Button, Typography, Container} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Loading from "../components/Loading";
import { EntityContext } from "../contexts/EntityContext";
import Form from "../components/Form";


const Create = () => {
  const {error, loading } = useFetch('posts', {}, []);
  const {createEntity } = useContext(EntityContext);
  const {user : current_user}=useContext(AuthContext);
  const { data : categories} = useFetch( 'categories' ,{}, []);
  
  const fields = [
    {
      code: 'Title',
      label: 'Titre du post ',
      type: 'text'
    },
    {
      code: 'Body',
      label: 'Contenu du post ',
      type: 'textarea'
    }, 
    {
      code: 'Categories',
      label: 'Les categories ',
      type: 'Autocomplete'
    }
  ];


  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {loading ? <Loading/> :  
        error ? <Box component="div">{error}</Box> 
       : null }
      <Box component="div"
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
      >
      <Typography variant="h2" textAlign={"center"}>Ajouter un nouveau post</Typography>
      { current_user?.Is_Admin ? 
        (<>
        <Box 
          component="form"
          onSubmit={createEntity}
          noValidate sx={{ mt: 1 }}>
            
            <Form fields={fields} context={"posts"} categories={categories?.Categories || []} /> 

            <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
            >Ajouter post</Button>

        </Box>
        </>
        ) : 
        <Typography variant="h1">Vous n'avez pas les autorisations requises</Typography>
      }
      </Box>
    </Container >
  );
};

export default Create;