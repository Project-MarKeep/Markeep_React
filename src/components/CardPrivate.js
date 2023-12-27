import React from "react";
import styles from "../styles/CardPrivate.module.scss";
import { ReactComponent as Cancel } from "../assets/icons/x-circle.svg";
import { Link, Outlet } from "react-router-dom";

const CardPrivate = ({ id, url, title, tags }) => {
  const clickCancelHandler = (e) => {
    console.log("삭제할 태그 idx: ", e.target.key);
  };

  return (
    <div className={styles.wrap}>
      <h4>{title}</h4>
      <div className={styles.image_box}>
        <img src={url} alt="폴더 이미지" />
      </div>
      <div className={styles.tag_box}>
        {tags.map((tag, idx) => {
          return (
            <>
              <div className={styles.tag}>{tag}</div>
            </>
          );
        })}
      </div>
      <Link to={`/mypage/folders/${id}`} />
      <div className={styles.modal}>
        <Outlet />
      </div>
    </div>
  );
};

export default CardPrivate;
