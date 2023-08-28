import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from "./NotFound";
import BlogList from "./BlogList";
import EntityProvider from '../contexts/EntityContext';
import Create from "./Create";
import BlogDetails from './BlogDetails';
import Profile from "./Profile";
import UserDetails from "./UserDetails";

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
        <Route
          path="/posts/:id"
          element={
            <EntityProvider>
              <BlogDetails />
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
        <Route
          path="/users"
          element={
            <Profile />
          }
        />
        <Route
          path="/users/:id"
          element={
            <UserDetails />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AppRoutes