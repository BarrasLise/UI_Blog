import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from "./NotFound";
import BlogList from "./BlogList";

const AppRoutes = () => {
  return(
    <Routes >
        <Route exact path="/" element={<BlogList />} />
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