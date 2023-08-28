import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "use-http";
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { AuthContext } from "../contexts/AuthContext";
import { Box, Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";

const UserForm = ({fields}) => {
  const { id } = useParams('');
  const navigate = useNavigate();
  const [entity, setEntity] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const { put, data, del, response, loading,} = useFetch( 'users/'+id ,{}, []);

  const {user : current_user, unLogin}=useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
    if (response.ok) {
      setEntity(data);
       
    }
  }, [loading, response.ok, data]);

  const updateField = (name, value) => {
    if (!name) return;
    setEntity({ ...entity, [name]: value });
    setIsDirty(true);
  };
  const deleteEntity = async () => {
    if (window.confirm("Voulez vous vraiment supprimer cet utilisateur ?" ) === true){
      await del(entity);
      if (response.ok) navigate('/users');
    } else {
      alert("Vous n'avez pas supprimer l'utilisateur !");
    }
  };

  const saveEntity = async () => {
    if(entity.Pseudo === current_user.Pseudo) {
      await put( entity);
      unLogin();
    } else {
      await put( entity);
      navigate('/users');
    }

  };

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
           

          ) : field.type === 'password' ? (

            
            <TextField
                margin="normal"
                type="password"
                required
                fullWidth
                label={field.label}
                value={entity[field.code] ? entity[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
            />
         
          ) : field.type === 'select' ? (
            <>
            <InputLabel required id="Is_Admin">statut admin</InputLabel>
                <Select 
                    name="Is_Admin" 
                    labelId="Is_Admin" 
                    required
                    value={entity.Is_Admin } 
                    label="statut admin"
                    onChange={(e)=>updateField(field.code, e.target.value)}
                >
                    <MenuItem value="1">Admin</MenuItem>
                    <MenuItem value="0">Utilisateur</MenuItem>
                </Select>
            </>
           
          ) : field.type === '' (
            
            <TextField
                margin="normal"
                type="text"
                required
                fullWidth
                label={field.label}
                value={data[field.code] ? data[field.code] : ''}
                onChange={(e) => updateField(field.code, e.target.value)}
            />
            
          )
        )
      })}
      <Box component="div" 
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
        }}
      > 

      {isDirty ? <Button id="submit" type="submit" value="Sauvegarder" onClick={saveEntity}><SaveIcon/></Button> : null}
      
      <Button id="submit" type="submit" value="Supprimer" onClick={deleteEntity}><DeleteIcon/></Button> 
      </Box>
      
      </>

    ) : null
  )
}

export default UserForm