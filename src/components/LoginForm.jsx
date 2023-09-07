import { Button, TextField } from "@mui/material"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = ({fields}) => {
    const { updateField,  stateEntity} = useContext(AuthContext);

    return ( 
        fields && fields.length && stateEntity ? (
            <>

            {fields.map((field)=> {

                return(

                    field.type === 'text' ? (
                        
                        <TextField
                        key={field.label}
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id={field.label}
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        // value={stateLogin[field.code] ? stateLogin[field.code] : "" }
                        value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoFocus 
                        />

                    ) : field.type === 'password' ?(
                        
                        <TextField
                            key={field.label}
                            margin="normal"
                            required
                            fullWidth
                            name={field.label}
                            label={field.label}
                            type={field.type}
                            id={field.label}
                            // value={stateLogin[field.code] ? stateLogin[field.code] : ""}
                            value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                            onChange={(e) => updateField(field.code,e.target.value)}
                            autoComplete="current-password" 
                        />

                    ) : field.type === 'submit' ? (

                        <Button
                        key={field.text}
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
