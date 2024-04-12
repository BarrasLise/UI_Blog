import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from "./NotFound";
import BlogList from "./BlogList";
import Create from "./Create";
import Profile from "./Profile";
import UserDetails from "./UserDetails";
import BlogDetailsView from "./BlogDetailsView";

const AppRoutes = () => {
  return(
    <>
    <Routes>
      <Route exact path="/" element={<BlogList />} />
      <Route
        path="/posts"
        element={<Create />} />
      <Route
        path="/posts/:id"
        element={<BlogDetailsView />} />
      <Route path="/login"
        element={<Login />} />
      <Route
        path="/register"
        element={<Register />} />
      <Route
        path="/users"
        element={<Profile />} />
      <Route
        path="/users/:id"
        element={<UserDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AppRoutes