import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from 'use-http';

export const EntityContext = createContext({});

const EntityProvider = ({ children, ressource, entityId }) => {
  const [entity, setEntity] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  
  const navigate = useNavigate();
  const baseURL = "posts";

  const { get, put, data : posts, del, post, response, error, loading,} = useFetch( baseURL ,{});

  useEffect(() => {
    get(`${entityId}`); //entityId contient id qui est récuérer au niveau de la vue BlogDetailsView.jsx
    if (loading) return;
    if (response.ok) {
      setEntity(posts);
    }
  }, [loading, response.ok, posts, setEntity, setIsDirty, entityId, get]);

  // useEffect(() => {
  //   get(`${id}`);
  // }, [id, get])

  const refreshEntity = () => {
    get(`${entityId}`);
  };

  // fonction pour modifier les champs
  const updateField = (name, value) => {
    if (!name) return;
    setEntity({ ...entity, [name]: value });
    setIsDirty(true);
  };
  //Créer une nouvelle entity
  const createEntity = async (e) => {
    e.preventDefault();
    console.log("test crearteEntity");
  
    const newPost = {
      Title: entity.Title,
      Body: entity.Body,
    };
      console.log(newPost);
  
      try {
        const createdPost = await post('', newPost);
        if (response.ok) {
          console.log('Post créé avec succès', createdPost);
          navigate('/'); // Naviguer vers la page d'accueil ou une autre page après la création réussie du post
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
      await del(`${entityId}`);
      if (response.ok) navigate('../');
    } else {
      alert("Vous n'avez pas supprimer le post !");
    }
  }

  const saveEntity = async () => {
    await put(`${entityId}`, entity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await put(`${entityId}`, entity);
    if (response.ok) {
      // navigate('../');
    }
  };

  const backTo = () => {
    navigate ('../blogs/'+ entity.id);
  };

  const editPost = () => {
    navigate('../edit/' + entity.id);
  };

  const value = {
    isDirty,
    entity,
    loading,
    error,
    response,
    updateField,
    createEntity,
    deleteEntity,
    saveEntity,
    handleSubmit,
    backTo,
    editPost,
    put,
    post,
    refreshEntity, 
    entityId,
    baseURL,
  };

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>;
};
export default EntityProvider;
