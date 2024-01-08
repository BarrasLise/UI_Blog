import { useContext} from "react";
import { useFetch } from "use-http";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { EntityContext } from "../contexts/EntityContext";
import { Box, Button, Typography } from "@mui/material";

const LikeButton = () => {
  
  const {entity, refreshEntity, baseURL, entityId} = useContext(EntityContext);
  const { post } = useFetch(`${baseURL}/${entityId}/like`, {});

  const handleLikeClick = async () => {
    console.log(entity);
    try { 
      await post(entity);
      refreshEntity();
      
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <>
    <Box sx={{ mt: 2, mb: 2,margin : 2, padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      borderRadius: '8px', 
    }}>
        
    <Button  className="IconButton" onClick={() => (handleLikeClick())}  
      sx={{ 
        boxShadow:' -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
        ':hover': {
          boxShadow: 'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
        }, 
      }}>
        {!entity?.UserLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </Button>
    <Typography variant="body2">Nombres de like: {entity?.TotalLikes}</Typography>
    </Box>
    
    </>
   
  );
}
 
export default LikeButton;