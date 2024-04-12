import  { useState, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useFetch } from 'use-http';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [info, setInfo] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  
  const { data, loading, error, post, get , response } = useFetch('session');

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
      await post('login', {
        Pseudo: entity.Pseudo,
        Password: entity.Password
      });
      if(response.code === 200) { 
        console.log('La connexion est un succès');
        setAlertOpen(true);
        setAlertSeverity('success'); //  définir le type de sévérité de l'alerte
        setAlertMessage('La connexion est un succès'); //  définir le message de l'alerte
      } else {
        console.error('La connexion a échoué');
        setAlertOpen(true);
        setAlertSeverity('error'); 
        setAlertMessage('Erreur lors de la connexion.');
      }
    } catch (error) {
      // Gérer les erreurs de connexion
      console.log("error", error.message);
      setAlertOpen(true);
      setAlertSeverity('error'); 
      setAlertMessage('Une erreur s\'est produite lors de la connexion.'); 
    }
  }

  useEffect(() => {
    //gestion des cookies
    if(cookie.PHPSESSID) get('current_user');
  },[cookie, get])

  const unLogin = () => {
    get('unlogin');
    setAlertOpen(true);
    setAlertSeverity('success'); 
    setAlertMessage('Vous avez été déconnecter');
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
    setAlertOpen, alertOpen, 
    setAlertSeverity, alertSeverity,
    setAlertMessage, alertMessage
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
}

export default AuthProvider;