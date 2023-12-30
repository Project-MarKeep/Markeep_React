import React, { useRef, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import Input from '../Input';
import styles from '../../styles/SearchFolder.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, FOLDER } from '../../config/host-config';

const SearchFolder = () => {
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef();

  const [list, setList] = useState([{}]);

  const requestUri = API_BASE_URL + FOLDER + '/my/search';

  const token = localStorage.getItem('ACCESS_TOKEN');
  const pageNo = 1;
  const size = 10;

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
    fetchMyFolderList();
  };

  const fetchMyFolderList = async () => {
    const res = await fetch(
      requestUri +
        '?page=' +
        `${pageNo}` +
        '&size=' +
        `${size}` +
        `&keyword=` +
        `${searchInput}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    const { list } = await res.json();
    // console.log('data: ', data);
    // list.map(())
    setList(list);
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
          {list.map((data, idx) => (
            <li key={idx}>
              <Link to={`/detail/${data.id}`}>{data.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchFolder;
