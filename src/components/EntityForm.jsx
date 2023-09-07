import { useContext } from "react";
import { EntityContext } from "../contexts/EntityContext";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";

const EntityForm = ({fields}) => {
 

  const { entity, updateField, isDirty, saveEntity, deleteEntity } = useContext(EntityContext);

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
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
              />
            
            
            
          ) : field.type === 'textarea' ? (

              <>
              
              <TextareaAutosize
                key={field.label}
                type="text"
                minRows={4}
                placeholder={field.label}
                required
                size="md"
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
                style={{ width: "100%", minWidth: "1000px", fontSize: "1rem" }} />
                </>
            

          ) : field.type === 'password' (

            
              
              <TextField
                key={field.label}
                type="password"
                required
                label={field.label}
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
              />
            
          
          )

        )
      })}
      <Box component="div" 
        sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
        }}
      > 
      {isDirty ? <Button key={"Sauvegarder"} className="IconButton" id="submit" type="submit" value="Sauvegarder" onClick={saveEntity}><SaveIcon /></Button> : null}
      <Button key={"Supprimer"} className="IconButton" value="Supprimer" onClick={deleteEntity}><DeleteIcon /></Button>
      </Box>
      </>
    ) : null
  )
}

export default EntityForm