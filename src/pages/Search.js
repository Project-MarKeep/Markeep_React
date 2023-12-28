import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Community.module.scss';
import CardPublic from '../components/CardPublic';
import { API_BASE_URL, FOLDER } from '../config/host-config';

const Search = () => {
  const bookmarkClickHandler = () => {};
  const followClickHandler = () => {};

  // 검색창에서 넘어온 키워드
  const { keyword } = useParams();

  const [list, setList] = useState([{}]);

  const pageNo = 1;
  const size = 10;

  const requestUri = API_BASE_URL + FOLDER;

  useEffect(() => {
    fetchFolderList();
  }, [keyword]);

  const fetchFolderList = async () => {
    const res = await fetch(
      requestUri +
        '/all?page=' +
        `${pageNo}` +
        '&size=' +
        `${size}` +
        '&keyword=' +
        `${keyword}`
    );

    const { list } = await res.json();
    // 응답데이터에 핀 수 추가 요망.
    console.log('list: ', list);

    setList(list);
  };

  const td = {
    image:
      'https://i.pinimg.com/564x/0d/e0/c0/0de0c0721c576c0e9fbd79abd6668089.jpg',
    profileImg:
      'https://i.pinimg.com/564x/e2/21/f0/e221f0954109ff15ad17ad7d05a1859b.jpg',
    isMarked: true,
    title: '테스트 제목입니다.',
    writer: 'chunsik',
    isFollowed: true,
    pin: 234,
    bookmarkClickHandler: { bookmarkClickHandler },
    followClickHandler: { followClickHandler },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* 커뮤니티 북마크 폴더 불러와서 여기에 넣으면 돼요.
        아래 CardPublic은 예시로 넣어놓은 거니까 삭제하세요. */}
        {list.map((data, idx) => (
          <CardPublic
            key={idx}
            data={data}
            isMarked={td.isMarked}
            isFollowed={td.isFollowed}
            pin={td.pin}
            bookmarkClickHandler={bookmarkClickHandler}
            followClickHandler={followClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
