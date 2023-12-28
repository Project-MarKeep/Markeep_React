import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { ReactComponent as AddIcon } from '../assets/icons/plus.svg';
import { API_BASE_URL, FOLDER, SITE } from '../config/host-config';
import styles from '../styles/Add.module.scss';
import { customStyles } from '../styles/customStyles';
import Input from './Input';
import { Folder } from '@mui/icons-material';

const Add = () => {
  const colors = {
    blue: '#bbb4fe',
    purple: '#ed84f8',
    salmon: '#fcc5b8',
    white: '#fafafa',
    black: '#141414',
    yellow: '#ebfc87',
  };

  const requestUriSite = API_BASE_URL + SITE;
  const requestUriFolder = API_BASE_URL + FOLDER;
  const token = localStorage.getItem('ACCESS_TOKEN');

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const inputRef = useRef();

  const [myList, setMyList] = useState();

  // const [isButtonActive, setButtonActive] = useState(false);

  const isActive = useRef();

  const getTitle = (e) => {
    setTitle(e.target.value);
    let title = e.target.value;
    // console.log(title);
  };

  const GetFolderIdHandler = (selectedOption) => {
    const folderId = selectedOption.value;
    console.log('folderId -> ', folderId);
  };

  const [flag, setFlag] = useState(true);

  const getUrl = (e) => {
    const url = e.target.value;
    // console.log(url);

    if (isValidUrl(url)) {
      isActive.current.disabled = false;
      setFlag(true);
      console.log('유효한 URL');
      e.target.style = styles.icon;
    } else {
      console.log('유효X URL');
      isActive.current.disabled = true;
      setFlag(false);
      e.target.style.border = '2px solid red';
      // e.target.value = '';
    }
    setUrl(url);
  };

  // url값 유효성 검사 함수
  function isValidUrl(url) {
    const urlRegex = /^(https?|ftp)s?:\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  }

  const clickAddHandler = async () => {
    const res = await fetch(requestUriSite, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: ,
        siteName: title,
        url: url,
      }),
    });
    console.log('title 값 또 렌더안댐? -> ', title);
    console.log('url 값 또 렌더안댐? -> ', url);

    if (res.status === 200) {
      alert('성공적으로 등록되었습니다!');
    } else if (res.status === 400) {
      alert('입력 값을 다시 한번 확인해주십시오!');
    } else {
      alert('markeepMG@gmail.com으로 문의주세요');
    }
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      clickAddHandler();
      inputRef.current.blur();
    }
  };

  const [folderList, setFolderList] = useState([]);

  const newList = (folderList) => {
    return folderList.map((folders) => ({
      value: folders.id,
      label: folders.title,
    }));
  };

  const UsersGetFolderList = async () => {
    const res = await fetch(requestUriFolder + '/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const myfolderList = await res.json();
    console.log('확인1', myfolderList);
    setFolderList(myfolderList); // myfolderList를 상태로 설정

    // setMyList(newList);

    // const UsersGetFolderList = async () => {
    //   const res = await fetch(requestUriFolder + '/my', {
    //     headers: { Authorization: 'Bearer ' + token },
    //   });
    //   const myfolderList = await res.json();

    //   myfolderList.map;
    // };
  };
  // console.log('=====================>', folderList);

  const options = [
    // { value: '폴더아이디1', label: '폴더 제목1' },
    // { value: '폴더아이디2', label: '폴더 제목2' },
    // { value: '폴더아이디3', label: '폴더 제목3' },
    // { value: '폴더아이디4', label: '폴더 제목4' },
    // { value: '폴더아이디5', label: '폴더 제목5' },
    // { value: '폴더아이디6', label: '폴더 제목6' },
  ];
  useEffect(() => {
    UsersGetFolderList(); // 컴포넌트가 마운트될 때 UsersGetFolderList 함수 호출
  }, []);

  return (
    <div className={styles.wrapper}>
      {folderList.length > 0 ? (
        <Select
          isClearable={true}
          isSearchable={true}
          placeholder={'폴더 선택'}
          options={newList(folderList)} // folderList를 options에 매핑
          onClick={UsersGetFolderList}
          onChange={GetFolderIdHandler}
          maxMenuHeight={'10rem'}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,

              neutral20: 'rgba(187, 180, 254, 0.4)',
              primary: colors.purple,
              neutral80: colors.white,
              neutral60: colors.blue,
            },
          })}
        />
      ) : (
        'NO FOLDERS'
      )}
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='북마크 이름'
            value={title}
            onChange={getTitle}
            ref={inputRef}
          />
        </Input>
      </div>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='북마크 주소'
            value={url}
            onChange={getUrl}
            onKeyDown={keyDownHandler}
            ref={inputRef}
          />
        </Input>
      </div>
      <button
        id='addBtn'
        className={flag ? styles.addSiteBtn : null}
        onClick={clickAddHandler}
        ref={isActive}
      >
        북마크 추가
        <AddIcon className={styles.icon} />
      </button>
    </div>
  );
};
export default Add;
