import React, { useEffect, useState } from 'react';
import styles from '../styles/Community.module.scss';
import CardPublic from '../components/folder/CardPublic';
import Loading from '../components/ui/Loading';
import { useQuery } from '@tanstack/react-query';
import { getFolders } from '../services/folderApi';
import ErrorPage from '../components/ui/ErrorPage';

const Community = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['folders'],
    queryFn: () => {
      return getFolders(1, 20, '');
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>{error}</ErrorPage>;
  const { list } = data;
  list.map((l) => [l.id, l.userId, l.followFlag]);
  return (
    <div className={styles.wrapper}>
      <h2>Community</h2>
      <div className={styles.content}>
        {list.map((f) => (
          <CardPublic
            key={f.id}
            id={f.id}
            data={f}
            image={f.folderImg}
            profileImg={f.profileImage}
            title={f.title}
            writer={f.nickname}
            isMarked={f.pinFlag}
            isFollowed={f.followFlag}
            pin={f.pinCount}
            toId={f.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
