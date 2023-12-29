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

const Modify = () => {
  const folderInfo = useOutletContext();
  const [openIdx, setOpenIdx] = useState([]);
  const navigate = useNavigate();
  const { id, url, title, tags, ref } = folderInfo;

  const sites = [];
  const tagList = toDataList(tags);
  const { folderId } = useParams();
  const requestUri = API_BASE_URL + SITE;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [list, setList] = useState([]);

  for (let i = 0; i < 10; i++) {
    const s = {
      id: `site${i}`,
      title: `사이트이름${i}`,
      url: 'https://m.naver.com',
      comment: '사이트에 대한 설명입니다.',
    };
    sites.push(s);
  }

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

  const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + `${folderId}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setList(list);
  };
  useEffect(() => {
    fetchMySiteList();
  }, [folderId]);
  return (
    <div
      className={styles.wrap}
      ref={ref}
    >
      <h4>{title}</h4>
      <div className={styles.image_box}>
        <img
          src={url}
          alt='폴더 이미지'
        />
      </div>
      <div className={styles.tag_box}>
        <Select
          defaultValue={tagList}
          isMulti
          styles={multiStyles(tagList)}
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

        {/* {tags.map((tag, idx) => {
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
                <div>{s.title}</div>
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

export default Modify;
