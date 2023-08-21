import { useState, createContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'use-http';

export const EntityContext = createContext({});

const EntityProvider = ({ children, ressource }) => {
  const [entity, setEntity] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const { id } = useParams("");
  const navigate = useNavigate();
  const baseURL = "posts";

  const { get, put, data, del, post, response, error, loading,} = useFetch( baseURL ,{});

  useEffect(() => {
    if (loading) return;
    if (response.ok) {
      setEntity(data);
      setIsDirty(false);
    }
  }, [loading, response.ok, data, setEntity, setIsDirty]);

  useEffect(() => {
    get(`${id}`);
  }, [id, get])

  const refreshEntity = () => {
    get(`${id}`);
  };

  //fonction pour modifier les champs
  const updateField = (name, value) => {
    if (!name) return;
    setEntity({ ...entity, [name]: value });
    setIsDirty(true);
  };
  //Créer une nouvelle entity
  const createEntity = async () => {
    await post(true, { ...entity });
    navigate("../");

  };
 

  //test alert confirm : 
  const deleteEntity= async () => {
    if (window.confirm("Voulez vous vraiment supprimer ce post ?" ) === true){
      await del(`${id}`);
      if (response.ok) navigate('../');
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
    id,
    baseURL
  };

  return <EntityContext.Provider value={value}>{children}</EntityContext.Provider>;
};
export default EntityProvider;
