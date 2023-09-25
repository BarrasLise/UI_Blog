import  { useState, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useFetch } from 'use-http';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [info, setInfo] = useState(false)
  
  const { data, loading, error, post : postUser, get : getUser, response } = useFetch('session');

  const [cookie] = useCookies(['PHPSESSID']);

  const [entity, setEntity] = useState({
    Pseudo: "",
    Firstname : "", 
    Lastname : "", 
    Email : "",
    Is_Admin : "",
    Password : "", 
    CheckPassword : "", 
  }); 

  const infos = () => {
    //Fonction pour afficher les "heperText sus les fields"
    setInfo(!info);
    console.log(info);
 } 

  //fonction pour modifier les champs
  const updateField = (name, value) => {
    if (!name) return;
    setEntity({...entity, [name]: value});
    setIsDirty(true);
    console.log("isDirty:", isDirty); 
  };

  const login = async () => {
    try {
 
      await postUser('login', {
        Pseudo: entity.Pseudo,
        Password: entity.Password
      });
    
    } catch (error) {
      // Gérer les erreurs de connexion
      console.log(error);
    }
  }

  useEffect(() => {
    
    if(cookie.PHPSESSID) getUser('current_user');

  },[cookie, getUser])

  const unLogin = () => {
    getUser('unlogin');

  }

  const value = {
    response,
    error,
    loading,
    infos,
    info,
    updateField,
    isDirty,
    setIsDirty,
    entity, 
    setEntity,
    isLoggedIn: !loading ? data?.ID ? (true) : (false) : false,
    user : !loading ? data : null,
    unLogin,
    login,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
}

export default AuthProvider;