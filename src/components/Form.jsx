import { useContext, useEffect, useState } from "react";
// import { EntityContext } from "../contexts/EntityContext";

import { Button, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import { EntityContext } from "../contexts/EntityContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useFetch } from "use-http";

const Form = ({fields, context}) => {
    // const { id } = useParams('');
    // const {  data,  response, loading,} = useFetch( 'users/'+id ,{}, []);
    const [isDirty, setIsDirty] = useState(false);
//     const {  setEntity, entity, updateField : updateFieldPosts} = useContext(EntityContext);

//   const {setStateEntity, stateEntity, updateField : a }=useContext(AuthContext);
//   console.log(stateEntity);

    const authContext = useContext(AuthContext);
  const entityContext = useContext(EntityContext);

  // Sélectionnez le contexte approprié en fonction de contextChoisi
//   const contextc = context === "users" ?
//   const {setStateEntity, stateEntity, updateField : a }=useContext(AuthContext); 
//    : const {  setEntity, entity, updateField : updateFieldPosts} = useContext(EntityContext);

// const ContextChoice = context === "users" ?useContext(AuthContext) :  useContext(EntityContext) ;
//   const { setEntity, entity } = ContextChoice;

const ContextChoice = useContext(context === "users" ? AuthContext : EntityContext);
const { setEntity, entity, updateField } = ContextChoice;
//   const { setStateEntity, stateEntity   } = authContext;

    
//   const { entity, updateField } = useContext(GlobalContext);
  console.log("entity : " + entity);
//   console.log("stateEntity " + stateEntity);
//   console.log("context : " + contextc);
  console.log("fields : " + fields);

  


 
//   const updateField = (name, value) => {
//     if (!name) return;
//     if(context === "posts") {
//         setEntity({...entity, [name]: value}) ;
//     } else {
//         setStateEntity({...stateEntity, [name]: value});
//     }
//     // setEntity({...entity, [name]: value});
//     setIsDirty(true);
//     console.log("isDirty:", isDirty); 
//     };

// fonction pour modifier les champs
// const updateField = (name, value) => {
//     if (!name) return;
//     setEntity({ ...entity, [name]: value });
//     setIsDirty(true);
//   };
    
  

  return (
    fields && fields.length && entity
    // || entity || setEntity
    // || stateEntity || setStateEntity
    && context
     ? (
        <>
        { fields.map((field) => {
            //  const value = context === "posts" ? entity[field.code] || "" : stateEntity[field.code] || "";
            //  const function = context === "posts" ? setEntity({ ...entity, [field.code]: e.target.value }) : setStateEntity({ ...stateEntity, [field.code]: e.target.value }); 

            return(

                field.type === 'text'  ? (

                    <TextField
                        key={field.label}
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        label={field.label}
                        name={field.label}
                        autoComplete={field.label}
                        // value={stateEntity[field.code] ? stateEntity[field.code] : "" }
                        value={entity[field.code] ? entity[field.code] : ''}
                        // value={value}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        // onChange={(e) => {
                        //     // if (context === "posts") {
                        //     //   setEntity({ ...entity, [field.code]: e.target.value });
                        //     // } else {
                        //       setStateEntity({ ...stateEntity, [field.code]: e.target.value });
                        //     // }
                        //   }}
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
                        // value={value}
                        value={entity[field.code] ? entity[field.code] : ''}
                        onChange={(e) => updateField(field.code, e.target.value)}
                        // onChange={(e) => {
                        //     if (context === "posts") {
                        //       setEntity({ ...entity, [field.code]: e.target.value });
                        //     } else {
                        //       setStateEntity({ ...stateEntity, [field.code]: e.target.value });
                        //     }
                        //   }}
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
                        // onChange={(e) => {
                        //     if (context === "posts") {
                        //       setEntity({ ...entity, [field.code]: e.target.value });
                        //     } else {
                        //       setStateEntity({ ...stateEntity, [field.code]: e.target.value });
                        //     }
                        //   }}
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
                                // value={value}
                                value={entity.Is_Admin}
                                label="statut admin"
                                onChange={(e)=>updateField(field.code, e.target.value)}
                                // onChange={(e) => {
                                //     if (context === "posts") {
                                //       setEntity({ ...entity, [field.code]: e.target.value });
                                //     } else {
                                //       setStateEntity({ ...stateEntity, [field.code]: e.target.value });
                                //     }
                                //   }}
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

                ) : "pas de type trouvé"
            )
        })}
        </>
    ) : "erreur de chargement ?"
    
);
}
 
export default Form;