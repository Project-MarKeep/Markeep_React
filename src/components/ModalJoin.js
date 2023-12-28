import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ModalJoin = () => {
  return (
    <div className='form-wrap'>
      <form
        noValidate
        autoComplete='false'
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              variant='outlined'
              fullWidth
              placeholder='Account'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon sx={{ color: 'gray' }} />
                  </InputAdornment>
                ),
                style: {
                  border: '1px solid #363636',
                  color: 'lightgray',
                  width: '80%',
                  margin: 'auto',
                  borderra: '20px',
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
          <Grid
            item
            xs={12}
          >
            <TextField
              type='password'
              variant='outlined'
              fullWidth
              placeholder='Password'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOutlinedIcon sx={{ color: 'gray' }} />
                  </InputAdornment>
                ),
                style: {
                  border: '1px solid #363636',
                  color: 'lightgray',
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
          <Grid
            item
            xs={12}
          >
            <TextField
              type='password'
              variant='outlined'
              fullWidth
              placeholder='Password Confirm'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOutlinedIcon sx={{ color: 'gray' }} />
                  </InputAdornment>
                ),
                style: {
                  border: '1px solid #363636',
                  color: 'lightgray',
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
        </Grid>
        <Button
          variant='contained'
          color='primary'
          sx={{ width: '20%', borderRadius: '30px', margin: '2em 17em' }}
        >
          Next <NavigateNextIcon fontSize='medium' />
        </Button>
      </form>

      <Divider
        variant='middle'
        sx={{ color: 'lightgray' }}
      >
        Or Connect With
      </Divider>
      <Box
        sx={{
          width: '40%',
          margin: '1em auto 3em',
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-around',
        }}
      >
        <img
          src={require('../assets/img/kakao.png')}
          alt='kakao'
          className='sns-login-icon'
        />
        <img
          src={require('../assets/img/naver_icon.png')}
          alt='kakao'
          className='sns-login-icon'
        />
        <img
          src={require('../assets/img/google_icon.png')}
          alt='kakao'
          className='sns-login-icon'
        />
      </Box>
    </div>
  );
};

export default ModalJoin;
