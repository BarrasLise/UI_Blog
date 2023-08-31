import { Typography, useTheme } from "@mui/material";
import Container from '@mui/material/Container';
import React,{useContext} from 'react';
import { AuthContext } from "../contexts/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { cyan } from '@mui/material/colors';

const Login = (props) => {
    const theme = useTheme(); // Récupérez le thème
    const {  pseudo, password, setPseudo, setPassword, login} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('pseudo'),
          password: data.get('password'),
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
                <Typography variant="h5">
                    Se connecter
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="pseudo"
                        label="Pseudo"
                        name="pseudo"
                        autoComplete="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Se souvenir de moi" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Se connecter
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link mt={2} href="#" variant="body2">
                                {"Mot de passe oublié ?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link mt={2} variant="body2" onClick={props.switchForm}>
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