import { Button, Grid, TextField, Typography, Box, CssBaseline, Container, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const theme = useTheme(); // Récupérez le thème
    const [postPseudo, setPostPseudo] = useState("");
    const [postFirstname, setPostFirstname] = useState("");
    const [postLastname, setPostLastname] = useState("");
    const [postEmail, setPostEmail] = useState("");
    const [postPassword, setPostPassword] = useState("");
    const [postCheckPassword, setPostCheckPassword] = useState("");

    const navigate = useNavigate();

    const { post, response, error} = useFetch('register');

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
    useEffect(()=> {
        if (error) setErrorForm("error");
    }, [ error ])

    //Email valide ?
    const validEmail = postEmail.match(/^\S+@\S+\.\S+$/) ? true : false;
  
    //gestion force du mot de passe 
    // const passwordStrength = postPassword.length > 10 ? 'bon' : 'faible';
  

    return ( 
        <>
        <Typography variant="div" className={errorForm}></Typography>
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
                    {/* <LockOutlinedIcon  /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    S'enregistrer
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
                    
                        {/* { passwordStrength==='bon' ? 
                         <Typography variant="p" color={"Success"}>
                            {postPassword.length && `Force du mot de passe: ${passwordStrength}` }
                        </Typography>  
                         :
                          <Typography variant="p" color="error"> 
                            {postPassword.length && `Force du mot de passe: ${passwordStrength}` }
                         </Typography>
                        } */}
                    
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
                    <Typography color="error" variant="div" >
                        {postPassword !== postCheckPassword ? "Les mots de passe ne correspondent pas" : null}
                    </Typography>

                    {error ? (
                        <>
                        <Typography color="error" variant="p" ><strong>ERREUR {response.status}</strong>
                        </Typography>
                        <Typography color="error" variant="p">
                            {response?.data?.message}
                        </Typography>
                        </>
                    ) : null}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={postPseudo && postFirstname && postLastname && postEmail && validEmail && postPassword && postCheckPassword && postPassword === postCheckPassword ? false : true  }
                    >
                        S'enregistrer
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link mt={2}  href="#" variant="body2">
                                {"Mot de passe oublié ? Cliquer ici"}
                            </Link>
                        </Grid> */}
                        <Grid item xs>
                            <Link mt={2} variant="p" onClick={props.switchForm} >
                                {"Déjà un compte ? Cliquer ici pour vous connecter"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container></>
     );
}
 
export default Register;