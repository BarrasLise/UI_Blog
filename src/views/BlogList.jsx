import { Box, Grid } from "@mui/material";
import React from 'react';
import { useFetch } from "use-http";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Avatar, CardHeader } from '@mui/material';
import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import GlobalPopup from "../components/GlobalPopup";

const BlogList = () => {

    const { get, data : datas, error, loading} = useFetch('posts', {}, []);

    const stringToColor = (string) => {
        let hash = 0;
        let i;
      
        /* generateur de couleur */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
       
        // generateur de couleur dans les tons bleu
        // for (i = 0; i < string.length; i += 1) {
        //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
        // }
    
        // const baseBlue = 230; // Valeur de base pour le canal bleu
        // const blueRange = 265; // Plage de variation du canal bleu
    
        // const blueValue = (hash % blueRange) + baseBlue; // Calcul de la valeur bleue
    
        // let color = `rgb(0, 0, ${blueValue})`;

        return color;
    }
    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.substring(0,2).toUpperCase()}`,
        }
    }

    return ( 
       
        <Box sx={{ display: 'flex', flexDirection: 'column'} }>
            <GlobalPopup context={"posts"}/>
        
        {loading ? <Loading/> :  
        error ? <Box component="div">{error}</Box> 
        : null }

        <Box component={"div"} mb={"20px"} sx={{display: "flex", justifyContent: "space-between", alignItems:"center"}}>
           
        <Typography variant="h2" mb={"20px"}>{"Tous les posts"}</Typography>
            <Filters  onSubmit={(url)=>get(url)} />
        </Box>
            
            <Grid container spacing={3}>

        { datas?.length ? datas.map(data => (
           
        <Grid item xs={4} key={data.ID}>
            <Card sx={{ maxWidth: 345 }} key={data.ID}>
                <CardActionArea href={`/posts/${data.ID}`}>
                    <CardHeader
                        avatar={
                        <Avatar  aria-label="title"  {...stringAvatar(data.Pseudo)}>
                            
                        </Avatar>
                        }
                        title={data.Pseudo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.Title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid>
        )) : <NoResults /> }
        
        </Grid>
        </Box>
    );
}
 
export default BlogList;