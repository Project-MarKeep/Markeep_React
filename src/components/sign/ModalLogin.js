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
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { USER } from '../../config/host-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import GoogleLoginBtn from '../sns-login/GoogleLoginBtn';

const ModalLogin = ({
  handleChange,
  setValue,
  setShowForgotPassword,
  handleClose,
}) => {
  const redirection = useNavigate();

  const { onLogin } = useContext(AuthContext);

  const REQUEST_URL = USER + '/login';

  // 서버에 비동기 로그인 요청(AJAX 요청)
  const fetchLogin = async () => {
    // 이메일, 비밀번호 입력 태그 얻어오기
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');
    console.log('email: ', $email.value);
    console.log('password: ', $password.value);

    // Remember 체크박스의 체크여부 확인하기
    const chb = document.getElementById('CheckBox');

    // checked 속성 체크
    const ischecked = chb.checked;
    console.log('체크박스 여부: ', ischecked);

    // 만약 체크박스가 체크되었다면 아이디 저장
    if (ischecked) {
      localStorage.setItem('savedEmail', $email.value);
    } else {
      // 체크박스 체크안됬을 시 저장된 아이디 삭제
      localStorage.removeItem('savedEmail');
    }
    // 자동 로그인
    const chbtn = document.getElementById('Checkbtn');
    const ischd = chbtn.checked;
    console.log('자동로그인 여부: ', ischd);

    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
        autoLogin: ischd,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { accessToken, refreshToken } = await res.json(); // 서버에서 온 json 읽기
    console.log('accessToken: ', res);

    // Context API를 사용하여 로그인 상태를 업데이트 합니다.
    onLogin(accessToken, refreshToken);

    // 홈으로 리다이렉트
    window.location.reload();
  };

  // 로그인 요청 핸들러
  const loginHandler = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 전송
    fetchLogin();
    handleClose();
  };

  // forgot password 클릭시 이동
  const fpClickHandler = (event) => {
    // event.preventDefault();
    // if (value !== 'passowrd') {
    //   setValue('password');
    //   setShowForgotPassword(true);
    // }
  };

  return (
    <div className='form-wrap'>
      <form
        noValidate
        autoComplete='false'
        onSubmit={loginHandler}
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
              id='email'
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='Account'
              defaultValue={localStorage.getItem('savedEmail')}
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
                  height: '45px',
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
              id='password'
              type='password'
              variant='outlined'
              fullWidth
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
                  height: '45px',
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
              id='CheckBox'
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              sx={{
                color: 'gray', // 체크되지 않았을 때의 색상
                borderRadius: '50%',
                marginLeft: '3em',
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
              fontSize: '0.780rem', // 폰트 크기 조정
              color: 'lightGray', // 폰트 색상 조정
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              id='Checkbtn'
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              sx={{
                color: 'gray', // 체크되지 않았을 때의 색상
                borderRadius: '50%',
                marginLeft: '6em',
                '&.Mui-checked': {
                  color: 'lightGray', // 체크됐을 때의 색상
                },
              }}
            />
          }
          label='자동로그인'
          sx={{
            '& .MuiTypography-body1': {
              // MUI v5 기준 Typography 스타일 클래스
              fontSize: '0.770rem', // 폰트 크기 조정
              color: 'lightGray', // 폰트 색상 조정
            },
          }}
        />
        <Link
          href='#'
          color={'lightGray'}
          underline='hover'
          sx={{ marginLeft: '10em', fontSize: '0.880rem' }}
          onClick={fpClickHandler}
        >
          Forgot Password?
        </Link>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{ width: '33%', borderRadius: '30px', margin: '1em 9.5em' }}
          type='submit'
        >
          Sign In
        </Button>
      </form>
      <Box sx={{ margin: '1.5em' }}>
        <Typography
          variant='h10'
          align='center'
          margin='36px'
          color={'lightGray'}
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
            alt='naver'
            className='sns-login-icon'
          />
        </a>
        {/* <GoogleLoginBtn /> */}
      </Box>
    </div>
  );
};

export default ModalLogin;
