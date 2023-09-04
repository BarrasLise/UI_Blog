import  React, { useState} from 'react';
import useFetch from 'use-http';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useTheme } from "@mui/material";


const Filters = ({ onSubmit }) => {
  const theme = useTheme(); // Récupérez le thème
  const [open, setOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    liked: false,
    latest: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [author, setAuthor] = useState([]);

  const { data : users} = useFetch( 'users' ,{}, []);
  console.log(users);
 

  
  //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCheckboxChange = (e) => {
    //ici les statut des checkbox sont modifiés
    setCheckboxState({
      ...checkboxState,
      [e.target.name]: e.target.checked,
    });
  };
  
  const handleSearchChange = (e) => {
    //ici la valeur de la barre de recherche est modifié
    setSearchValue(e.target.value);
  };

  const handleFilter = async () => {
 
    // ici, je vérifie mes résultats dans la console : 
    console.log("Checkbox state:", checkboxState); //renvoie un objet (true/false)
    console.log("Search value:", searchValue);
    console.log("Author Value:", author);//renvoie un tableau de valeur

    // Construction de l'URL avec les paramètres de filtre :
    const filterURL = buildFilterURL();
    // console.log(`posts${filterURL}`);
    onSubmit(`posts${filterURL}`);//voir bloglist onsubmit ! 
    setOpen(false);
    
  };

  // Construction de l'URL avec les paramètres de filtre
  const buildFilterURL = () => {
    const params = new URLSearchParams();

    if (searchValue) {
      params.append('searchValue', searchValue);
    }

    if (author.length > 0) {
      params.append('author', author.join(','));
    }

    if (checkboxState.liked) {
      params.append('liked', 'true');
    }

    if (checkboxState.latest) {
      params.append('latest', 'true');
    }

    return `?${params.toString()}`;
  };

  const handleReset = () => {
    //ici je réinitialise mes filtres
    setCheckboxState({
      liked: false,
      latest: false,
    });
    setSearchValue("");
    setAuthor([]);
  };

  const handleAuthorChange = (event) => {

    const {
      target: { value },
    } = event;
    setAuthor(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  
  return (
    <>
    <Box component="div" >
      <Button 
      color="primary" 
      variant="contained"
      onClick={handleClickOpen}
      mt={"5px"}
      > 
        <SearchIcon />
      </Button>
     
        <Dialog open={open} onClose={handleClose}>
          
          <DialogTitle sx={{
                         display: 'flex',
                         flexDirection: 'row',
                         justifyContent: 'space-between',
                       }}>Filtres
            <Button color="inherit" className="CloseButton" variant="text" onClick={handleClose}>
              <CloseIcon  />
            </Button>
          </DialogTitle>

          <DialogContent sx={{maxWidth: "500px"}}>
            <DialogContentText color={theme.palette.primary.main}>
              Ici bientôt des filtres!
            </DialogContentText>
            <TextField
                type="text"
                placeholder="Rechercher"
                value={searchValue}
                onChange={handleSearchChange}  
            />
            <FormGroup>
              
              <FormControlLabel
                control={
                  <Checkbox  
                  name="liked" 
                  checked={checkboxState.liked}
                  onChange={handleCheckboxChange}
                  />
                }
                label="checkbox liked"
              />
              <FormControlLabel
                control={
                  <Checkbox  name="latest" checked={checkboxState.latest}
                  onChange={handleCheckboxChange} />
                }
                label="checkbox le plus récent"
              />
            </FormGroup>
            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="">Auteur</InputLabel>
          <Select
            value={author}
            multiple
            input={<OutlinedInput label="Name" />}
            
            onChange={handleAuthorChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {/* faire générer les auteurs ici */}
            {users?.length ? users.map(user => (
              <MenuItem key={user.Pseudo}  value={user.Pseudo}>{user.Pseudo}</MenuItem>
            )) : null }
           
          </Select> 
          </FormControl>

          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box component="div" >
              <Button  variant="contained" onClick={handleFilter} ><SearchIcon/>Filtrer</Button>
              <Button variant="contained" onClick={handleReset}><ReplayIcon /> Réinitialiser</Button>
              
              <Button color="secondary" variant="contained" onClick={handleClose}><CloseIcon />Fermer</Button>
            </Box>
          </DialogActions>
        </Dialog>
      
    </Box>
    
    </>
  );
}
export default Filters;