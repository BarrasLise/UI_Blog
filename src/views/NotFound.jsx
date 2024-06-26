import { Link } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Container, Typography } from "@mui/material";

const NotFound = () => {

    const stylesLettres = {
        textAlign: 'center',
    };
    const stylesLettre = {
        display: 'inline-block',
        fontWeight: 900,
        fontSize: '8em',
        margin: '0.2em', //marge entre chaque lettre pour aérer le 404
        position: 'relative',
        color: '#3FB8FEff',
        transformStyle: 'preserve-3d',
        perspective: 400,
        zIndex: 1,
        transition: 'all 0.3s ease-in-out',
        "::before": {
            position: 'absolute',
            content: 'attr(data-letter)',
            transformOrigin: 'top left',
            top: 0,
            left: 0,
            transition: 'all 0.3s ease-in-out',
            color:"#fff",
            textShadow: "-1px 0px 1px rgba(235, 235, 235, 0.8), 1px 0px 1px rgba(0,0,0,0.8)",
            zIndex: 3,
            transform:"rotateX(0deg) rotateY(-20deg) rotateZ(0deg)",
        },
        "::after": {
            position: 'absolute',
            content: 'attr(data-letter)',
            transformOrigin: 'top left',
            top: 0,
            left: 0,
            transition: 'all 0.3s ease-in-out',
            color: "rgba(0,0,0,.11)",
            zIndex:2,
            transform: "scale(1.08,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg,1deg)",
        },
    };
    const stylesBoutons = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const stylesLettreEvent = {
        ":hover::before": {
            color:"#fafafa",
            transform: "rotateX(0deg) rotateY(-40deg) rotateZ(0deg)",
        },
        ":hover::after": {
            transform:"scale(1.08,1) rotateX(0deg)  rotateY(40deg)  rotateZ(0deg) skew(0deg,22deg)",
        }
    };

    function Refresh() {
        window.location.reload(); 
    }

    return ( 
        <Container maxWidth={'xl'} sx={{mt:"50px"}}>
        <Typography variant="div" className="not-found" display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{textAlign: "center"} }>
            <Typography variant="div" className="letters" sx={stylesLettres} >
                <Typography variant="span" className="letter" data-letter="4" sx={{...stylesLettre, ...stylesLettreEvent}}>4</Typography >
                <Typography variant="span" className="letter" data-letter="0" sx={{...stylesLettre, ...stylesLettreEvent}}>0</Typography >
                <Typography variant="span" className="letter" data-letter="4" sx={{...stylesLettre, ...stylesLettreEvent}}>4</Typography >
            </Typography>
           
            <Typography variant="h2" sx={{mt:"8px", mb:"8px"}}>Désolé</Typography >
            <Typography variant="body2">La page demandé n'a pas été trouvé. </Typography>
            <Typography variant="body2">Vous pouvez : </Typography>
            <Typography variant="div" className="buttons" display={"flex"} alignItems={"center"} justifyContent={"center"} sx={stylesBoutons}>
                <Button className="link-button" onClick={Refresh} title="rafraichir la page" ><RefreshIcon sx={{width:"40px", height: "40px"}}/></Button> <Typography variant="body2">ou</Typography>
                <Link to="/"><Button className="link-button" title="retourner à la page d'accueil"><HomeIcon sx={{width:"40px", height: "40px"}}/></Button></Link>
            </Typography> 
        </Typography>
        </Container>
     );
}
 
export default NotFound;