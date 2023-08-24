import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from "./NotFound";
import BlogList from "./BlogList";
import EntityProvider from '../contexts/EntityContext';
import Create from "./Create";

const AppRoutes = () => {
  return(
    <Routes >
        <Route exact path="/" element={<BlogList />} />
        <Route
          path="/posts"
          element={
            <EntityProvider>
              <Create />
            </EntityProvider>
          }
        />
        <Route path="/login" 
        element={
          <Login />
        } 
        />
        <Route
          path="/register"
          element={
           
            <Register />
            
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AppRoutes