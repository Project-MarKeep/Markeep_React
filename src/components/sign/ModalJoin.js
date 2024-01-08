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
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { USER } from '../../config/host-config';
import GoogleLoginBtn from '../sns-login/GoogleLoginBtn';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { requestHeader } from '../../hoc/folderApi';

const ModalJoin = ({ setValue, handleClose }) => {
  // useRef를 사용해서 태그 참조하기
  const $fileTag = useRef();

  // 리다이렉트 사용하기
  const redirection = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);
  const { open, setOpen } = useState(false);

  const API_BASE_URL = USER;

  const [code, setCode] = useState();
  const [input, setInput] = useState();
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
    nickname: false,
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
  const fetchDuplicateCheck = async () => {
    const res = await fetch(API_BASE_URL + '/join?email=' + userValue.email);

    if (res.status === 200) {
      const code = await res.text();
      console.log('code: ', code);
      setCode(code);
    } else if (res.status === 400) {
      alert('이미 가입된 이메일입니다.');
      let flag = false;
      saveInputState({
        key: 'email',
        userValue,
        msg: '다시 입력해주세요.',
        flag,
      });
    }
  };

  // 이메일 입력창 이벤트 핸들러
  const emailHandler = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    let msg,
      flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      msg = '이메일 인증을 진행해주세요..';
    }
    saveInputState({
      key: 'email',
      inputValue,
      msg,
      flag,
    });
  };

  const passwordHandler = (e) => {
    const inputValue = e.target.value;
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg,
      flag = false;

    if (!inputValue) {
      msg = '입력값은 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '유효하지 않은 입력값입니다.';
    } else {
      msg = '사용 가능한 비밀번호입니다.';
      flag = true;
    }

    saveInputState({
      key: 'password',
      inputValue,
      flag,
      msg,
    });
  };

  const passwordCheckHandler = (e) => {
    let msg,
      flag = false;

    if (!e.target.value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== e.target.value) {
      msg = '비밀번호가 일치하지 않습니다.';
    } else {
      msg = '비밀번호가 일치합니다.';
      flag = true;
    }

    saveInputState({
      key: 'passwordConfirm',
      inputValue: 'pass',
      flag,
      msg,
    });
  };

  const nicknameHandler = (e) => {
    let msg,
      flag = false;

    const nicknameReg = /^[A-Za-z0-9가-힣]{2,8}$/;
    const inputValue = e.target.value;

    if (!e.target.value) {
      msg = '입력값은 필수입니다.';
    } else if (!nicknameReg.test(inputValue)) {
      msg = '유효하지 않은 입력값입니다.';
    } else {
      msg = '사용가능한 닉네임입니다.';
      flag = true;
    }

    saveInputState({
      key: 'nickname',
      inputValue,
      flag,
      msg,
    });

    console.log(userValue.nickname);
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

  const codeCheckHandler = (e) => {
    if (code === input) {
      let msg = '이메일 인증이 완료되었습니다.';
      let flag = true;
      console.log('code: ', code);
      setChecked(true);

      saveInputState({
        key: 'email',
        inputValue: userValue.email,
        msg,
        flag,
      });
    }
  };

  const codeChangeHandler = (e) => {
    setInput(e.target.value);
    console.log('code: ', code);
  };

  const isValid = (e) => {
    for (const key in correct) {
      const flag = correct[key];
      console.log('key, flag: ', key, flag);
      if (!flag) return false;
    }
    return true;
  };

  const fetchJoin = async () => {
    const res = await fetch(USER + '/join', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        email: userValue.email,
        password: userValue.password,
        nickname: userValue.nickname,
      }),
    });

    if (res.status === 200) {
      alert('정상적으로 가입되었습니다.');
      // handleClose();
      setValue('signIn');
    } else if (res.status === 400) {
      alert('이미 가입된 이메일입니다.');
    }
  };

  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      fetchJoin();
    } else {
      alert('입력값을 다시 한번 확인해주세요.');
    }
  };

  return (
    <div className='form-wrap'>
      <form
        noValidate
        autoComplete='false'
      >
        <Grid
          container
          spacing={0}
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
              // margin='normal'
              onChange={emailHandler}
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
                      onClick={fetchDuplicateCheck}
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
                  borderra: '20px',
                  borderRadius: '10px',
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
            <div
              style={
                correct.email
                  ? {
                      color: 'green',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                      cursor: 'none',
                    }
                  : {
                      color: 'red',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '20px',
                      cursor: 'none',
                    }
              }
            >
              {message.email}
            </div>
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
                onChange={codeChangeHandler}
                onKeyUp={codeCheckHandler}
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
                        edge='end'
                      >
                        {checked && <CheckIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),

                  style: {
                    border: '1px solid #363636',
                    color: 'lightgray',
                    width: '30%',
                    height: '35px',
                    margin: '0 0 0 60%',
                    borderRadius: '10px',
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
              onChange={passwordHandler}
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
                  height: '45px',
                  margin: 'auto',
                  borderRadius: '10px',
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
            <div
              style={
                correct.password
                  ? {
                      color: 'green',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                      cursor: 'none',
                    }
                  : {
                      color: 'red',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                      cursor: 'none',
                    }
              }
            >
              {message.password}
            </div>
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
              onChange={passwordCheckHandler}
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
                  height: '45px',
                  margin: 'auto',
                  borderRadius: '10px',
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
            <div
              style={
                correct.passwordConfirm
                  ? {
                      color: 'green',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                    }
                  : {
                      color: 'red',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                    }
              }
            >
              {message.passwordConfirm}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              type='text'
              variant='outlined'
              fullWidth
              placeholder='Nickname'
              margin='normal'
              onChange={nicknameHandler}
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
                  height: '45px',
                  margin: 'auto',
                  borderRadius: '10px',
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
            <div
              style={
                correct.nickname
                  ? {
                      color: 'green',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                    }
                  : {
                      color: 'red',
                      width: '80%',
                      height: '10px',
                      margin: 'auto',
                      borderRadius: '10px',
                    }
              }
            >
              {message.nickname}
            </div>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '24%',
            borderRadius: '20px',
            margin: '1em 11.5em',
          }}
          onClick={joinButtonClickHandler}
        >
          Sing up
          {/* <NavigateNextIcon fontSize='medium' /> */}
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
          width: '50%',
          margin: '2em auto 2em',
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-around',
        }}
      >
        <a href={KAKAO_AUTH_URL}>
          <img
            src={require('../../assets/imgs/kakao.png')}
            alt='kakao'
            className='sns-login-icon'
          />
        </a>
        <a href={NAVER_AUTH_URL}>
          <img
            src={require('../../assets/imgs/naver_icon.png')}
            alt='kakao'
            className='sns-login-icon'
          />
        </a>
        {/* <GoogleLoginBtn /> */}
      </Box>
    </div>
  );
};

export default ModalJoin;
