import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { ReactComponent as FolderIcon } from '../assets/icons/folder.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import styles from '../styles/Nav.module.scss';

const Nav = () => {
  const menus = [
    {
      title: '내 폴더 검색',
      icon: <SearchIcon className={styles.icon} />,
      link: '/find',
    },
    {
      title: '마이 페이지',
      icon: <DashboardIcon className={styles.icon} />,
      link: '/mypage',
    },
    {
      title: '북마크 추가',
      icon: <PlusIcon className={styles.icon} />,
      link: '/add',
    },
    {
      title: '내 폴더 목록',
      icon: <FolderIcon className={styles.icon} />,
      link: '/folders',
    },
    {
      title: '내 정보',
      icon: <UserIcon className={styles.icon} />,
      link: '/user',
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_box}>
        {menus.map((menu, idx) => {
          return (
            <div
              className={styles.menu}
              key={idx}
            >
              <Link
                to={menu.link}
                className={styles.icon_box}
              >
                {menu.icon}
              </Link>
              <div className={styles.title}>{menu.title}</div>
            </div>
          );
        })}
      </div>
    </div>

    // <div className={styles.wrapper}>
    //   <div className={styles.nav_box}>
    //     <div className={styles.icon_box}>
    //       <SearchIcon className={styles.icon} />
    //     </div>
    //     <Link
    //       className={styles.icon_box}
    //       to={'/mypage'}
    //     >
    //       <DashboardIcon className={styles.icon} />
    //     </Link>
    //     <div className={styles.icon_box}>
    //       <PlusIcon className={styles.icon} />
    //     </div>
    //     <div className={styles.icon_box}>
    //       <FolderIcon className={styles.icon} />
    //     </div>
    //     <div className={styles.icon_box}>
    //       <UserIcon className={styles.icon} />
    //     </div>
    //   </div>
    //   <div className={styles.nav_box_detail}></div>
    // </div>
  );
};

export default Nav;
