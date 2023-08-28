import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from 'use-http';
import { AuthContext } from "../contexts/AuthContext";
import { Box, Button, TextField, TextareaAutosize,  Typography, Container} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Loading from "../components/Loading";


const Create = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  const { post, response, error, loading } = useFetch('posts', {}, []);

  const {user : current_user}=useContext(AuthContext);

  const createPost = async (e) => {
    e.preventDefault();

    const newPost = {
      Title: postTitle,
      Body: postBody,
    };

    try {
      const createdPost = await post('', newPost);
      if (response.ok) {
        console.log('Post créé avec succès', createdPost);
        navigate('/'); // Naviguer vers la page d'accueil ou une autre page après la création réussie du post
      } else {
        console.error('La création du post a échoué');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
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
      

         
        <Box component="form" onSubmit={createPost} noValidate sx={{ mt: 1 }}>
            
            
            <TextField
              margin="normal"
              type="text"
              required
              fullWidth
              id="postTitle"
              label="Titre du post"
              name="postTitle"
              autoComplete="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />

            
            <TextareaAutosize
              minRows={4}
              placeholder="Contenu du post"
              required
              id="postBody"
              name="postBody"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              style={{ width: "100%" }}
            />

            <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
            >Ajouter post</Button>
         
        </Box>
        </>
        ) : 
        <Typography variant="h1"> Vous n'avez pas les autorisations requises</Typography>
      }
      </Box>
    </Container >
  );
};

export default Create;