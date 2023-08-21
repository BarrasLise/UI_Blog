import { Link } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Container, Typography } from "@mui/material";

const NotFound = () => {
    function Refresh() {
        window.location.reload(); 
    }

    return ( 
        <Container maxWidth={'xl'} sx={{mt:"200px"}}>
        <Typography variant="div" className="not-found" display={"flex"} flexDirection={"column"} sx={{textAlign: "center"} }>
            <Typography variant="div" className="letters" sx={{textAlign: "center"}}>
                <Typography variant="span" className="letter" data-letter="4">4</Typography >
                <Typography variant="span" className="letter" data-letter="0">0</Typography >
                <Typography variant="span" className="letter" data-letter="4">4</Typography >
            </Typography>
           
            <Typography variant="h2">Désolé</Typography >
            <Typography variant="p">La page demandé n'a pas été trouvé. </Typography>
            <Typography variant="p">Vous pouvez : </Typography>
            <Typography variant="div" className="buttons" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Button className="link-button" onClick={Refresh}><RefreshIcon/></Button> <p>ou</p>
                <Link to="/"><Button className="link-button"><HomeIcon/></Button></Link>
            </Typography> 
        </Typography>
        </Container>
     );
}
 
export default NotFound;