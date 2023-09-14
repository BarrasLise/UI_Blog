import { useContext } from "react";
import { Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import { EntityContext } from "../contexts/EntityContext";
import { AuthContext } from "../contexts/AuthContext";


const Form = ({fields, context}) => {


const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
const { entity, updateField } = ContextChoice;

  return (
    fields && fields.length && entity && context
     ? (
        <>
        { fields.map((field) => {
          
            return(

                field.type === 'text'  ? (

                    <TextField
                        key={entity?.id}
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoFocus 
                    />

                ) : field.type === 'textarea' ? (

                    <> 
                    <TextareaAutosize
                        key={entity?.id}
                        type="text"
                        minRows={4}
                        placeholder={field.label}
                        required
                        margin="normal"
                        size="xl"
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        style={{ width: "100%", minWidth: "500px", fontSize: "1rem" }} />
                     </>

                ) : field.type === 'password' ? (
        
                    <TextField
                        margin="normal"
                        key={entity?.id}
                        type="password"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        id={field.label}
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoComplete="current-password" 
                    />

                ) : field.type === 'select' ? (
                    <>
                    <InputLabel key={field.type} required id="Is_Admin">statut admin</InputLabel>
                        <Select 
                                // key={field.label}
                                key={entity?.id}
                                name="Is_Admin" 
                                labelId="Is_Admin" 
                                required
                                value={entity?.Is_Admin ? entity?.Is_Admin : null}
                                label="statut admin"
                                onChange={(e)=>updateField(field.code, e.target.value)}
                        >
                            <MenuItem key={entity?.id+1} value={1}>Admin</MenuItem>
                            <MenuItem key={entity?.id+2} value={0}>Utilisateur</MenuItem>
                    </Select>
                    </>
                ) : field.type === 'submit' ? (
            
                    <Button
                        key={entity?.id}
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