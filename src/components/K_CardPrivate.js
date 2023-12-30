import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/CardPrivate.module.scss';
import { Link, Outlet } from 'react-router-dom';

const CardPrivate = ({ data, MyPageFlag }) => {
  const [active, setActive] = useState(false);
  const ref = useRef();

  const clickManageHandler = (e) => {
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
    <div className={styles.wrap}>
      <h4>{data.title}</h4>
      <div className={styles.image_box}>
        <img
          src={data.folderImg}
          alt='폴더 이미지'
        />
      </div>
      <div className={styles.tag_box}>
        {data.tags.map((tag, idx) => {
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
      <Link
        to={`/mypage/folders/${data.id}`}
        onClick={clickManageHandler}
      >
        Manage
      </Link>
      {active && (
        <div
          className={styles.modal}
          ref={ref}
        >
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default CardPrivate;
