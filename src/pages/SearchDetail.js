import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API_BASE_URL, SITE } from '../config/host-config';
// import styles from '../styles/SearchFolder.module.scss';
// import CardPublic from '../components/CardPublic';
import { colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from '../styles/Detail.module.scss';
import { ReactComponent as Down } from '../assets/icons/down.svg';
import { ReactComponent as Up } from '../assets/icons/up.svg';
import { multiStyles, toDataList } from '../styles/customStyles';
import Select from 'react-select';

const SearchDetail = () => {
  const [openIdx, setOpenIdx] = useState([]);
  const navigate = useNavigate();

  // const sites = [];
  const { folderId, title, tagNames, folderImg } = useParams();
  console.log(folderId, title, tagNames, folderImg);
  // const tagList = toDataList(tagNames);
  const requestUri = API_BASE_URL + SITE;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [sites, setSites] = useState([]);

  // for (let i = 0; i < 10; i++) {
  //   const s = {
  //     id: `site${i}`,
  //     title: `사이트이름${i}`,
  //     url: 'https://m.naver.com',
  //     comment: '사이트에 대한 설명입니다.',
  //   };
  //   sites.push(s);
  // }

  const clickModifyHandler = () => {
    navigate('/mypage/folders/modify');
  };
  const clickDownHandler = (e) => {
    const idx = parseInt(e.currentTarget.id, 10);
    setOpenIdx([...openIdx, idx]);
  };
  const clickUpHandler = (e) => {
    const idx = parseInt(e.currentTarget.id, 10);
    if (openIdx.includes(idx)) {
      setOpenIdx(openIdx.filter((f) => f !== idx));
    }
  };

  // 사이트 목록 조회 요청
  const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + folderId, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setSites(list);
  };
  useEffect(() => {
    fetchMySiteList();
  }, [folderId]);

  return (
    <div
      className={styles.wrap}
      // ref={ref}
    >
      <h4>{title}</h4>
      <div className={styles.image_box}>
        <img
          src={folderImg || require('../assets/img/defaultFolderImg.jpg')}
          alt='폴더 이미지'
        />
      </div>
      <div className={styles.tag_box}>
        <Select
          defaultValue={tagNames}
          isMulti
          styles={multiStyles(tagNames)}
          isSearchable={false}
          isClearable={false}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            MultiValueRemove: () => null,
          }}
        />

        {/* {tagNames.map((tag, idx) => {
          return (
            <div key={idx} className={styles.tag}>
              {tag}
            </div>
          );
        })} */}
      </div>
      <div className={styles.site_box}>
        {sites.map((s, idx) => {
          return (
            <div key={s.id}>
              <div className={styles.site}>
                <img
                  src={s.url + '/favicon.ico'}
                  alt='favicon'
                />
                <div>{s.siteName}</div>
                <div>{s.url}</div>
                {openIdx.includes(idx) ? (
                  <Up
                    id={idx}
                    className={styles.icon}
                    onClick={clickUpHandler}
                  />
                ) : (
                  <Down
                    id={idx}
                    className={styles.icon}
                    onClick={clickDownHandler}
                  />
                )}
              </div>
              {openIdx.includes(idx) && (
                <div className={styles.comment}>{s.comment}</div>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={clickModifyHandler}>수정</button>
    </div>
  );
};

export default SearchDetail;
