import React, { useEffect, useState } from 'react';
import { API_BASE_URL, FOLDER, USER } from '../config/host-config';
import { useNavigate } from 'react-router-dom';

// 새로운 전역 컨텍스트 생성
const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부 추적
  onLogout: () => {},
  onLogin: () => {},
  getFolders: () => {},
});

// 위에서 생성한 Context를 제공할 수 있는 provider
// 이 컴포넌트를 통해 자식 컴포넌트에게 인증 상태와 관련된 함수들을 전달할 수 있음
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [loading, setLoading] = useState(true);
  const redirection = useNavigate();

  // 컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
  useEffect(() => {
    console.log('AuthContext useEffect called');
    // 토큰 값이 유효한지 서버에 찔러보는 함수
    const testFunction = async () => {
      // console.log(
      //   'AuthContext useEffect token: ',
      //   localStorage.getItem('ACCESS_TOKEN')
      // );
      const requestHeader = {
        'content-type': 'application/json',
        // JWT에 대한 인증 토큰이라는 타입을 선언
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      };
      const res = await fetch(API_BASE_URL + USER + '/status', {
        method: 'GET',
        headers: requestHeader,
      });
      console.log('status: ', res.status);
      if (res.status === 400) {
        console.log('토큰값 유효하지 않음!');
        alert('다시 로그인 해주세요!');
        localStorage.clear();
        setLoading(false);
        setIsLoggedIn(false);
      }
    };
    testFunction();
    if (localStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); // 로컬스토리지 내용 전체 삭제
    setIsLoggedIn(false);
    redirection('/');
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

  // 내 폴더 목록 가져오기
  const UsersGetFolderList = async () => {
    console.log('AuthContext 요청 들어옴!');
    const requestUriFolder = API_BASE_URL + FOLDER;
    const res = await fetch(requestUriFolder + '/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();

    // useEffect(() => {
    //   UsersGetFolderList();
    // }, []);

    console.log('data -> ', data);
    return { data };
    // console.log('확인1', myfolderList);
    // setFolderList(myfolderList); // myfolderList를 상태로 설정

    // setMyList(newList);

    // const UsersGetFolderList = async () => {
    //   const res = await fetch(requestUriFolder + '/my', {
    //     headers: { Authorization: 'Bearer ' + token },
    //   });
    //   const myfolderList = await res.json();

    //   myfolderList.map;
    // };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        getFolders: UsersGetFolderList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
