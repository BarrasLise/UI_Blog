import { Box, Typography } from "@mui/material";

const NoResults = () => {
  
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'align' }} >
      <Typography textAlign="center">{"Aucun post n'a été trouvé"}</Typography>
    </Box>
  );
}
   
export default NoResults;