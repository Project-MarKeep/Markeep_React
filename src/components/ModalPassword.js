import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import { API_BASE_URL as BASE, USER } from '../config/host-config';
import { useNavigate } from 'react-router-dom';
import { Padding } from '@mui/icons-material';

const ModalPassword = ({ setValue }) => {
  const API_BASE_URL = BASE + USER;

  const [email, setEmail] = useState('');
  const [input, setInput] = useState();
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState('');
  const [isDuplicateChecked, setDuplicateChecked] = useState(false);
  const [isCodeVerified, setCodeVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const $fileTag = useRef();
  const redirection = useNavigate();

  const fetchVerificationCode = async () => {
    // 인증 코드 요청
    const codeRes = await fetch(API_BASE_URL + `/password?email=${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ email }),
    });
    const code = await codeRes.text();

    console.log('codeRes: ', code);
    setCode(code);
  };

  // 인증 코드 확인

  const handleCodeVerification = (e) => {
    setInput(e.target.value);
    if (code === input) {
      setCodeVerified(true);
      setPasswordVisible(true); // 인증코드가 맞으면 패스워드 입력창 띄어줌
    } else {
      alert('인증 코드가 올바르지않습니다.');
    }
  };

  // 비밀번호 재설정
  const handlePasswordReset = async () => {
    // 비밀번호 일치 여부 확인
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('email, password : ', email, password);

    const resetRes = await fetch(API_BASE_URL + `/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (resetRes.status === 200) {
      alert('비밀번호가 재설정되었습니다. 다시 로그인 해주세요.');
      setValue('signIn');
    } else {
      alert('비밀번호 재설정 실패했습니다.');
    }
  };

  return (
    <div className='form-wrap'>
      {!isCodeVerified ? (
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
                id='Email'
                variant='outlined'
                fullWidth
                placeholder='Email'
                margin='normal'
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon sx={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        edge='end'
                        onClick={fetchVerificationCode}
                      >
                        {isDuplicateChecked ? (
                          <CheckCircleIcon />
                        ) : (
                          <CheckCircleOutlineIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    border: '1px solid #363636',
                    color: 'lightgray',
                    width: '80%',
                    height: '45px',
                    margin: 'auto',
                    borderRadius: '20px',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                type='text'
                variant='outlined'
                fullWidth
                placeholder='인증코드'
                margin='normal'
                onChange={(e) => setInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        edge='end'
                        onClick={handleCodeVerification}
                        sx={{ padding: '30px', width: '2px', fontSize: '20px' }}
                      >
                        {isCodeVerified ? <CheckIcon /> : '확인'}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    border: '1px solid #363636',
                    color: 'lightgray',
                    width: '50%',
                    height: '45px',
                    margin: '0 0 0 40%',
                    borderRadius: '20px',
                  },
                }}
              />
            </Grid>
          </Grid>
        </form>
      ) : (
        // 인증코드가 맞으면 패스워드 입력 창을 보여줌
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
                type='password'
                variant='outlined'
                fullWidth
                placeholder='Password'
                margin='normal'
                onChange={(e) => setPassword(e.target.value)}
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
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              {isPasswordVisible && (
                <TextField
                  type='password'
                  variant='outlined'
                  fullWidth
                  placeholder='Password Confirm'
                  margin='normal'
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
                />
              )}
            </Grid>
          </Grid>
          {isPasswordVisible && (
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '20%', borderRadius: '30px', margin: '2em 17em' }}
              onClick={handlePasswordReset}
            >
              Next <NavigateNextIcon fontSize='medium' />
            </Button>
          )}
        </form>
      )}
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
        {/* SNS 로그인 아이콘들 */}
      </Box>
    </div>
  );
};

export default ModalPassword;
