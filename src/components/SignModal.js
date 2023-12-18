import React, { useState } from "react";
import "./SignModal.scss";
import SnsLogin from "./login/SnsLogin";
import { Dialog, Tabs, Tab, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Grid, InputAdornment, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignModal = ({ open, handleClose }) => {



  const [value, setValue] = useState('signIn');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{
      sx: {
        background: '#413a6f',
        borderRadius: '30px'
      }
    }}>
    <Tabs value={value} onChange={handleChange} variant='fullWidth'
      sx={{
        marginBottom: '2em',
        '& .MuiTabs-indicator': {
          backgroundColor: 'white', // 원하는 색상 코드로 변경
        }
      }}
    >
      <Tab label="Sign In" value="signIn"
        sx={{
          '&.Mui-selected': { color: '#6ecbf5' },  // 선택됐을 때의 색상
          '&.Mui-focusVisible': { backgroundColor: 'rgba(100, 100, 100, 0.2)' },  // 포커스 됐을 때의 배경색
        }}
      />
      <Tab label="Sign Up" value="signUp" 
        sx={{
          '&.Mui-selected': { color: '#6ecbf5' },  // 선택됐을 때의 색상
          '&.Mui-focusVisible': { backgroundColor: 'rgba(100, 100, 100, 0.2)' },  // 포커스 됐을 때의 배경색
        }}
      />
    </Tabs>
    {value === 'signIn' && (
      <div className="form-wrap">
        <form noValidate autoComplete="false">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Account"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{color: 'gray'}} />
                    </InputAdornment>
                  ),
                  style: {
                    border: '1px solid #363636',
                    color: "lightgray",
                    width: '80%',
                    margin: 'auto',
                    borderRadius: '20px',
                  },
        
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'lightgray', // 포커스됐을 때의 테두리 색상 변경
                    },
                  },
                }}
              />
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{color: 'gray'}} />
                    </InputAdornment>
                  ),
                  style: {
                    border: '1px solid #363636',
                    color: "lightgray",
                    width: '80%',
                    margin: 'auto',
                    borderRadius: '20px'
                  }
                }}
              />
            </Grid>
          </Grid>
          <FormControlLabel control={<Checkbox sx={{
                color: 'gray', // 체크되지 않았을 때의 색상
                marginLeft: '4em',
                '&.Mui-checked': {
                  color: 'lightGray', // 체크됐을 때의 색상
                },
              }}
        />} label="Remember"
          sx={{
                '& .MuiTypography-body1': { // MUI v5 기준 Typography 스타일 클래스
                  fontSize: '0.875rem', // 폰트 크기 조정
                  color: 'lightGray', // 폰트 색상 조정
                }
              }}
          />
          <Link href='#' color={'lightGray'} underline="hover" sx={{marginLeft: '15em'}}>Forgot Password?</Link>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{width: '50%', borderRadius: '30px', margin: '2em 10em' }}>Sign In
          </Button>
        </form>
        <Box sx={{ margin: '3em'}}>
          <Typography variant="h6" align="center">Don't have an account? Sign Up Now!</Typography>
        </Box>
      </div>
    )}







    {value === 'signUp' && (
      <form noValidate autoComplete="false">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Account"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),      
                style: {
                  width: '80%',
                  margin: 'auto',
                  borderRadius: '20px',
                  
                }
              }}
            />
          </Grid>
        
          <Grid item xs={12}>
            <TextField 
              type="password" 
              variant="outlined" 
              fullWidth
              placeholder="Password"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                style: {
                  width: '80%',
                  margin: 'auto',
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              type="password" 
              variant="outlined" 
              fullWidth
              placeholder="Password Confirm"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                style: {
                  width: '80%',
                  margin: 'auto',
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" fullWidth>Sign Up</Button>
      </form>
    )}
  </Dialog>

  );
};

export default SignModal;
