import { Button, Grid, TextField, Typography, Box, CssBaseline, Container, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { cyan } from '@mui/material/colors';
import { useState } from "react";
import { useFetch } from "use-http";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

    const [postPseudo, setPostPseudo] = useState("");
    const [postFirstname, setPostFirstname] = useState("");
    const [postLastname, setPostLastname] = useState("");
    const [postEmail, setPostEmail] = useState("");
    const [postPassword, setPostPassword] = useState("");
    const [postCheckPassword, setPostCheckPassword] = useState("");

    const navigate = useNavigate();

    const { post, response} = useFetch('register');

    const [errorForm, setErrorForm] = useState("form");

    const register = async (e) => {
        e.preventDefault();
    
        const newUser = {
          Pseudo : postPseudo,
          Firstname : postFirstname,
          Lastname  : postLastname,
          Email : postEmail,
          Password : postPassword, 
          CheckPassword : postCheckPassword,
        };
    
        try {
          const registered = await post('', newUser);
          
          if (response?.status === 200) {
            alert(response?.data );
            setErrorForm(false);
            console.log('User enregistré avec succès', registered);
            navigate('/login');
            props.switchForm();
          }
          
        } catch (error) {
          console.error('Une erreur s\'est produite', error);
        }
    }

    //Email valide ?
    const validEmail = postEmail.match(/^\S+@\S+\.\S+$/) ? true : false;
  
    //gestion force du mot de passe 
    const passwordStrength = postPassword.length > 10 ? 'bon' : 'faible';
  

    return ( 
        <>
        <Typography variant="div" className={errorForm}></Typography>
        <Typography variant="h2">S'enregistrer</Typography>
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
                <Avatar sx={{ m: 1, bgcolor: cyan[200] }}>
                    <LockOutlinedIcon  />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Se connecter
                </Typography>
                <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
                    <TextField
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="pseudo"
                        label="Pseudo"
                        name="pseudo"
                        autoComplete="pseudo"
                        value={postPseudo}
                        onChange={(e) => setPostPseudo(e.target.value)}
                        autoFocus />
                    <TextField
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="firstname"
                        name="firstname"
                        autoComplete="fistname"
                        value={postFirstname}
                        onChange={(e) => setPostFirstname(e.target.value)}
                        autoFocus />
                    <TextField
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="lastname"
                        name="lastname"
                        autoComplete="lastname"
                        value={postLastname}
                        onChange={(e) => setPostLastname(e.target.value)}
                        autoFocus />
                    <TextField
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        value={postEmail}
                        onChange={(e) => setPostEmail(e.target.value)}
                        autoFocus />
                    <Typography variant="div" xs={{ color: validEmail ? "green" : "red" }}>
                        { postEmail ? validEmail ? "Email valide" : "Email non valide" : null}
                    </Typography>
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        value={postPassword}
                        onChange={(e) => setPostPassword(e.target.value)}
                        autoComplete="current-password" />
                    <Typography variant="div" xs={{ color: passwordStrength==='bon' ? "green" : "red" }}>
                        {postPassword.length > 0 && `Force du mot de passe: ${passwordStrength}`}
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="ConfirmPassword"
                        label="confirmer le mot de passe"
                        type="password"
                        id="ConfirmPassword"
                        value={postCheckPassword}
                        onChange={(e) => setPostCheckPassword(e.target.value)}
                        autoComplete="current-password" />
                    <Typography variant="div" xs={{ color: "red"}}>
                        {postPassword !== postCheckPassword ? "Les mots de passe ne correspondent pas" : null}
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        S'enregistrer
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Mot de passe oublié ? Cliquer ici
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" onClick={props.switchForm}>
                                {"Vous avez déjà un compte ? Cliquer ici pour vous connecter"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container></>
     );
}
 
export default Register;