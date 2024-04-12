import  { useContext } from 'react';
import { Typography, Chip, Box } from '@mui/material';
import { EntityContext } from "../contexts/EntityContext";



const CategoryList = () => {
  const {entity} = useContext(EntityContext); 
  const categoriesArray = entity?.Categories?.split(',');
  console.log(categoriesArray);
 
  return (
    <Box sx={{
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',    
    }}>
      <Typography variant="h5">Categories : </Typography>
    
      {categoriesArray && categoriesArray.length > 0  && categoriesArray[0] !== "" ? (
        categoriesArray.map((category, index) => (
          <Chip
            key={index}
            label={category}
            variant="outlined"
            color="primary"
            style={{ marginLeft: '10px' }}
          />
        ))
      ) : (
        <Typography variant="h5" color={ "error"} sx={{marginLeft:"10px"}}> {"  Il n'y a pas encore de catégorie !"} </Typography>
      )}

    </Box>
  );
}

export default CategoryList;