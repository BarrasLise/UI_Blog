import { useContext } from "react";
import {  useParams } from "react-router-dom";
import { useFetch } from "use-http";
import { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {  Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";

const UserForm = ({fields}) => {
  const { id } = useParams('');
  const {  data,  response, loading,} = useFetch( 'users/'+id ,{}, []);
  const { stateEntity, setStateEntity, updateField}=useContext(AuthContext);

  // useEffect(() => {
  //   if (loading) return;
  //   if (response.ok) {  
  //     setStateEntity(data);
  //   }
  // }, [loading, response.ok, data, setStateEntity]);

  // const updateField = (name, value) => {
  //   if (!name) return;
  //   setStateEntity({...stateEntity, [name] : value});
  //   setIsDirty(true)
  // };

  // console.log(data);
  // console.log(stateEntity);
  // console.log(response.ok);
 

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
                name={field.label}
                autoComplete={field.label}
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                onChange={(e) => updateField(field.code, e.target.value)}
                autoFocus 
            />
            
            
          ) : field.type === 'textarea' ? (

            
              <TextareaAutosize
                key={field.label}
                type="text"
                minRows={4}
                placeholder={field.label}
                required
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                onChange={(e) => updateField(field.code, e.target.value)}
                style={{ width: "100%", minWidth: "500px", fontSize: "1rem" }}
              />
           

          ) : field.type === 'password' ? (

            
            <TextField
                key={field.label}
                margin="normal"
                type={field.type}
                required
                fullWidth
                label={field.label}
                name={field.label}
                id={field.label}
                value={stateEntity[field.code] ? stateEntity[field.code] : "" }
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
                    value={stateEntity.Is_Admin}
                    label="statut admin"
                    onChange={(e)=>updateField(field.code, e.target.value)}
                >
                    {/* <MenuItem value="">{stateEntity.Is_Admin}</MenuItem> */}
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
  )
}

export default UserForm ;