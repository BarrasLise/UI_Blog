import BlogList from "./components/BlogList";
import Navbar from "./components/Navbar";
import { Container, CssBaseline } from '@mui/material';



function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth={'xl'} sx={{mt:"20px"}}>
        <BlogList />
      </Container>
    </>
  );
}

export default App;
