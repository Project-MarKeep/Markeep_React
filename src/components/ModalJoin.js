import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import { API_BASE_URL as BASE, USER } from '../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const ModalJoin = () => {
  // useRef를 사용해서 태그 참조하기
  const $fileTag = useRef();

  // 리다이렉트 사용하기
  const redirection = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);
  const { open, setOpen } = useState(false);

  const API_BASE_URL = BASE + USER;

  const [code, setCode] = useState();
  const [checked, setChecked] = useState(false);
  const [emailValue, setEmailValue] = useState();

  // 상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  // 검증 메세지에 대한 상태변수 괸리
  // 입력값과 메셎는 따로 상태 관리(메세지는 백엔드로 보내줄 필요 x)
  // 메세지 영역이 각 입력창마다 있기 때문에 객체를 활용해서 한번에 관리.
  const [message, setMessage] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  // 검증 완료 체크에 대한 상태변수관리
  // 각각의 입력창마다 검증 상태를 관리해야 하기 때문에 객체로 선언.
  // 상태를 유지하려는 이유 -> 마지막에 회원가입 버튼을 누를 때 까지 검증상태를 유지해야 하기 때문
  const [correct, setCorrect] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  // 검증된 데이터를 각각의 상태변수에 저장해 주는 함수
  const saveInputState = ({ key, inputValue, flag, msg }) => {
    // 입력값 세팅
    // 패스워드 확인 입력값은 굳이 userValue 상태로 유지할 필요가 없기 때문에
    // 임의의 문자열 'pass'를 넘기고 있다. -> pass가 넘어오면 setUserValue()를 실행하지 않겠다.
    inputValue !== 'pass' &&
      setUserValue((oldVal) => {
        return { ...oldVal, [key]: inputValue };
      });

    // 메세지 세팅
    setMessage((oldMsg) => {
      return { ...oldMsg, [key]: msg }; // key 변수의 값을 프로퍼티 이름으로 활용.
    });

    // 입력값 검증 상태 세팅
    setCorrect((oldCorrect) => {
      return { ...oldCorrect, [key]: flag };
    });
  };

  // 이메일 중복 체크, 이메일 인증 서버 통신 함수
  const fetchDuplicateCheck = async (email) => {
    let msg = '';
    let flag = false;

    const res = await fetch(API_BASE_URL + '/join?email=' + email);

    if (res.status === 200) {
      const json = await res.json();

      if (json) {
        msg = '이메일이 중복되었습니다.';
      } else {
        msg = '사용 가능한 이메일 입니다.';
        flag = true;
      }

      const code = res.text();
      console.log(code);
      setCode(code);

      // 이메일 인증코드 확인(코드가 맞으면 찐한체크표시)
      if (code) {
        setDuplicateChecked(true);
      }

      saveInputState({
        key: 'email',
        inputValue: email,
        msg,
        flag,
      });
    } else {
      console.log('서버 통신이 원활하지 않습니다.');
    }
  };

  // 이메일 입력창 이벤트 핸들러
  const emailHandler = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      // 이메일 중복 체크
      fetchDuplicateCheck(inputValue);
    }

    saveInputState({
      key: 'email',
      inputValue,
      msg,
      flag,
    });
  };
  // 새로운 상태 추가
  const [isEmailInputFocused, setEmailInputFocused] = useState(false);
  const [isDuplicateChecked, setDuplicateChecked] = useState(false);

  // 중복 체크가 완료되면 호출되는 함수
  const handleDuplicateCheck = () => {
    // 중복 체크 로직 수행

    // 로직이 완료되면 상태 변경
    setDuplicateChecked(true);
  };

  // 이메일 입력창 포커스 이벤트 핸들러
  const handleEmailInputFocus = () => {
    setEmailInputFocused(true);
  };

  // 이메일 입력창 포커스 해제 이벤트 핸들러
  const handleEmailInputBlur = () => {
    setEmailInputFocused(false);
  };

  const emailCheckHandler = (e) => {
    if (code === e.target.value) {
      setChecked(true);
    } else {
    }
  };

  const onChangeHandler = (e) => {
    setEmailValue(e.target.value);
    console.log(e.target.value);
  };

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
              id='Email'
              variant='outlined'
              fullWidth
              placeholder='Email'
              margin='normal'
              onChange={onChangeHandler}
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
                      // onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {isDuplicateChecked ? (
                        <CheckCircleIcon
                          onClick={fetchDuplicateCheck(emailValue)}
                        />
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
                  margin: 'auto',
                  borderRadius: '20px',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: isEmailInputFocused
                      ? 'lightgray'
                      : 'lightgray', // 포커스됐을 때의 테두리 색상 변경
                  },
                },
              }}
              onFocus={handleEmailInputFocus}
              onBlur={handleEmailInputBlur}
            />
            <Grid
              item
              xs={12}
            >
              <TextField
                type=''
                variant='outlined'
                fullWidth
                placeholder='인증코드'
                margin='normal'
                InputProps={{
                  // startAdornment: (
                  //   <InputAdornment position='start'>
                  //     <LockOutlinedIcon sx={{ color: 'gray' }} />
                  //   </InputAdornment>
                  // ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        // onClick={}

                        edge='end'
                        onKeyDown={emailCheckHandler}
                      >
                        {checked && <CheckIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),

                  style: {
                    border: '1px solid #363636',
                    color: 'lightgray',
                    width: '30%',
                    margin: '0 0 0 60%',
                    borderRadius: '20px',
                    // sx: { marginRight: '3em' },
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
