import React, { useRef, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import Input from '../Input';
import styles from '../../styles/SearchFolder.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const SearchFolder = () => {
  const [searchInput, setSearchInput] = useState('');
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
    // 검색어에 해당하는 내 폴더 목록 불러오기
    //           <Link to={`/detail/${folderId}`}>폴더이름</Link>
  };

  return (
    <>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='내 폴더 검색'
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
      <div className={styles.list}>
        <ul>
          <li>
            <Link to={`/detail`}>폴더 이름입니다. 폴더폴더폴더폴더폴더</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchFolder;
