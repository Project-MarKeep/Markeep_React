import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../utils/AuthContext';
import styles from '../../styles/FolderList.module.scss';

const FolderList = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const { getFolders } = useContext(AuthContext);
  const [myList, setMyList] = useState([]);
  const getFoldersResult = async () => {
    const { data } = await getFolders();
    console.log('한번 더 깐 getFolders()', data);

    const { data2 } = data[0];
    console.log('한번 더 깐 getFolders()', data2);
    setMyList(data);
  };
  // console.log(
  //   '이 getFolders는 내 폴더 목록 리스트 정보를 가지고 있는 함수입니다. -> ',
  //   { getFolders }
  // );

  useEffect(() => {
    getFoldersResult();
  }, [getFolders]);

  return (
    <>
      <h2 className={styles.title}>내 폴더 목록</h2>
      <div className={styles.list}>
        <ul>
          {myList.map((f) => (
            <li key={f.folder.id}>
              <Link to={`/detail/${f.folder.id}`}>{f.folder.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FolderList;
