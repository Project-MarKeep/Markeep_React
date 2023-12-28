import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/FolderList.module.scss";

const FolderList = () => {
  return (
    <>
      <h2 className={styles.title}>내 폴더 목록</h2>
      <div className={styles.list}>
        <ul>
          <li>
            <Link to={`/detail`}>폴더 이름입니다. 폴더폴더폴더폴더폴더</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FolderList;
