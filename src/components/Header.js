import React, { useContext, useRef, useState } from 'react';
import styles from '../styles/Header.module.scss';
import Input from './Input';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Link, useNavigate } from 'react-router-dom';
import SignModal from './SignModal';
import { isLogin } from '../utils/login-utils';
import AuthContext from '../utils/AuthContext';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState({ open: false, value: null });

  const { onLogout, isLoggedIn } = useContext(AuthContext);

  // const handleLoginOrSignUp = () => {
  //   // 로그인 또는 회원가입 로직
  //   if(handleOpen().)
  //   // 성공하면 모달 닫기
  //   handleClose();
  // };

  const getSearchData = (e) => {
    setSearchInput(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      clickSearchHandler();
      inputRef.current.blur();
    }
  };

  const clickSearchHandler = () => {
    navigate(`/search/${searchInput}`);
  };

  const handleOpen = (e) => {
    // console.log(e.target.textContent);
    setOpenStatus({ open: true, value: e.target.textContent });
    // console.log('이게 handleOpen의 결과: ', e.target.status);
    // if (e.target.textContent === 'Sign In') {
    // handleClose();
  };
  // };

  const handleClose = () => {
    setOpenStatus({ open: false, value: null });
  };

  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.title}
        to={'/'}
      >
        MarKeep
      </Link>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='검색어를 입력해 주세요.'
            value={searchInput}
            onChange={getSearchData}
            onKeyDown={keyDownHandler}
            ref={inputRef}
          />
          <div
            className={styles.icon_box}
            onClick={clickSearchHandler}
          >
            <SearchIcon className={styles.icon} />
          </div>
        </Input>
      </div>
      <div className={styles.sign_box}>
        {!isLoggedIn ? (
          <>
            <button
              className={styles.button}
              onClick={handleOpen}
            >
              Sign In
            </button>
            <button
              className={styles.button}
              onClick={handleOpen}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            className={styles.button}
            onClick={onLogout}
          >
            Sign out
          </button>
        )}
        <SignModal
          status={openStatus}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Header;
