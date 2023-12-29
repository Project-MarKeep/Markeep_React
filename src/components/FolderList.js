import React, { useContext, useEffect, useState } from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import styles from '../styles/FolderList.module.scss';
import AuthContext from '../utils/AuthContext';
import { API_BASE_URL, FOLDER } from '../config/host-config';

const FolderList = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  /*
  const { getFolders } = useContext(AuthContext);
  console.log(
    '이 getFolders는 내 폴더 목록 리스트 정보를 가지고 있는 함수입니다. -> ',
    getFold ers()
  );
  // useAsync({ promiseFn: getFolders });

  const [myList, setMyList] = useState([]);

  useEffect(() => {
    console.log('확인', getFolders());
    setMyList(getFolders);
    console.log('myList -> ', myList);
  }, []);

  const getfolderList = () => {
    return myList.map((folders) => ({
      // value: folders.id,
      label: folders.title,
    }));
  };
  */
  const UsersGetFolderList = async () => {
    console.log('AuthContext 요청 들어옴!');
    const requestUriFolder = API_BASE_URL + FOLDER;
    const res = await fetch(requestUriFolder + '/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();
    console.log('data -> ', data);
  };

  const newList = (folderList) => {
    return folderList.map((folders) => ({
      value: folders.id,
      label: folders.title,
    }));
  };

  return (
    // myList.length > 0 ? (
    <>
      <h2 className={styles.title}>내 폴더 목록</h2>
      <div className={styles.list}>
        <ul>
          {/* {myList.map((folder) => ( */}
          <li>
            {/* <Link to={`/detail/${folder.id}`}>{folder.title}</Link> */}
          </li>
          {/* ))} */}
        </ul>
      </div>
    </>
  );
  // ) : (
  // 'NO SIGNAL'
};

export default FolderList;
