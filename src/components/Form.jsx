import { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl,  InputLabel, MenuItem, Select,   OutlinedInput, TextField } from "@mui/material";
import { EntityContext } from "../contexts/EntityContext";
import { AuthContext } from "../contexts/AuthContext";
import MyFormHelperText from "./MyFormHelperText";


const Form = ({fields, context}) => {
    
    const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
    const { entity, updateField, error, response } = ContextChoice;
    const [fieldErrors, setFieldErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState("");

   
    useEffect(() => {
        if (response.ok) {
          setResponseMessage(response.data.message);
        } else {
          setResponseMessage(""); // Effacez le message s'il n'y a pas de réponse
        }
      
        if (error) {
          setFieldErrors(error);
        } else {
          setFieldErrors({}); // Effacez les erreurs de champ s'il n'y a pas d'erreur
        }
    }, [error, response]);

    const valeursInitiales = {};
    fields.forEach((field) => {
    valeursInitiales[field.code] = "";
    });

  return (
    fields && fields.length && entity  && context
     ? (
        // <FormControl fullWidth>
        <>
        { fields.map((field, index) => {
            
            const uniqueKey = `${field.code}-${index}`; 

            return(

                field.type === 'text'  ? (
                    
                        
                     <FormControl key={uniqueKey} fullWidth margin="normal">
                        <InputLabel key={uniqueKey + "11"} htmlFor="component-outlined">{field.label}</InputLabel>
                        <OutlinedInput
                        key={uniqueKey}
                        // margin=""
                        type="text"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        // value={entity[field.code] ? entity[field.code] : ''}
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoFocus />
                        {/* <MyFormHelperText error={error}  /> */}
                        <MyFormHelperText key={uniqueKey+"12"} error={fieldErrors[field.code]} response={responseMessage}  fieldCode={field.code}  />
                    </FormControl>

                ) : field.type === 'textarea' ? (

                    
                    <TextField
                        key={uniqueKey}
                        label={field.label}
                        required
                        margin="normal"
                        multiline
                        fullWidth
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) => updateField(field.code, e.target.value)}
                    />
                    

                ) : field.type === 'password' ? (
                    
                     <FormControl key={uniqueKey} fullWidth margin="normal">
                        <InputLabel key={uniqueKey + "11"} htmlFor="component-outlined">{field.label}</InputLabel>
                        <OutlinedInput
                            margin="dense"
                            key={uniqueKey}
                            type="password"
                            required
                            fullWidth
                            label={field.label}
                            name={field.label}
                            id={field.label}
                            value={entity[field.code] || valeursInitiales[field.code]}
                            onChange={(e) => updateField(field.code, e.target.value)}
                            autoComplete="current-password" 
                        />
                        <MyFormHelperText key={uniqueKey+"12"} error={fieldErrors[field.code]} response={responseMessage}  fieldCode={field.code}  />
                     </FormControl>
                    

                ) : field.type === 'select' ? (
                    
                    <Box key={uniqueKey+"4"} component="div" className="form" 
                    sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                    }}>
                    <InputLabel key={uniqueKey} required id="Is_Admin">statut admin</InputLabel>
                    <Select
                                    key={uniqueKey + "1"}
                                    name="Is_Admin"
                                    labelId="Is_Admin"
                                    required
                                    value={entity?.Is_Admin }
                                    label="statut admin"
                                    onChange={(e) => updateField(field.code, e.target.value)}
                    >
                        <MenuItem key={uniqueKey + "2"} value={1}>Admin</MenuItem>
                        <MenuItem key={uniqueKey + "3"} value={0}>Utilisateur</MenuItem>
                    </Select>
                    </Box>
                    
                ) : field.type === 'submit' ? (
            
                    <Button
                        key={uniqueKey}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {field.text}
                    </Button>

                ) : "pas de type trouvé"
            )
        })}
        </>
        // </FormControl >
    ) : "erreur de chargement ?"
    
);
}
 
export default Form;