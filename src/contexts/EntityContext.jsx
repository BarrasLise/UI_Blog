import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from 'use-http';

export const EntityContext = createContext({});

const EntityProvider = ({ children, ressource, entityId }) => {
  const [entity, setEntity] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  
  const navigate = useNavigate();
  const baseURL = "posts";

  const { get, put, data : posts, del, post, response, error, loading,} = useFetch( baseURL ,{});

  useEffect(() => {
    // get(`${entityId}`); //entityId contient id qui est récupérer au niveau de la vue BlogDetailsView.jsx
    if (loading) return;
    if (response.ok) {
      setEntity(posts);
    }
  }, [loading, response.ok, posts, setEntity, setIsDirty, entityId, get]);

  useEffect(() => {
    get(`${entityId}`);
  }, [entityId, get])

  const refreshEntity = () => {
    get(`${entityId}`);
  };

  // fonction pour modifier les champs
  const updateField = (name, value) => {
    if (!name) return;
    setEntity({ ...entity, [name]: value });
    setIsDirty(true);
  };
 
  const createEntity = async (e) => {
    e.preventDefault();
    console.log("test createEntity");
  
    const newPost = {
      Title: entity.Title,
      Body: entity.Body,
      Categories: entity.Categories,
    };
    console.log(newPost);
  
    try {
      const createdPost = await post('', newPost);
  
      // if (response.ok) {
      if(response.status === 200) { 
        console.log('Post créé avec succès', createdPost);
        setAlertOpen(true);
        setAlertSeverity('success'); //  définir le type de sévérité de l'alerte
        setAlertMessage('Le post a été créé avec succès!'); //  définir le message de l'alerte
        // navigate('/'); // Naviguer vers la page d'accueil 
      } else {
        console.error('La création du post a échoué');
        setAlertOpen(true);
        setAlertSeverity('error'); //  définir le type de sévérité de l'alerte
        setAlertMessage('Erreur lors de la création du post.'); // définir le message de l'alerte
      }
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
      setAlertOpen(true);
      setAlertSeverity('error'); // définir le type de sévérité de l'alerte
      setAlertMessage('Une erreur s\'est produite lors de la création du post.'); //  définir le message de l'alerte
    }
  };
  
 

  //test alert confirm : 
  const deleteEntity= async () => {
    if (window.confirm("Voulez vous vraiment supprimer ce post ?" ) === true){
      await del(`${entityId}`);
      if (response.ok) navigate('../');
    } else {
      // alert("Vous n'avez pas supprimer le post !");
      setAlertOpen(true);
      setAlertSeverity('success'); //  définir le type de sévérité de l'alerte
      setAlertMessage('Le post a été supprimer avec succès!');
    }
  }

  const saveEntity = async () => {
    await put(`${entityId}`, entity);

    console.log("test saveEntity");
    // Afficher l'alerte
    setAlertOpen(true);
    setAlertSeverity('success'); //  définir le type de sévérité de l'alerte
    setAlertMessage('Le post a été enregistré avec succès!');
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
    console.log("editpost");
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
    setAlertOpen, alertOpen, 
    setAlertSeverity, alertSeverity,
    setAlertMessage, alertMessage
  };

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>;
};
export default EntityProvider;
