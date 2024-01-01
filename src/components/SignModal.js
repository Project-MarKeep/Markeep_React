import React, { useEffect, useState } from 'react';
import './SignModal.scss';
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
import ModalPassword from './ModalPassword';

const SignModal = ({ status, handleClose }) => {
  const [value, setValue] = useState('signIn');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (status.value === 'Sign In') {
      setValue('signIn');
    } else if (status.value === 'Sign Up') {
      setValue('signUp');
    } else {
      setValue('password');
      setShowForgotPassword(true);
    }
  }, [status.value]);

  return (
    <Dialog
      open={status.open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: '#413a6f',
          borderRadius: '30px',
          width: '400px',
          overflowY: 'visible',
        },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        sx={{
          marginBottom: '1em',
          '& .MuiTabs-indicator': {
            backgroundColor: 'white',
          },
        }}
      >
        <Tab
          label='Sign In'
          value='signIn'
          sx={{
            '&.Mui-selected': { color: '#6ecbf5' },
            '&.Mui-focusVisible': {
              backgroundColor: 'rgba(100, 100, 100, 0.2)',
            },
          }}
        />
        <Tab
          label='Sign Up'
          value='signUp'
          sx={{
            '&.Mui-selected': { color: '#6ecbf5' },
            '&.Mui-focusVisible': {
              backgroundColor: 'rgba(100, 100, 100, 0.2)',
            },
          }}
        />
        <Tab
          label='Password'
          value='password'
          sx={{
            '&.Mui-selected': { color: '#6ecbf5' },
            '&.Mui-focusVisible': {
              backgroundColor: 'rgba(100, 100, 100, 0.2)',
            },
          }}
        />
      </Tabs>

      {value === 'signIn' && (
        <ModalLogin
          handleChange={handleChange}
          setValue={(value) => setValue(value)}
          setShowForgotPassword={(show) => setShowForgotPassword(show)}
          showForgotPassword={showForgotPassword}
        />
      )}
      {value === 'signUp' && <ModalJoin />}
      {value === 'password' && showForgotPassword && (
        <ModalPassword
          setValue={setValue}
          setShowForgotPassword={setShowForgotPassword}
        />
      )}
    </Dialog>
  );
};

export default SignModal;
