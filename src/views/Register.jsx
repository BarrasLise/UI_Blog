import { Grid,  Typography, Box, CssBaseline, Container, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";

import LoginForm from "../components/LoginForm";

const Register = (props) => {
    const theme = useTheme(); // Récupérez le thème
    const [stateRegister] = useState({
        Pseudo: "",
        Firstname: "",
        Lastname: "",
        Email: "",
        Password: "",
        CheckPassword: "",
    });
    
    const { post, response, error} = useFetch('register');

    const [errorForm, setErrorForm] = useState("form");
    const fields = [
        {
          code: 'Pseudo',
          label: 'Pseudo ',
          type: 'text'
        },
        {
            code: 'Firstname',
            label: 'Firstname ',
            type: 'text'
        },
        {
            code: 'Lastname',
            label: 'Lastname ',
            type: 'text'
        },
        {
            code: 'Email',
            label: 'Email ',
            type: 'text'
        },
        {
          code: 'Password',
          label: 'Mot de passe ',
          type: 'password'
        },
        {
            code: 'CheckPassword',
            label: 'Confirmer le mot de passe ',
            type: 'password'
          }, 
        {
          code: 'button',
          text: "s'enregistrer",
          type: 'submit'
        }
      ];

    // const updateField = (name, value) => {
    //     if (!name) return;
    //     setStateRegister({...stateRegister, [name]: value });
    //     // setIsDirty(true);
    // };
   
    const register = async (e) => {
        e.preventDefault();
        const newUser = {
          Pseudo : stateRegister.Pseudo,
          Firstname : stateRegister.Firstname,
          Lastname  : stateRegister.Lastname,
          Email : stateRegister.Email,
          Password : stateRegister.Password, 
          CheckPassword : stateRegister.CheckPassword,
        };
    
        try {
          const registered = await post('', newUser);
        // console.log(newUser);
          
          if (response?.status === 200) {
            // alert(response?.data );
            setErrorForm(false);
            console.log('User enregistré avec succès', registered);
            // navigate('/login');
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
    // const validEmail = postEmail.match(/^\S+@\S+\.\S+$/) ? true : false;
  
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
                    marginBottom: 8,
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
                 
                    {/* <Typography variant="div" xs={{ color: validEmail ? "green" : "red" }}>
                        { postEmail ? validEmail ? "Email valide" : "Email non valide" : null}
                    </Typography> */}
                    
                 
                        {/* { passwordStrength==='bon' ? 
                         <Typography variant="p" color={"Success"}>
                            {postPassword.length && `Force du mot de passe: ${passwordStrength}` }
                        </Typography>  
                         :
                          <Typography variant="p" color="error"> 
                            {postPassword.length && `Force du mot de passe: ${passwordStrength}` }
                         </Typography>
                        } */}
                    
                  
                    {/* <Typography color="error" variant="div" >
                        {postPassword !== postCheckPassword ? "Les mots de passe ne correspondent pas" : null}
                    </Typography> */}

                    <LoginForm fields={fields} />

                    {error ? (
                        <>
                        <Typography color="error" variant="p" ><strong>ERREUR {response.status}</strong>
                        </Typography>
                        <Typography color="error" variant="p">
                            {response?.data?.message}
                        </Typography>
                        </>
                    ) : null}

                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={postPseudo && postFirstname && postLastname && postEmail && validEmail && postPassword && postCheckPassword && postPassword === postCheckPassword ? false : true  }
                        onClick={register}
                    >
                        S'enregistrer
                    </Button> */}
                     {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        
                        // onClick={register}
                    >
                        S'enregistrer
                    </Button> */}
                    <Grid container>
                        {/* <Grid item xs>
                            <Link mt={2}  href="#" variant="body2">
                                {"Mot de passe oublié ? Cliquer ici"}
                            </Link>
                        </Grid> */}
                        <Grid item xs>
                            <Link mt={2} mb={3} variant="p" onClick={props.switchForm} >
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