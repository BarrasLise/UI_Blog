import { Button, TextField } from "@mui/material"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = ({fields}) => {
    const { updateField, stateLogin} = useContext(AuthContext);

    return ( 
        fields && fields.length && stateLogin ? (
            <>

            {fields.map((field)=> {

                return(

                    field.type === 'text' ? (
                        
                        <TextField
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id={field.label}
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        value={stateLogin[field.code] ? stateLogin[field.code] : "" }
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoFocus 
                        />

                    ) : field.type === 'password' ?(
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name={field.label}
                            label={field.label}
                            type={field.label}
                            id={field.label}
                            value={stateLogin[field.code] ? stateLogin[field.code] : ""}
                            onChange={(e) => updateField(field.code,e.target.value)}
                            autoComplete="current-password" 
                        />

                    ) : field.type === 'submit' ? (

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            {field.text}
                        </Button>

                    ) : null
                )

            })}
            </>
        ) : null
    )
}
 
export default LoginForm
