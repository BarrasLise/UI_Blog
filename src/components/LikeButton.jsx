import { useContext} from "react";
import { useFetch } from "use-http";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { EntityContext } from "../contexts/EntityContext";
import { Button, Typography } from "@mui/material";

const LikeButton = () => {
  
  const {entity, refreshEntity, baseURL, entityId} = useContext(EntityContext);
  const { post } = useFetch(`${baseURL}/${entityId}/like`, {});
  // console.log(id);


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
    <Button className="IconButton" onClick={() => (handleLikeClick())}>{!entity?.UserLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />}</Button>
    <Typography variant="body2">Nombres de like: {entity?.TotalLikes}</Typography>
    </>
   
  );
}
 
export default LikeButton;