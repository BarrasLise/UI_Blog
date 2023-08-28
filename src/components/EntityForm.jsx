import { useContext } from "react";
import { EntityContext } from "../contexts/EntityContext";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, TextField, TextareaAutosize,  Typography} from "@mui/material";

const EntityForm = ({fields}) => {
  const { entity, updateField, isDirty, saveEntity, deleteEntity } = useContext(EntityContext);

  return (
    fields && fields.length && entity ? (
      <>
  { fields.map((field) => {

        return(

          field.type === 'text' ? (
           
             
              <TextField
                margin="normal"
                type="text"
                required
                fullWidth
                label={field.label}
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
              />
            
            
            
          ) : field.type === 'textarea' ? (

            
              <TextareaAutosize
                type="text"
                minRows={4}
                placeholder={field.label}
                required
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
                style={{ width: "100%", minWidth: "500px" }}
              />
            

          ) : field.type === 'password' (

            
              
              <TextField
                type="password"
                required
                label={field.label}
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
              />
            
          
          )

        )
      })}

      {isDirty ? <Button id="submit" type="submit" value="Sauvegarder" onClick={saveEntity}><SaveIcon /></Button> : null}
      <Button onClick={deleteEntity}><DeleteIcon /></Button>
      </>
    ) : null
  )
}

export default EntityForm