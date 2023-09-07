import { Box, Button, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "use-http";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const UserDetails = () => {
  const { id } = useParams('');
  const navigate = useNavigate();
  const {user : current_user, unLogin, stateEntity, setStateEntity}=useContext(AuthContext);
  const { put, data, del, response, loading,} = useFetch( 'users/'+id ,{}, []);

  // Déclarez isDirty comme un état local
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (response.ok) {
      // setEntity(data);   
      setStateEntity(data);
    }
  }, [loading, response.ok, data, setStateEntity]);

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

  const fields = [
    {
      code : 'Pseudo',
      label : 'Pseudo',
      type : 'text'
    }, 
    {
      code : 'Firstname',
      label : 'Prénom',
      type : 'text'
    },
    {
      code : 'Lastname',
      label : 'Nom',
      type : 'text'
    },
    {
      code : 'Email',
      label : 'Email',
      type : 'text'
    }, 
    {
      code : 'Is_Admin',
      type : 'select'
    }, 
   

  ];

  

  return (
    <>
    <Box component="div" className="form" 
        sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    // maxWidth : "900px"
        }}>
          
        <Typography variant="h2">Détails de l'utilisateur</Typography>
        <UserForm fields={fields} isDirty={isDirty} setIsDirty={setIsDirty}/>

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
    </Box>
    </>
  );
};

export default UserDetails;