import { Outlet } from "react-router-dom";
import styles from "../styles/Mypage.module.scss";
import { useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Cancel } from "../assets/icons/x.svg";

const MyPage = () => {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef();

  const getText = (e) => {
    setKeyword(e.target.value);
  };

  const clickCancelHandler = (e) => {
    setKeyword("");
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      clickSearchHandler();
      inputRef.current.blur();
    }
  };

  const clickSearchHandler = (e) => {};

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>My Folder List</h2>
        <div className={styles.box}>
          <input
            placeholder="내 폴더 검색"
            onChange={getText}
            value={keyword}
            onKeyDown={keyDownHandler}
            ref={inputRef}
          />
          {keyword ? (
            <div className={styles.cancel} onClick={clickCancelHandler}>
              <Cancel className={styles.icon} />
            </div>
          ) : null}
          <div className={styles.search} onClick={clickSearchHandler}>
            <SearchIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
