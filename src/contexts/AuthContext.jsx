import  { useState, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useFetch } from 'use-http';


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  
  const { data, loading, error, post, get, response } = useFetch('session');

  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [cookie] = useCookies(['PHPSESSID']);

  

  const login = () => {
    post('login', {
      Pseudo: pseudo,
      Password: password
    })
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
    pseudo,
    setPseudo,
    password,
    setPassword,
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