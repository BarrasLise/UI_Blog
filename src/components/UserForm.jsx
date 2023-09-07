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
  // const [entity, setEntity] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const { put, data, del, response, loading,} = useFetch( 'users/'+id ,{}, []);

  const {user : current_user, unLogin, stateEntity, setStateEntity}=useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
    if (response.ok) {
      // setEntity(data);   
      setStateEntity(data);
    }
  }, [loading, response.ok, data, setStateEntity]);

  const updateField = (name, value) => {
    if (!name) return;
    // setEntity({ ...entity, [name]: value });
    setStateEntity({...stateEntity, [name] : value});
    setIsDirty(true);
  };
  const deleteEntity = async () => {
    if (window.confirm("Voulez vous vraiment supprimer cet utilisateur ?" ) === true){
      // await del(entity);
      await del(stateEntity);
      if (response.ok) navigate('/users');
    } else {
      // alert("Vous n'avez pas supprimer l'utilisateur !");
      console.log("Vous n'avez pas supprimer l'utilisateur !");
    }
  };

  const saveEntity = async () => {
    // if(entity.Pseudo === current_user.Pseudo)
    if(stateEntity.Pseudo === current_user.Pseudo)
    {
      // await put( entity);
      await put(stateEntity);
      console.log(stateEntity);
      unLogin();
    } else {
      await put(stateEntity);
      console.log(stateEntity);
      // await put( entity);
      navigate('/users');
    }

  };

  return (
    fields && fields.length 
    // && entity 
    && stateEntity
    ? (

      <>

  { fields.map((field) => {

        return(

          field.type === 'text' ? (
            
            <TextField
                margin="normal"
                key={field.label}
                type="text"
                required
                fullWidth
                label={field.label}
                // value={entity[field.code] ? entity[field.code] : ''}
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                onChange={(e) => updateField(field.code, e.target.value)}
            />
            
            
          ) : field.type === 'textarea' ? (

            
              <TextareaAutosize
                key={field.label}
                type="text"
                minRows={4}
                placeholder={field.label}
                required
                // value={entity[field.code] ? entity[field.code] : ''}
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                onChange={(e) => updateField(field.code, e.target.value)}
                style={{ width: "100%", minWidth: "500px", fontSize: "1rem" }}
              />
           

          ) : field.type === 'password' ? (

            
            <TextField
                key={field.label}
                margin="normal"
                type="password"
                required
                fullWidth
                label={field.label}
                // value={entity[field.code] ? entity[field.code] : ''}
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                onChange={(e) => updateField(field.code, e.target.value)}
            />
         
          ) : field.type === 'select' ? (
            <>
            <InputLabel key={field.label} required id="Is_Admin">statut admin</InputLabel>
                <Select 
                    key={field.label}
                    name="Is_Admin" 
                    labelId="Is_Admin" 
                    required
                    // value={entity.Is_Admin } 
                    value={stateEntity.Is_Admin}
                    // value={stateEntity[field.code] === '1' ? "Admin" : "Utilisateur"  }
                    label="statut admin"
                    onChange={(e)=>updateField(field.code, e.target.value)}
                >
                    <MenuItem key={1} value={1}>Admin</MenuItem>
                    <MenuItem key={0} value={0}>Utilisateur</MenuItem>
                </Select>
            </>
           
          ) : null
          // field.type === '' (
            
          //   <TextField
          //       key={field.label}
          //       margin="normal"
          //       type="text"
          //       required
          //       fullWidth
          //       label={field.label}
          //       value={data[field.code] ? data[field.code] : ''}
          //       onChange={(e) => updateField(field.code, e.target.value)}
          //   />
            
          // )
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

      {isDirty ? <Button className="IconButton" id="submit" type="submit" value="Sauvegarder" onClick={saveEntity}><SaveIcon/></Button> : null}
      
      <Button className="IconButton" id="submit" type="submit" value="Supprimer" onClick={deleteEntity}><DeleteIcon/></Button> 
      </Box>
      
      </>

    ) : null
  )
}

export default UserForm