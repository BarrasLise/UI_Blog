import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {  useParams } from "react-router-dom";
import { useFetch } from "use-http";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [entity, setEntity] = useState(
        {
            Pseudo: "",
            Firstname : "", 
            Lastname : "", 
            Email : "",
            Is_Admin : "",
            Password : "", 
            CheckPassword : "", 
            Title : "",
            Body : "",
            Author: "",
        }
    );
    const [isDirty, setIsDirty] = useState(false);
    const { id } = useParams("");
    // const navigate = useNavigate();
    const baseURL = "posts";
  
    const { data, loading : loadingUser, error : errorUser, post : postUser, get : getUser, response : responseUser} = useFetch('session');
    const { get, put, data : posts, del, post, response, error, loading,} = useFetch( baseURL ,{});
  
    const [cookie] = useCookies(['PHPSESSID']);
    console.log(data);
    console.log(posts);

    useEffect(() => {
        get(`${id}`);
        if(cookie.PHPSESSID) getUser('current_user');
        if (loading && loadingUser) return;
        if (response.ok) {
          setEntity(posts);
          // setIsDirty(false);
        }
    }, [loading, response.ok, posts, setEntity, setIsDirty, id, get, loadingUser, cookie, getUser]);

    //fonction pour modifier les champs
    const updateField = (name, value) => {
        if (!name) return;
        setEntity({...entity, [name]: value});
        setIsDirty(true);
        console.log("isDirty:", isDirty); 
    };
    const refreshEntity = () => {
        get(`${id}`);
    };
    const login = async () => {
        try {
     
          await postUser('login', {
            Pseudo: entity.Pseudo,
            Password: entity.Password
          });
        
        } catch (error) {
          // Gérer les erreurs de connexion
        }
      }
    const unLogin = () => {
        // alert('Vous allez être déconnecter...');
        getUser('unlogin');
    }
    //Créer une nouvelle entity
  const createEntity = async (e) => {
    e.preventDefault();
    console.log("test crearteEntity");
    const newPost = {
        Title: entity.postTitle,
        Body: entity.postBody,
    };
    console.log(newPost);
  
    try {
        const createdPost = await post('', newPost);
        if (response.ok) {
          console.log('Post créé avec succès', createdPost);
        //   navigate('/'); // Naviguer vers la page d'accueil ou une autre page après la création réussie du post
        } else {
          console.error('La création du post a échoué');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite', error);
    }

  };
 

  //test alert confirm : 
  const deleteEntity= async () => {
    if (window.confirm("Voulez vous vraiment supprimer ce post ?" ) === true){
      await del(`${id}`);
    //   if (response.ok) navigate('../');
    } else {
      alert("Vous n'avez pas supprimer le post !");
    }
  }

  const saveEntity = async () => {
    await put(`${id}`, entity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await put(`${id}`, entity);
    if (response.ok) {
      // navigate('../');
    }
  };

//   const backTo = () => {
//     navigate('../blogs/'+ entity.id);
//   };

//   const editPost = () => {
//     navigate('../edit/' + entity.id);
//   };

  const value = {
    isDirty,
    setIsDirty,
    entity,
    loading,
    error,
    errorUser,
    response,
    responseUser,
    updateField,
    createEntity,
    deleteEntity,
    saveEntity,
    handleSubmit,
    // backTo,
    // editPost,
    put,
    post,
    refreshEntity, 
    id,
    baseURL,
    isLoggedIn: !loadingUser ? data?.ID ? (true) : (false) : false,
    user : !loadingUser ? data : null,
    unLogin,
    login,
  };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
 
export default GlobalProvider;