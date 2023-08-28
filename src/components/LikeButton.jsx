import { useContext} from "react";
import { useFetch } from "use-http";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { EntityContext } from "../contexts/EntityContext";
import { Button, Typography } from "@mui/material";

const LikeButton = () => {
  
  const {entity, refreshEntity, baseURL, id, response} = useContext(EntityContext);
  const { post } = useFetch(`${baseURL}/${id}/like`, {});


  const handleLikeClick = async () => {
    console.log(entity);
    // console.log(response.UserLiked);
    
    try { 
      await post(entity);
      refreshEntity();
      
    } catch (error) {
      console.error(error);
    }
  
  };
 
  return (
    
      <><Button className="like" onClick={() => (handleLikeClick())}>{!entity?.UserLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />}</Button><Typography variant="p">Nombres de like: {entity?.TotalLikes}</Typography></>
   
  );
}
 
export default LikeButton;