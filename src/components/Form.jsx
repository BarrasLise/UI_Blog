import { useContext } from "react";
import { Box, Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import { EntityContext } from "../contexts/EntityContext";
import { AuthContext } from "../contexts/AuthContext";


const Form = ({fields, context}) => {


const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
const { entity, updateField } = ContextChoice;

const valeursInitiales = {};
fields.forEach((field) => {
  valeursInitiales[field.code] = "";
});

  return (
    fields && fields.length && entity && context
     ? (
        <>
        { fields.map((field, index) => {
            //  const uniqueKey = field.code + (entity?.id );
            const uniqueKey = `${field.code}-${index}`; 
          
            return(

                field.type === 'text'  ? (

                    <TextField
                        key={uniqueKey}
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        // value={entity[field.code] ? entity[field.code] : ''}
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoFocus 
                    />

                ) : field.type === 'textarea' ? (

                    
                    <TextareaAutosize
                        key={uniqueKey}
                        type="text"
                        minRows={4}
                        placeholder={field.label}
                        required
                        margin="normal"
                        size="xl"
                        // value={entity[field.code] ? entity[field.code] : ''}
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        style={{ width: "100%", minWidth: "500px", fontSize: "1rem" }} />
                    

                ) : field.type === 'password' ? (
        
                    <TextField
                        margin="normal"
                        key={uniqueKey}
                        type="password"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        id={field.label}
                        // value={entity[field.code] ? entity[field.code] : ''}
                        value={entity[field.code] || valeursInitiales[field.code]}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoComplete="current-password" 
                    />

                ) : field.type === 'select' ? (
                    
                    <Box key={uniqueKey+"4"} component="div" className="form" 
                    sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                    }}>
                    <InputLabel key={uniqueKey} required id="Is_Admin">statut admin</InputLabel>
                    <Select
                                    // key={field.label}
                                    key={uniqueKey + "1"}
                                    name="Is_Admin"
                                    labelId="Is_Admin"
                                    required
                                    // value={entity?.Is_Admin ? entity?.Is_Admin : null}
                                    value={entity?.Is_Admin || valeursInitiales[field.code]}
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
    ) : "erreur de chargement ?"
    
);
}
 
export default Form;