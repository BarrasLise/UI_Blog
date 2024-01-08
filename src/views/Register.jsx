import { Grid,  Typography, Box, CssBaseline, Container, Avatar, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "use-http";
import { AuthContext } from "../contexts/AuthContext";
import Form from "../components/Form";
import InfoIcon from '@mui/icons-material/Info';

const Register = (props) => {
    const theme = useTheme(); // Récupérez le thème
    const { post, response, error} = useFetch('register');
    const {entity, infos} = useContext(AuthContext);
    const [errorForm, setErrorForm] = useState("form");
    const fields = [
        {
          code: 'Pseudo',
          label: 'Pseudo ',
          type: 'text'
        },
        {
            code: 'Firstname',
            label: 'Prénom ',
            type: 'text'
        },
        {
            code: 'Lastname',
            label: 'Nom ',
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
        // {
        //   code: 'button',
        //   text: "s'enregistrer",
        //   type: 'submit'
        // }
    ];

    const register = async (e) => {
        e.preventDefault();
        const newUser = {
          Pseudo : entity?.Pseudo,
          Firstname : entity?.Firstname,
          Lastname  : entity?.Lastname,
          Email : entity?.Email,
          Password : entity?.Password, 
          CheckPassword : entity?.CheckPassword,
        };
    
        try {
          const registered = await post('', newUser);
          console.log(newUser);
          
          if (response?.status === 200) {
            // alert(response?.data );
            setErrorForm(false);
            console.log('User enregistré avec succès', registered);
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
    const validEmail = entity?.Email.match(/^\S+@\S+\.\S+$/) ? true : false;
  
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
                    <Box component={"div"} mb={"20px"} sx={{display: "flex", justifyContent: "flex-end", alignItems:"center"}}>
                        <Button onClick={infos} ><InfoIcon/></Button>
                    </Box>
                
                    <Form fields={fields} context={"users"}  />
                   
                    {error ? (
                        <Box backgroundColor="error.main" borderRadius={"8px"} mb={"10px"} padding={"5px"}>
                        <Typography color="primary.contrastText" variant="body2" ><strong>ERREUR {response.status} : </strong>
                        </Typography>
                        <Typography color="primary.contrastText" variant="body2">
                            {response?.data?.message}
                        </Typography>
                        </Box>
                    ) : null}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={entity?.Pseudo && entity?.Firstname && entity?.Lastname && entity?.Email &&  entity?.Password && entity?.CheckPassword && entity?.Password === entity?.CheckPassword && validEmail? false : true  }
                        onClick={register}
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
                            <Link mt={2} mb={3} variant="body2" onClick={props.switchForm} >
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