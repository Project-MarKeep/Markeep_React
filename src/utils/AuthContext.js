import React, { useEffect, useState } from 'react';
import { API_BASE_URL, USER } from '../config/host-config';

// 새로운 전역 컨텍스트 생성
const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부 추적
  userName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
});

// 위에서 생성한 Context를 제공할 수 있는 provider
// 이 컴포넌트를 통해 자식 컴포넌트에게 인증 상태와 관련된 함수들을 전달할 수 있음
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
  useEffect(() => {
    // console.log('AuthContext useEffect called');
    // const testFunction = async () => {
    //   console.log(
    //     'AuthContext useEffect token: ',
    //     localStorage.getItem('ACCESS_TOKEN')
    //   );
    //   const requestHeader = {
    //     'content-type': 'application/json',
    //     // JWT에 대한 인증 토큰이라는 타입을 선언
    //     Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
    //   };
    //   const res = await fetch(API_BASE_URL + USER + '/status', {
    //     method: 'GET',
    //     headers: requestHeader,
    //   });
    //   console.log('status: ', res.status);
    //   if (res.status === 401) {
    //     console.log('토큰값 유효하지 않음!');
    //     localStorage.clear();
    //   }
    //   setLoading(false);
    //   setIsLoggedIn(false);
    // };
    // testFunction();
    if (localStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); // 로컬스토리지 내용 전체 삭제
    setIsLoggedIn(false);
  };

  // 로그인 핸들러
  const loginHandler = (token, nickname, email, refreshToken) => {
    localStorage.setItem('isLoggedIn', '1');
    // json에 담긴 인증정보를 클라이언트에 보관
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('NICKNAME', nickname);
    localStorage.setItem('USER_EMAIL', email);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
