import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/CardPrivate.module.scss';
import { Link, Outlet } from 'react-router-dom';

const CardPrivate = ({ id, url, title, tagNames }) => {
  const [active, setActive] = useState(false);
  const ref = useRef();

  console.log('id, url, title, tagNames :', id, url, title, tagNames);
  const clickManageHandler = () => {
    setActive(true);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (active && ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [active]);

  return (
    <div>
      <div className={styles.wrap}>
        <Link
          to={`/mypage/folders/detail`}
          onClick={clickManageHandler}
        >
          <div className={styles.image_box}>
            <img
              src={url}
              alt='폴더 이미지'
            />
          </div>
          <h4>{title}</h4>
          <div className={styles.tag_box}>
            {tagNames.map((tag, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.tag}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </Link>
        <div className={styles.check}>
          <input
            className={styles.check_item}
            type='checkbox'
            value={id}
          />
        </div>
      </div>
      {active && (
        <div className={styles.modal}>
          <Outlet context={{ id, url, title, tagNames, ref }} />
        </div>
      )}
    </div>
  );
};

export default CardPrivate;
