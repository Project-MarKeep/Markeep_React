import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { ReactComponent as FolderIcon } from '../assets/icons/folder.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import styles from '../styles/Nav.module.scss';
import SearchFolder from './nav/SearchFolder';
import Add from './nav/Add';
import FolderList from './nav/FolderList';
import UserInfo from './nav/UserInfo';

const Nav = () => {
  const [active, setActive] = useState('');

  const ref = useRef();

  const clickButtonHandler = (e) => {
    const name = e.currentTarget.getAttribute('name');

    if (active === name) {
      setActive('');
      return;
    }

    setActive(name);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        active &&
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.tagName !== 'svg' &&
        e.target.tagName !== 'path'
      ) {
        setActive('');
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [active]);

  const menus = [
    {
      title: '내 폴더 검색',
      icon: <SearchIcon className={styles.icon} />,
      content: <SearchFolder />,
      name: 'title',
    },
    {
      title: '마이 페이지',
      icon: <DashboardIcon className={styles.icon} />,
      link: '/mypage/folders',
      name: 'mypage',
    },
    {
      title: '북마크 추가',
      icon: <PlusIcon className={styles.icon} />,
      content: <Add />,
      name: 'add',
    },
    {
      title: '내 폴더',
      icon: <FolderIcon className={styles.icon} />,
      content: <FolderList />,
      name: 'folders',
    },
    {
      title: '내 정보',
      icon: <UserIcon className={styles.icon} />,
      content: <UserInfo />,
      name: 'user',
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
              {menu.link ? (
                <Link
                  to={menu.link}
                  className={styles.icon_box}
                  name={menu.name}
                  onClick={clickButtonHandler}
                >
                  {menu.icon}
                </Link>
              ) : (
                <div
                  to={menu.link}
                  className={styles.icon_box}
                  name={menu.name}
                  onClick={clickButtonHandler}
                >
                  {menu.icon}
                </div>
              )}
              <div className={styles.title}>{menu.title}</div>
              {!menu.link && active === menu.name && (
                <div
                  className={styles.modal}
                  ref={ref}
                >
                  {menu.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
