import React, { useContext, useState} from 'react';
import { EntityContext } from '../contexts/EntityContext';
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";
import { Box, Button,  CssBaseline,  Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Loading from "../components/Loading";
import LikeButton from "../components/LikeButton";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Form from "../components/Form";
import CategoryList from "../components/CategoryList";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFetch } from "use-http";


const BlogDetails = () => {
  
  const [edited, setEdited] = useState(false)
  const { entity, error, loading, isDirty, saveEntity, deleteEntity, setAlertOpen, alertOpen } = useContext(EntityContext);
  const {user : current_user}=useContext(AuthContext);
  // const {savePost} = useContext(PostContext);
  // const [alertOpen] = useState(false);
  const { data : categories} = useFetch( 'categories' ,{}, []);
  console.log(categories);

  const handleCloseAlert = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };


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
    }, 
    {
      code: 'Categories',
      label: 'Les categories ',
      type: 'Autocomplete'
    }
  ];

  const handleEdited = () => {
    edited ? setEdited(false) : setEdited(true);
  }

  return (
    <>
    <CssBaseline />
   
      {loading ? <Loading/> :  
        error ? <Box component="div">{error}</Box> 
       : null }

      {entity ? (
        <>
        <CategoryList/>
        <Box sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around', 
            }}>
              
        <Box sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-around',
            }}>
            <Box   sx={{ mt: 2, mb: 2,margin : 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', }}>
              <Typography  variant="h5" sx={{ mb: 1 }}>{entity.Title}</Typography>
              <Typography variant="body2">Ecrit par {entity.Pseudo}</Typography>
           
              
                <Typography  sx={{ whiteSpace: 'pre-line'}}>
                  {entity.Body}
                </Typography>
             
            </Box>
            <LikeButton/>
            {/* <Button onClick={savePost}>savePost</Button> */}
        </Box>
        {/* {entity.Categories} */}
        </Box>
        
        {current_user?.Is_Admin? ( 
            <> 
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
              }}
            > 
              
              <Button className="IconButton" onClick={handleEdited} sx={{mt:2, boxShadow:' -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
                ':hover': {
                  boxShadow: 'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
                }, }}>
                <EditIcon  />
              </Button>
              
                { edited ? 
                    <>
                    <Box component="div"
                    sx={{
                      mt: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 1 }}>Modifier le post :  </Typography>
                  </Box>
                  <Form fields={fields} context={"posts"} categories={categories.Categories || []}/>
                  <Box component="div"
                    sx={{
                      marginTop: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly'
                    }}
                  >
                      {isDirty ? 
                      <Button key={"Sauvegarder"} className="IconButton" id="submit" type="submit" value="Sauvegarder" onClick={saveEntity} sx={{ mr: 2,
                        boxShadow:' -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
                        ':hover': {
                          boxShadow: 'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
                        }, 
                      }}>
                        <SaveIcon />
                      </Button> 
                      : null}
                      <Button key={"Supprimer"} className="IconButton" value="Supprimer" onClick={deleteEntity} sx={{ 
                        boxShadow:' -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
                        ':hover': {
                          boxShadow: 'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
                        }, 
                      }}>
                        <DeleteIcon />
                      </Button>

                  </Box>
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
                      severity="success"
                    >
                      Les modifications ont été sauvegardées !
                    </MuiAlert>
                  </Snackbar>



                  </>
                    
                : null } 
                </Box>  
            </>
        ) : null }
    </>   
    )  : <NotFound/>}
    
    </>
  );
};

export default BlogDetails;
