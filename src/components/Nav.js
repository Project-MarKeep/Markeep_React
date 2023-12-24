import React from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";
import { Link } from "react-router-dom";
import styles from "../styles/Nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_box}>
        <div className={styles.icon_box}>
          <SearchIcon className={styles.icon} />
        </div>
        <Link className={styles.icon_box} to={"/mypage"}>
          <DashboardIcon className={styles.icon} />
        </Link>
        <div className={styles.icon_box}>
          <PlusIcon className={styles.icon} />
        </div>
        <div className={styles.icon_box}>
          <FolderIcon className={styles.icon} />
        </div>
        <div className={styles.icon_box}>
          <UserIcon className={styles.icon} />
        </div>
      </div>
      <div className={styles.nav_box_detail}></div>
    </div>
  );
};

export default Nav;
