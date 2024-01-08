import React, { useEffect, useState } from 'react';
import '../../styles/SignModal.scss';
import {
  Dialog,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ModalLogin from './ModalLogin';
import ModalJoin from './ModalJoin';

const SignModal = ({ status, handleClose }) => {
  // console.log('status: ', status);
  const [value, setValue] = useState('signIn');
  // console.log('useState value: ', value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleLoginSuccess = () => {
  //   handleClose(); // 로그인 성공 시 모달 닫기
  //   alert('로그인이 성공했습니다!');
  // };

  useEffect(() => {
    console.log('useEffect status: ', status);
    status.value === 'Sign In' ? setValue('signIn') : setValue('signUp');
  }, [status.value]);

  return (
    <Dialog
      open={status.open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: '#0B0312',
          borderRadius: '30px',
          width: '400px',
        },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        sx={{
          marginBottom: '2em',
          '& .MuiTabs-indicator': {
            backgroundColor: 'white', // 원하는 색상 코드로 변경
          },
        }}
      >
        <Tab
          label='Sign In'
          value='signIn'
          sx={{
            '&.Mui-selected': { color: '#6ecbf5' }, // 선택됐을 때의 색상
            '&.Mui-focusVisible': {
              backgroundColor: 'rgba(100, 100, 100, 0.2)',
            }, // 포커스 됐을 때의 배경색
          }}
        />
        <Tab
          label='Sign Up'
          value='signUp'
          sx={{
            '&.Mui-selected': { color: '#6ecbf5' }, // 선택됐을 때의 색상
            '&.Mui-focusVisible': {
              backgroundColor: 'rgba(100, 100, 100, 0.2)',
            }, // 포커스 됐을 때의 배경색
          }}
        />
      </Tabs>
      {value === 'signIn' && (
        <ModalLogin
          // onLoginSuccess={handleLoginSuccess}
          setValue={setValue}
          handleClose={handleClose}
        />
      )}
      {value === 'signUp' && (
        <ModalJoin
          setValue={setValue}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

export default SignModal;
