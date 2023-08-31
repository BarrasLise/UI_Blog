import { useFetch } from "use-http";
import NotFound from "./NotFound";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, colors, useTheme } from "@mui/material";
import Loading from "../components/Loading";
import theme from "../components/Theme";

const Profile = () => {
  const theme = useTheme(); // Récupérez le thème
  const color = theme.palette.primary ;
  const { data : users, error, loading} = useFetch( 'users' ,{}, []);
  const {user : current_user, unLogin}=useContext(AuthContext);

  const stylesTableRows = {
    "&:nth-of-type(odd):hover": {
        backgroundColor : color.light,
        // colors : theme.palette.secondary.contrastText
    },
    ":hover": {
        backgroundColor : color.light,
    },
    "&:nth-of-type(odd)": {
      backgroundColor :color.lighter,
    },
    "&:last-child td, &:last-child th": {
        border: 0,  
    },
  }
 
  return ( 
    <Box component="div" className="MyProfile" 
        sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
        }}
    >
        {loading ? <Loading/> :  
        error ? <NotFound /> 
       : 
      <Box component="div" className="MyProfile">
        <Typography variant="h1">Mon profil</Typography >
        <Box component="div" className="infos-users">
            <Typography variant="h2">Mon compte</Typography >
            <Box component="div" 
            sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'space-between'
            }}>
                {current_user ? (
                <>
                <Box component="div" 
                sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                }}>
                    <Typography variant="p">
                      Mon pseudo : <strong>{current_user.Pseudo}</strong>
                    </Typography>
                    <Typography variant="p">
                      Mes nom et prénom : <strong>{current_user.Lastname} {current_user.Username}</strong>
                    </Typography>
                    <Typography variant="p">
                      Mon Email : <strong>{current_user.Email}</strong>
                    </Typography>
                    <Typography variant="p">
                      Mon statut : <strong>{current_user.Is_Admin ? "admin" : "utilisateur"}</strong> 
                    </Typography>
                </Box>
                </>
                ) : null}
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Link to={`/users/${current_user.ID}`}>
                        <Button className="link-button"><EditIcon /></Button>
                    </Link>
                    <Button className="link-button" type="button" value="se déconnecter" onClick={unLogin}><LogoutIcon /></Button>
                </Box>
            </Box>
            
        </Box>
          {current_user?.Is_Admin ? 
            <>
            <Typography variant="h2" mt={2} mb={2}>Les utilisateurs</Typography>
            <TableContainer>
              <Table aria-label="simple table"  >
                <TableHead  sx={{
                  backgroundColor:theme.palette.primary.dark,
                  color:theme.palette.primary.contrastText
                  }}>
                  <TableRow  >
                    <TableCell  align="links"  >Pseudo</TableCell>
                    <TableCell align="links" >Prénom</TableCell>
                    <TableCell align="links" >Nom</TableCell>
                    <TableCell align="links" >Email</TableCell>
                    <TableCell align="links" >Admin ou utilisateur </TableCell>
                    <TableCell align="center" >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.length ? users.map(user => (
                    <TableRow key={user.ID} sx={{...stylesTableRows}}>
                      <TableCell align="links">{user.Pseudo}</TableCell>
                      <TableCell align="links">{user.Firstname}</TableCell>
                      <TableCell align="links">{user.Lastname}</TableCell>
                      <TableCell align="links">{user.Email}</TableCell>
                      <TableCell align="links">{user.Is_Admin ? "admin" : "utilisateur"}</TableCell>
                      <TableCell align="center"><Link to={`/users/${user.ID}`}><Button  className="link-button">Modifier</Button></Link></TableCell>
                    </TableRow>
                  )) : null}
                </TableBody>
              </Table>
            </TableContainer>
            </>      
          : null}
      </Box>
    }
    </Box>        
  )               
}

export default Profile;