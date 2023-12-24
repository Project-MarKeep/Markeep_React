import React, { useContext, useEffect } from 'react';
import AuthContext from '../../utils/AuthContext';
import { API_BASE_URL, USER } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const API_REQUEST_URL = API_BASE_URL + USER + '/kakao-login?code=' + code;

  useEffect(() => {
    const kakaoLogin = async () => {
      console.log('요청!!!');
      const res = await fetch(API_REQUEST_URL);

      const { token, nickName, email } = await res.json();
      onLogin(token, nickName, email);
    };
    kakaoLogin();
    // redirection('/');
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
