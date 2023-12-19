import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ModalLogin = () => {
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
              margin='normal'
              placeholder='Account'
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
              margin='normal'
              placeholder='Password'
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
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: 'gray', // 체크되지 않았을 때의 색상
                marginLeft: '4em',
                '&.Mui-checked': {
                  color: 'lightGray', // 체크됐을 때의 색상
                },
              }}
            />
          }
          label='Remember'
          sx={{
            '& .MuiTypography-body1': {
              // MUI v5 기준 Typography 스타일 클래스
              fontSize: '0.875rem', // 폰트 크기 조정
              color: 'lightGray', // 폰트 색상 조정
            },
          }}
        />
        <Link
          href='#'
          color={'lightGray'}
          underline='hover'
          sx={{ marginLeft: '15em' }}
        >
          Forgot Password?
        </Link>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{ width: '50%', borderRadius: '30px', margin: '1em 10em' }}
        >
          Sign In
        </Button>
      </form>
      <Box sx={{ margin: '2em' }}>
        <Typography
          variant='h6'
          align='center'
        >
          Don't have an account?{' '}
          <Link
            href='#'
            color={'lightGray'}
            underline='hover'
          >
            Sign Up Now!
          </Link>
        </Typography>
      </Box>
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

export default ModalLogin;
