import { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl,  InputLabel, MenuItem, Select,   OutlinedInput, TextField, Autocomplete, Chip } from "@mui/material";
import { EntityContext } from "../contexts/EntityContext";
import { AuthContext } from "../contexts/AuthContext";
import MyFormHelperText from "./MyFormHelperText";


const Form = ({fields, context, categories}) => {
    
    const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
    const { entity, updateField, error, response } = ContextChoice;
    const [fieldErrors, setFieldErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState("");
    const [charCount, setCharCount] = useState(0);

    console.log(entity?.Is_Admin);
    console.log(entity);

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
    fields && fields.length && entity && context
     ? (
        <>
        { fields.map((field, index) => {
            
            const uniqueKey = `${field.code}-${index}`; 

            return(

                field.type === 'text'  ? (
                       
                     <FormControl key={uniqueKey} fullWidth margin="normal">
                        <InputLabel key={uniqueKey + "11"} htmlFor="component-outlined" color={charCount >= 70 ? "error" : ""}>{field.label}</InputLabel>
                        <OutlinedInput
                        key={uniqueKey}
                        type="text"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) =>{
                            updateField(field.code, e.target.value);
                            setCharCount(e.target.value.length);
                        } }
                        color={charCount >= 70 ? "error" : ""}
                        autoFocus />
                        <MyFormHelperText key={uniqueKey+"12"} error={fieldErrors[field.code]} response={responseMessage}  fieldCode={field.code} charCount={charCount} />
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
                        value={entity?.Is_Admin || 0 }
                        label="statut admin"
                        onChange={(e) => updateField(field.code, e.target.value)}
                    >
                        <MenuItem key={uniqueKey + "2"} value={1}>Admin</MenuItem>
                        <MenuItem key={uniqueKey + "3"} value={0}>Utilisateur</MenuItem>
                    </Select>
                    </Box>
                    
                ) : field.type === 'Autocomplete' ? ( 
                    
                    <FormControl key={uniqueKey} fullWidth margin="normal">
                        <Autocomplete
                            multiple
                            options={Array.isArray(categories) ? categories : []}
                            value={entity[field.code] ? entity[field.code].split(',') : []}
                            freeSolo
                            onChange={(event, newValue) => {
                                    const formattedValue = newValue.map(option => {
                                        const trimmedOption = option.trim();
                                        return trimmedOption.length > 0
                                            ? trimmedOption.charAt(0).toUpperCase() + trimmedOption.slice(1).toLowerCase()
                                            : null;
                                    });
                                    updateField(field.code, formattedValue.join(','));
                            }}
                            renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                    <Chip 
                                        sx={{  
                                            marginRight: '4px',
                                            marginBottom: '4px',
                                        }}
                                        color="primary"
                                        variant="outlined" 
                                        label={option} {...getTagProps({ index })} />
                                    ))
                                }
                            renderInput={(params) => (
                                <TextField 
                                        {...params}
                                        // variant="filled"
                                        label={field.label}
                                        placeholder="Ajouter des catégories"
                                />
                            )}
                        />
                    </FormControl>  

                ): field.type === 'submit' ? (
            
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
    ) : "erreur de chargement ?"
    
);
}
 
export default Form;