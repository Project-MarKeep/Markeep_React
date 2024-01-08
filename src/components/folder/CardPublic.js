import React, { useEffect, useState } from 'react';
import styles from '../../styles/CardPublic.module.scss';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as PinViewIcon } from '../../assets/icons/pin.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { follow } from '../../services/followApi';
import { addFolderPin } from '../../services/folderApi';

const CardPublic = ({
  data,
  id,
  image,
  profileImg,
  isMarked,
  title,
  writer,
  isFollowed,
  pin,
  toId,
  setClickFollow,
}) => {
  const location = useLocation();

  const followClickHandler = (e) => {
    e.preventDefault();
    setClickFollow(toId);
  };

  const bookmarkClickHandler = (e) => {
    e.preventDefault();
    addFolderPin(id);
  };

  return (
    <div className={styles.wrap}>
      <Link
        to={`/view/public/folders/${id}`}
        state={{ previousLocation: location, data: data }}
      >
        <div className={styles.img_box}>
          <img
            src={image || require('../../assets/imgs/defaultFolderImg.jpg')}
            alt='폴더 이미지'
          />
          <div className={styles.hover}>
            <span>{title}</span>
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
          <div className={styles.group}>
            <img
              src={profileImg}
              alt='프로필 사진'
            />
            <span>{writer}</span>
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
        </div>
      </Link>
    </div>
  );
};

export default CardPublic;
