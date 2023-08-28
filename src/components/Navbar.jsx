import React, { useContext, useState } from 'react';
import {ReactComponent as TopazLogo} from '../Topaz.svg';
import { Menu, AppBar, Box, Toolbar, IconButton, Typography,  Container, Avatar, Button, Tooltip, MenuItem, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { cyan } from '@mui/material/colors';
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
 
  const { unLogin, user : current_user}=useContext(AuthContext);
  

  const pages = ['Accueil', 'Créer post'];
  const settings = ['Mon profil', 'Se déconnecter'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
    
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
    
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return ( 

    <AppBar position="static" color='transparent' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <TopazLogo  /> 
          </Box>
          <Tooltip title="retourner à la page d'accueil">
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Topaz Blog
            </Typography>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* pages quand petit menu */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>

                {page === "Accueil" ? 
                  <Typography textAlign="center" component={"a"} href={`/`} sx={{textDecoration: 'none', color: 'inherit',}} >{page}</Typography> 
                  : 
                  <Typography textAlign="center" component={"a"} href={`/posts`} sx={{textDecoration: 'none', color: 'inherit',}} >{page}</Typography>
                }
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Tooltip title="retourner à la page d'accueil">
            <Typography
                variant="h5"
                noWrap
                component="a" // précise que c'est un lien (balise a) :  <a> <a/>
                href="/" //direction lien où il renvoit
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Topaz Blog
            </Typography>
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <>                                                                                                                                                                                                                                                                    
              
              { page==="Accueil" ? 
                <Button  onClick={handleCloseNavMenu} textAlign="center" component={"a"} href={`/`} sx={{ textDecoration: 'none', my: 2, color: 'black', display: 'block' }}>{page}</Button> 
              : 
              current_user?.Is_Admin ?  <Button textAlign="center" component={"a"} href={`/posts`} sx={{textDecoration: 'none', color: 'inherit'}} >{page}</Button> : null
              }
              </>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Paramètres du compte">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="/static/images/avatar/2.jpg" sx={{bgcolor: cyan[200]}} />
              </IconButton>
            </Tooltip>
            <Menu //cadre blanc représentant le menu lié au profil utilisateur
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>

                  {<Typography>
                    {setting==="Se déconnecter" ? 
                      <Link 
                        textAlign="center"
                        variant="h5"
                        onClick={unLogin}
                        sx={{
                            mr: 2,
                            fontSize : '18px', 
                            flexGrow: 1,
                            fontWeight: 200,
                            color: 'inherit',
                            textDecoration: 'none', 
                          }}
                      >
                        {setting}
                      </Link>
                      : 
                      <Typography 
                      variant="h5"
                      component="a" 
                      href={`/users`} 
                      textAlign="center"
                      sx={{
                        mr: 2,
                        fontSize : '18px', 
                        flexGrow: 1,
                        fontWeight: 200,
                        color: 'inherit',
                        textDecoration: 'none',
                        
                      }}
                     
                      >
                        {setting}
                      </Typography>

                    }
                    
                    </Typography>}
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
 
export default Navbar;