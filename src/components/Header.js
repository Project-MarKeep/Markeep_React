import React from "react";
import styles from "../styles/Header.module.scss";
import Input from "./Input";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import title from "../assets/icons/title.png";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {/* <img src={title} alt="타이틀" /> */}
        MarKeep
      </div>
      <div className={styles.search}>
        <Input>
          <div></div>
          <SearchIcon className={styles.icon} />
        </Input>
      </div>
      <div className={styles.sign_box}>
        <button className={styles.button}>Sign In</button>
        <button className={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
