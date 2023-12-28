import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Community.module.scss';
import CardPublic from '../components/CardPublic';

const Search = () => {
  // 검색창에서 넘어온 키워드
  const keyword = useParams();

  const bookmarkClickHandler = () => {};
  const followClickHandler = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{/* CardPublic 넣는 자리. */}</div>
    </div>
  );
};

export default Search;
