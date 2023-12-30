import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/CardPublic.module.scss';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as PinViewIcon } from '../../assets/icons/pin.svg';
import { Link, Outlet } from 'react-router-dom';

const CardPublic = ({
  data,
  id, url, title, tagNames,
  isMarked,
  isFollowed,
  pin,
  bookmarkClickHandler,
  followClickHandler,
}) => {
  console.log('data:', data);

  const [active, setActive] = useState();
  const ref = useRef();

  const clickManageHandler = () => {
    setActive(true);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if(active && ref.current && !ref.current.contains(e.target)){
        setActive(false);
      }
    }

    document.addEventListener('mousedown', clickOutside);
    return (() => {
      document.addEventListener('mousedown', clickOutside);
    })

  }, [active])

  return (
    <div className={styles.wrap}>
      <Link to='detail' onClick={clickManageHandler}>
      <div className={styles.img_box}>
        <img
          src={
            data.folderImg || require('../../assets/img/defaultFolderImg.jpg')
          }
          alt='폴더 이미지'
        />
        <div className={styles.hover}>
          <span>{data.title}</span>
          <div
            className={styles.icon_box}
            onClick={bookmarkClickHandler}
          >
            <BookmarkIcon
              className={`${styles.icon} ${isMarked && styles.marked}`}
            />
          </div>
        </div>
      </div>
      <div className={styles.writer_bar}>
        <>
          <div className={styles.group}>
            <img
              src={
                data.profileImage ||
                require('../../assets/img/defaultProfileImg.jpg')
              }
              alt='프로필 사진'
            />
            <span>{data.nickname}</span>
            <button
              className={isFollowed && styles.followed}
              onClick={followClickHandler}
            >
              {isFollowed ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className={styles.group}>
            <div className={styles.icon_box}>
              <PinViewIcon className={styles.icon} />
            </div>
            {pin}
          </div>
        </>
      </div>
      </Link>
      {active && <div className={styles.modal}>
        <Outlet context={{ id, url, title, tagNames, ref }} />
      </div>}
    </div>
  );
};

export default CardPublic;
