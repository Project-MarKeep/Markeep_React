import { AppBar, Box, Button, InputBase, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import './Header.scss';
import SignModal from './SignModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Header = () => {  

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  const StyledLogo = styled(Box)`
  && {
    margin: 1rem 2rem;
    font-family: Nunito-B;
    font-size: 2rem;
    background: linear-gradient(90deg, #6ecbf5, #c252e1);
    -webkit-background-clip: text;
    color: transparent;
    flex-grow: 0.1
  }
  `;

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='primary' sx={{background: '#2a2356', outline: 'none'}}>
          <Toolbar sx={{justifyContent: 'flex-start'}}>
              <StyledLogo>
                Markeep
              </StyledLogo>
              <div className='input-box'>
                <input type='text' id='search' placeholder='검색어를 입력해 주세요.' />
                <a className='search-img'></a>
              </div>
              <div className='button-group'>
                <Button size='large' color="inherit" onClick={handleOpen}>Sign Up</Button>
                <Button size='large' color="inherit">Sign In</Button>
                <SignModal open={open} handleClose={handleClose} />
              </div>
            </Toolbar>
        </AppBar>
      </Box>
  )
}

export default Header
