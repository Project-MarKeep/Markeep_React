import React, { createContext, useState } from 'react';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import GoogleLoginBtn from './GoogleLoginBtn';

const SnsLogin = () => {
  return (
    <div className='sns-box'>
      <a href={KAKAO_AUTH_URL}>카카오</a>
      <a href={NAVER_AUTH_URL}>네이버</a>
      <GoogleLoginBtn />
    </div>
  );
};

export default SnsLogin;
