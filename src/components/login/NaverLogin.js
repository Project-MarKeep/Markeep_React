import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { naverLogin } from '../loader';

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const API_REQUEST_URL = API_BASE_URL + USER + '/naver-login?code=' + code;
  console.log(API_REQUEST_URL);
  useEffect(() => {
    naverLogin();
  }, []);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
