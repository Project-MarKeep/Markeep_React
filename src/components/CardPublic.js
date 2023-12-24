import React from "react";
import styles from "../styles/CardPublic.module.scss";
import { ReactComponent as BookmarkIcon } from "../assets/icons/bookmark.svg";
import { ReactComponent as FollowIcon } from "../assets/icons/follow.svg";
import { ReactComponent as FollowedIcon } from "../assets/icons/followed.svg";
import { ReactComponent as PinViewIcon } from "../assets/icons/pin.svg";

const CardPublic = ({
  image,
  profileImg,
  isMarked,
  title,
  writer,
  isFollowed,
  pin,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.img_box}>
        <img src={image} alt="폴더 이미지" />
        <div className={styles.hover}>
          <span>{title}</span>
          <div className={styles.icon_box}>
            {isMarked ? (
              <BookmarkIcon className={styles.icon} />
            ) : (
              <BookmarkIcon className={styles.icon.false} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.writer_bar}>
        <div className={styles.group}>
          <img src={profileImg} alt="프로필 사진" />
          <span>{writer}</span>
          <button>{isFollowed ? "Following" : "Follow"}</button>
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
