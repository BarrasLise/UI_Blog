import  { useState, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useFetch } from 'use-http';



export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  

 
  
  const { data, loading, error, post, get, response } = useFetch('session');

  // const [pseudo, setPseudo] = useState('');
  // const [password, setPassword] = useState('');
  const [cookie] = useCookies(['PHPSESSID']);

  const [stateLogin, setStateLogin] = useState({
    Pseudo: "",
    Password: "",
  });

  //fonction pour modifier les champs
  const updateField = (name, value) => {
    if (!name) return;
    setStateLogin({ ...stateLogin, [name]: value });
    // setIsDirty(true);
  };

  // const login = () => {
  //   post('login', {
  //     Pseudo: stateLogin.Pseudo,
  //     Password: stateLogin.Password
  //   });
  //   navigate('/');
  // }
  const login = async () => {
    try {
      await post('login', {
        Pseudo: stateLogin.Pseudo,
        Password: stateLogin.Password
      });
      // Rediriger l'utilisateur vers "/" après une connexion réussie
    
    } catch (error) {
      // Gérer les erreurs de connexion
    }
  }

  useEffect(() => {
    
    if(cookie.PHPSESSID) get('current_user');

  },[cookie, get])

  const unLogin = () => {
    // alert('Vous allez être déconnecter...');
    get('unlogin');

  }

  const value = {
    response,
    error,
    loading,
    updateField,
    stateLogin,
    // pseudo,
    // setPseudo,
    // password,
    // setPassword,
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