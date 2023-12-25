import React, { useRef, useState } from 'react';
import styles from '../styles/Header.module.scss';
import Input from './Input';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef();

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
        <button className={styles.button}>Sign In</button>
        <button className={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
