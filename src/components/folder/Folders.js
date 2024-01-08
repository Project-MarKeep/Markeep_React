import React, { useEffect, useState } from 'react';
import styles from '../../styles/Folders.module.scss';
import { getMyFolders, searchMyFolders } from '../../services/folderApi';
import CardPrivate from './CardPrivate';
import Loading from '../ui/Loading';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../ui/ErrorPage';

const Folders = ({ option, keyword, setChecked }) => {
  console.log('keyword: ', keyword);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['myFolders'],
    queryFn: () => {
      return getMyFolders();
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>{error}</ErrorPage>;

  return (
    <div className={styles.wrap}>
      {(option === 'all' || option === 'public') && (
        <div className={styles.group}>
          <h3>Public Folders</h3>
          <div className={styles.folders}>
            {data
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
          <h3>Private Folders</h3>
          <div className={styles.folders}>
            {data
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
