import React, { useEffect, useState } from 'react';
import styles from '../../styles/Folders.module.scss';
import { getMyFolders, searchMyFolders } from '../../services/folderApi';
import CardPrivate from './CardPrivate';
import Loading from '../ui/Loading';

const Folders = ({ option, keyword, setChecked }) => {
  const [folders, setFolders] = useState();

  useEffect(() => {
    if (keyword) {
      searchMyFolders(keyword).then((res) => setFolders(res));
      return;
    }
    getMyFolders().then((res) => setFolders(res));
  }, [keyword]);

  if (!folders) {
    return <Loading />;
  }

  return (
    <div className={styles.wrap}>
      {(option === 'all' || option === 'public') && (
        <div className={styles.group}>
          <h3>
            Public Folders
            <input
              type='button'
              className={styles.button}
              value='to Private'
            />
          </h3>

          <div className={styles.folders}>
            {folders
              .filter((f) => !f.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.id}
                    id={f.id}
                    data={f}
                    title={f.title}
                    url={f.folderImg}
                    tags={f.tagNames}
                    setChecked={setChecked}
                  />
                );
              })}
          </div>
        </div>
      )}
      {(option === 'all' || option === 'private') && (
        <div className={styles.group}>
          <h3>
            Private Folders
            <input
              type='button'
              className={styles.button}
              value='to Public'
            />
          </h3>
          <div className={styles.folders}>
            {folders
              .filter((f) => f.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.id}
                    id={f.id}
                    data={f}
                    title={f.title}
                    url={f.folderImg}
                    tags={f.tagNames}
                    setChecked={setChecked}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folders;
