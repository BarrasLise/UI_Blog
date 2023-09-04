import React, { useContext, useState} from 'react';
import { EntityContext } from '../contexts/EntityContext';
import EntityForm from '../components/EntityForm';
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";
import { Box, Button, Container, CssBaseline, Paper, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Loading from "../components/Loading";
import LikeButton from "../components/LikeButton";


const BlogDetails = () => {
  const [edited, setEdited] = useState(false)
  const { entity, error, loading } = useContext(EntityContext);
  const {user : current_user}=useContext(AuthContext);
  const fields = [
    {
      code: 'Title',
      label: 'Le titre ',
      type: 'text'
    },
    {
      code: 'Body',
      label: 'Le contenu du post ',
      type: 'textarea'
    }
  ];

  const handleEdited = () => {
    
    edited ? setEdited(false) : setEdited(true);
  }

  return (

    <Container component="main" maxWidth="xl" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
    <CssBaseline />
  
      {loading ? <Loading/> :  
        error ? <Box component="div">{error}</Box> 
       : null }

      {entity ? (
        <>
        
        <Paper elevation={3} 
            sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: "1000px"
            }}
        >
            <Typography variant="h5" sx={{ mb: 1 }}>{entity.Title}</Typography>
            <Typography variant="p">Ecrit par {entity.Pseudo}</Typography>
            <Box component="div" sx={{ mt: 4 }}>{entity.Body}</Box>
            <LikeButton/>
        </Paper>
       
    
        {current_user?.Is_Admin? ( 
            <>   
                <Button className="IconButton" onClick={handleEdited} sx={{mt:2}}>
                  <EditIcon  />
                </Button>
                { edited ? 
                    <Box component="div" 
                    sx={{
                        mt:8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
    
                        <Typography variant="h5" sx={{ mb: 1 }}>Modifier le post :  </Typography>
                        
                        <EntityForm fields={fields}  />  
                    </Box>
                : null }   
            </>
        ) : null }
    </>   
    )  : <NotFound/>}
    </Container>
  );
};

export default BlogDetails;