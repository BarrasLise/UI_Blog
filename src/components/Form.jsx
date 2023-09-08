import { useContext } from "react";
// import { EntityContext } from "../contexts/EntityContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";

const Form = ({fields}) => {
    
  const { entity, updateField } = useContext(GlobalContext);
  console.log(entity);
  

  return (
    fields && fields.length && entity ? (
        <>
        { fields.map((field) => {

            return(

                field.type === 'text' ? (

                    <TextField
                        key={field.label}
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
                        key={field.label}
                        type="text"
                        minRows={4}
                        placeholder={field.label}
                        required
                        size="xl"
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        style={{ width: "100%", minWidth: "500px", fontSize: "1rem" }} />
                     </>

                ) : field.type === 'password' ? (
        
                    <TextField
                        key={field.label}
                        type="password"
                        required
                        label={field.label}
                        name={field.label}
                        id={field.label}
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        autoComplete="current-password" 
                    />

                ) : field.type === 'select' ? (
                    <>
                    <InputLabel key={field.label} required id="Is_Admin">statut admin</InputLabel>
                        <Select 
                                key={field.label}
                                name="Is_Admin" 
                                labelId="Is_Admin" 
                                required
                                value={entity.Is_Admin}
                                label="statut admin"
                                onChange={(e)=>updateField(field.code, e.target.value)}
                        >
                            <MenuItem key={1} value={1}>Admin</MenuItem>
                            <MenuItem key={0} value={0}>Utilisateur</MenuItem>
                    </Select>
                    </>
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
);
}
 
export default Form;