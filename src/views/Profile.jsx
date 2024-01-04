import { useFetch } from "use-http";
import NotFound from "./NotFound";
import { useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link} from "react-router-dom";
// import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import {  Box, Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,  useTheme } from "@mui/material";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const theme = useTheme(); // Récupérez le thème
  const color = theme.palette.primary ;
  const { data : users, error, loading} = useFetch( 'users' ,{}, []);
  const {user : current_user }=useContext(AuthContext);

  const stylesTableRows = {
    "&:nth-of-type(odd):hover": {
        backgroundColor : color.light,  
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
                    <Typography variant="body2">
                      Mon pseudo : <Box component="span" sx={{fontWeight:900}}>{current_user.Pseudo}</Box>
                    </Typography>
                    <Typography variant="body2">
                      Mes nom et prénom : <Box component="span" sx={{fontWeight:900}}>{current_user.Lastname} {current_user.Username}</Box>
                    </Typography>
                    <Typography variant="body2">
                      Mon Email : <Box component="span" sx={{fontWeight:900}}>{current_user.Email}</Box>
                    </Typography>
                    <Typography variant="body2">
                      Mon statut : <Box component="span" sx={{fontWeight:900}}>{current_user.Is_Admin ? "admin" : "utilisateur"}</Box> 
                    </Typography>
                </Box>
                </>
                ) : null}
                <Box 
                component="div" 
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                    <Link to={`/users/${current_user.ID}`}>
                        <Button className="link-button" ><EditIcon /></Button>
                    </Link>
                    <LogoutButton />
                </Box>
            </Box>
            
        </Box>
          {current_user?.Is_Admin ? 
            <>
            <Typography variant="h2" mt={2} mb={2}>Les utilisateurs</Typography>
            <TableContainer >
              <Table aria-label="simple table"  >
                <TableHead  sx={{
                  backgroundColor:theme.palette.primary.dark,
                  color:theme.palette.primary.contrastText
                  }}>
                  <TableRow  >
                    <TableCell align="left" sx={{fontWeight:900, color:theme.palette.primary.contrastText}} >Pseudo</TableCell>
                    <TableCell align="left" sx={{fontWeight:900, color:theme.palette.primary.contrastText}}>Prénom</TableCell>
                    <TableCell align="left"sx={{fontWeight:900, color:theme.palette.primary.contrastText}} >Nom</TableCell>
                    <TableCell align="left" sx={{fontWeight:900, color:theme.palette.primary.contrastText}}>Email</TableCell>
                    <TableCell align="left" sx={{fontWeight:900, color:theme.palette.primary.contrastText}}>Admin ou utilisateur </TableCell>
                    <TableCell align="center"sx={{fontWeight:900, color:theme.palette.primary.contrastText}} >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.length ? users.map(user => (
                    <TableRow key={user.ID} sx={{...stylesTableRows}}>
                      <TableCell align="left">{user.Pseudo}</TableCell>
                      <TableCell align="left">{user.Firstname}</TableCell>
                      <TableCell align="left">{user.Lastname}</TableCell>
                      <TableCell align="left">{user.Email}</TableCell>
                      <TableCell align="left">{user.Is_Admin ? "admin" : "utilisateur"}</TableCell>
                      <TableCell align="center"><Link to={`/users/${user.ID}`}><Button  className="link-button" variant="contained" color="primary">Modifier</Button></Link></TableCell>
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