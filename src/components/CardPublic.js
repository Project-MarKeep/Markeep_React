import React from 'react';
import styles from '../styles/CardPublic.module.scss';
import { ReactComponent as BookmarkIcon } from '../assets/icons/bookmark.svg';
import { ReactComponent as PinViewIcon } from '../assets/icons/pin.svg';

const CardPublic = ({
  data,
  isMarked,
  isFollowed,
  pin,
  bookmarkClickHandler,
  followClickHandler,
}) => {
  console.log(data);
  return (
    <div className={styles.wrap}>
      <div className={styles.img_box}>
        <img
          src={
            data.folderImg || require('../assets/icons/defaultFolderImg.jpg')
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
        <div className={styles.group}>
          <img
            src={
              data.profileImage ||
              require('../assets/icons/defaultProfileImg.jpg')
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
      </div>
    </div>
  );
};

export default CardPublic;
