import { Typography, useTheme } from "@mui/material";
import Container from '@mui/material/Container';
import React,{useContext} from 'react';
import { AuthContext } from "../contexts/AuthContext";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from "../components/LoginForm";


const Login = (props) => {
    const theme = useTheme(); // Récupérez le thème
    const {  login,} = useContext(AuthContext);

    const fields = [
        {
          code: 'Pseudo',
          label: 'Pseudo ',
          type: 'text'
        },
        {
          code: 'Password',
          label: 'Mot de passe ',
          type: 'password'
        }, 
        {
          code: 'button',
          text: 'se connecter',
          type: 'submit'
        }
      ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          Pseudo: data.get('Pseudo'),
          Password: data.get('Password'),
        });

        login();
    };

    return ( 
        <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Se connecter
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Se souvenir de moi" /> */}
                    
                    <LoginForm fields={fields} />
                    <Grid container>
                        {/* <Grid item xs>
                            <Link mt={2} href="#" variant="body2">
                                {"Mot de passe oublié ?"}
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link mt={2} variant="p" onClick={props.switchForm}>
                                {" Pas de compte ? Inscrivez-vous "}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            
        </Container>
        </>
     );
}
 
export default Login;