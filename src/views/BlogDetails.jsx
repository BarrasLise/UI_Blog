import React, { useContext, useState} from 'react';
import { EntityContext } from '../contexts/EntityContext';
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";
import { Box, Button,  CssBaseline,  Typography, useThemeProps } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Loading from "../components/Loading";
import LikeButton from "../components/LikeButton";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Form from "../components/Form";
import { PostContext } from "../contexts/PostContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from "@emotion/react";
import CategoryList from "../components/CategoryList";


const BlogDetails = () => {
  const theme = useTheme(); // Récupérez le thème
  const [edited, setEdited] = useState(false)
  const { entity, error, loading, isDirty, saveEntity, deleteEntity } = useContext(EntityContext);
  const {user : current_user}=useContext(AuthContext);
  const {savePost} = useContext(PostContext);


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
                  // minWidth: "800px"
            }}>
              {/* <CategoryList/> */}
        <Box sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  // alignItems: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'space-around',
                  // minWidth: "800px"
            }}>
        {/* <Card 
        elevation={3} 
        
            sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  // minWidth: "800px"
            }}
        > */}
          {/* <CardContent sx={{
                
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                
            }}> */}
            <Box   sx={{ mt: 2, mb: 2,margin : 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', }}>
              <Typography  variant="h5" sx={{ mb: 1 }}>{entity.Title}</Typography>
              <Typography variant="body2">Ecrit par {entity.Pseudo}</Typography>
              {/* <Box   sx={{ mt: 2, mb: 2 }}> */}
              
                <Typography  sx={{ whiteSpace: 'pre-line'}}>
                  {entity.Body}
                </Typography>
             
            </Box>
            <LikeButton/>
            {/* savepost */}
            {/* <Button onClick={savePost}>savePost</Button> */}
            {/* </CardContent> */}
        {/* </Card> */}

        
        </Box>
        {entity.Categories}
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
                <Button className="IconButton" onClick={handleEdited} sx={{mt:2 }}>
                  <EditIcon  />
                </Button>
                { edited ? 
                    <><Box component="div"
                    sx={{
                      mt: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                     
                    }}
                  >

                    <Typography variant="h5" sx={{ mb: 1 }}>Modifier le post :  </Typography>
                  </Box><Form fields={fields} context={"posts"} /><Box component="div"
                    sx={{
                      marginTop: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly'
                    }}
                  >
                      {isDirty ? <Button key={"Sauvegarder"} className="IconButton" id="submit" type="submit" value="Sauvegarder" onClick={saveEntity}><SaveIcon /></Button> : null}
                      <Button key={"Supprimer"} className="IconButton" value="Supprimer" onClick={deleteEntity}><DeleteIcon /></Button>


                    </Box></>
                    
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
