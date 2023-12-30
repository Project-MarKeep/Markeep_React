import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/Add.module.scss';
import Input from '../Input';
import { ReactComponent as AddIcon } from '../../assets/icons/plus.svg';
import { customStyles } from '../../styles/customStyles';
import AuthContext from '../../utils/AuthContext';
import { API_BASE_URL, FOLDER, SITE } from '../../config/host-config';

const Add = () => {
  const colors = {
    blue: '#bbb4fe',
    purple: '#ed84f8',
    salmon: '#fcc5b8',
    white: '#fafafa',
    black: '#141414',
    yellow: '#ebfc87',
  };

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState('');
  const [folderId, setFolderId] = useState();
  const inputRef = useRef();

  const { getFolders } = useContext(AuthContext);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    getFoldersResult();
  }, [])

  const getFoldersResult = async () => {
    const { data } = await getFolders();
    console.log('한번 더 깐 getFolders()', data);

    setMyList(data.map((f) => ({value: f.folder.id, label: f.folder.title}))
    );
  };
  // console.log(
  //   '이 getFolders는 내 폴더 목록 리스트 정보를 가지고 있는 함수입니다. -> ',
  //   { getFolders }
  // );

  const requestUriSite = API_BASE_URL + SITE;
  const requestUriFolder = API_BASE_URL + FOLDER;
  const token = localStorage.getItem('ACCESS_TOKEN');

  // const [isButtonActive, setButtonActive] = useState(false);

  const isActive = useRef();

  const getTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const getComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  }

  const GetFolderIdHandler = (selectedOption) => {
    const folderId = selectedOption.value;
    console.log('folderId -> ', folderId);
    setFolderId(folderId);
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
        folderId: folderId,
        siteName: title,
        url: url,
      }),
    });
    console.log('title 값 또 렌더안댐? -> ', title);
    console.log('url 값 또 렌더안댐? -> ', url);
    console.log('folderId 값 또 렌더안댐? -> ', folderId);

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

  // const options = [
  //   { value: '폴더아이디1', label: '폴더 제목1' },
  //   { value: '폴더아이디2', label: '폴더 제목2' },
  //   { value: '폴더아이디3', label: '폴더 제목3' },
  //   { value: '폴더아이디4', label: '폴더 제목4' },
  //   { value: '폴더아이디5', label: '폴더 제목5' },
  //   { value: '폴더아이디6', label: '폴더 제목6' },
  // ];

  return (
    <div className={styles.wrapper}>
      <Select
        isClearable={true}
        isSearchable={true}
        placeholder={'폴더 선택'}
        options={myList}
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
            ref={inputRef}
          />
        </Input>
      </div>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='북마크 코멘트'
            value={comment}
            onChange={getComment}
            ref={inputRef}
          />
        </Input>
      </div>
      <button className={flag ? styles.addSiteBtn : null} onClick={clickAddHandler} ref={isActive}>
        북마크 추가
        <AddIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default Add;
