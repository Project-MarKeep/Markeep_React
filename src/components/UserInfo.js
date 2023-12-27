import React, { useState } from 'react';
import styles from '../styles/UserInfo.module.scss';
import { ReactComponent as Pencil } from '../assets/icons/pencil.svg';
import { ReactComponent as Cancel } from '../assets/icons/x.svg';
import { ReactComponent as Check } from '../assets/icons/check.svg';
import { API_BASE_URL, USER } from '../config/host-config';

const UserInfo = () => {
  const user = {
    profile:
      'https://i.pinimg.com/236x/3f/cf/87/3fcf870d7e9eaba4df4857e0f641d084.jpg',
    nickname: '녹차',
    email: 'greentea@google.com',
  };

  const token = localStorage.getItem('ACCESS_TOKEN');

  const header = {
    'content-type': 'application/json',
    authorization: 'Bearer ' + token,
  };

  const requestUri = API_BASE_URL + USER + '/nickname?nickname=';

  const fetchPutNickname = async (newNickname) => {
    const res = await fetch(requestUri + newNickname, {
      method: 'PUT',
      headers: header,
      // body: JSON.stringify({
      //   nickname: newNickname,
      // }),
    });

    if (res.status == 200) {
      console.log('닉네임 변경완료!');
    } else {
      console.error('닉네임 변경실패');
    }
  };

  const [change, setChange] = useState(false);
  const [nick, setNick] = useState(user.nickname);

  const clickChangeHandler = () => {
    setChange(true);
  };

  const clickSaveHandler = () => {
    setChange(false);
    console.log('newNickName', nick);
    fetchPutNickname(nick);
  };

  const getText = (e) => {
    setNick(e.target.value);
  };

  const clickCancelHandler = () => {
    setNick(user.nickname);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.img_box}>
          <img
            src={user.profile}
            alt='프로필 사진'
          />
        </div>
        <label
          className={styles.icon_box}
          htmlFor='profile'
        >
          <Pencil className={styles.icon} />
          <input
            type='file'
            id='profile'
            style={{ display: 'none' }}
          />
        </label>
        {/* <div className={styles.icon_box}>
          <Pencil className={styles.icon} />
        </div> */}
      </div>
      <div>{user.email}</div>
      {!change ? (
        <div className={styles.box}>
          <div>{user.nickname}</div>
          <div
            className={styles.pencil}
            onClick={clickChangeHandler}
          >
            <Pencil className={styles.icon} />
          </div>
        </div>
      ) : (
        <div className={styles.box}>
          <input
            name='nickname'
            placeholder={user.nickname}
            onChange={getText}
            value={nick}
          />
          {nick !== user.nickname && (
            <div
              className={styles.cancel}
              onClick={clickCancelHandler}
            >
              <Cancel className={styles.icon} />
            </div>
          )}
          <div
            className={styles.check}
            onClick={clickSaveHandler}
          >
            <Check className={styles.icon} />
          </div>
        </div>
      )}

      {/* <button>비밀번호 변경</button> */}
    </div>
  );
};

export default UserInfo;
