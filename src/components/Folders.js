import React, { useEffect, useState } from 'react';
import styles from '../styles/Folders.module.scss';
import CardPrivate from './card/CardPrivate';
import { API_BASE_URL, FOLDER } from '../config/host-config';
import CardPublic from './card/CardPublic';

const Folders = () => {
  const [folderList, setFolderList] = useState([]);

  const requestUri = API_BASE_URL + FOLDER + '/my';
  const token = localStorage.getItem('ACCESS_TOKEN');
  const pageNo = 1;
  const size = 10;

  // for (let i = 0; i <= 10; i++) {
  //   const f = {
  //     id: i,
  //     title: `Title ${i}`,
  //     url: 'https://i.pinimg.com/564x/3a/fc/8e/3afc8ededa44767865d31be064282c31.jpg',
  //     tagNames: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  //     hideFlag: false,
  //   };

  //   if (i % 2 === 1) {
  //     f.hideFlag = true;
  //   }

  //   folderList.push(f);
  // }

  const fetchMyFolderList = async () => {
    const res = await fetch(
      requestUri,
      // + '?page=' + `${pageNo}` + '&size=' + `${size}`
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    console.log(res);
    const list = await res.json();
    setFolderList(list);
  };
  console.log('list잘 들어왔나확인', folderList);

  useEffect(() => {
    fetchMyFolderList();
    console.log('myFolderList: ', folderList);
  }, []);

  const folders = folderList.map((f) => ({
    id: f.folder.id,
    title: f.folder.title,
    folderImg: f.folder.folderImg,
    hideFlag: f.folder.hideFlag,
    tagNames: f.folder.tagNames,
  }));

  console.log('folders', folders);

  // const myPageList = (folderList) => {
  //   return folderList.map((folder) => ({
  //     id: folder.id,
  //     title: folder.title,
  //     folderImg: folder.folderImg,
  //     hideFlag: folder.hideFlag,
  //     tagNames: folder.tagNames,
  //   }));
  // };

  return (
    <div className={styles.wrap}>
      <div className={styles.group}>
        <h3>Public Folders</h3>
        <div className={styles.folders}></div>
        {folders
          .filter((f) => !f.hideFlag)
          .map((folder, idx) => {
            return (
              <CardPrivate
                key={idx}
                id={folder.id}
                title={folder.title}
                url={folder.folderImg}
                tagNames={folder.tagNames}
              />
            );
          })}
      </div>
      <div className={styles.group}>
        <h3>Private Folders</h3>
        <div className={styles.folders}>
          {folders
            .filter((f) => f.hideFlag)
            .map((folder, idx) => {
              return (
                <CardPrivate
                  key={idx}
                  id={folder.id}
                  title={folder.title}
                  url={folder.folderImg}
                  tagNames={folder.tagNames}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Folders;
