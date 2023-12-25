import React, { useEffect, useState } from 'react';
import './SignModal.scss';
import SnsLogin from './login/SnsLogin';
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
import Modal_Login from './ModalLogin';
import ModalLogin from './ModalLogin';
import ModalJoin from './ModalJoin';

const SignModal = ({ status, handleClose }) => {
  console.log('status: ', status);
  const [value, setValue] = useState('signIn');
  console.log('useState value: ', value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          background: '#413a6f',
          borderRadius: '30px',
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
      {value === 'signIn' && <ModalLogin setValue={setValue} />}
      {value === 'signUp' && <ModalJoin />}
    </Dialog>
  );
};

export default SignModal;
