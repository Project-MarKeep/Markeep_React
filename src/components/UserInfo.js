import React, { useEffect, useRef, useState } from 'react';
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

  const $fileTag = useRef();

  // 닉네임 상태 설정
  const [nick, setNick] = useState(
    () => localStorage.getItem('nick') || user.nickname
  );

  // 프로필 이미지 URL 상태 설정
  const [profileUrl, setProfileUrl] = useState(
    () => localStorage.getItem('profileUrl') || user.profile
  );

  const token = localStorage.getItem('ACCESS_TOKEN');

  const header = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  // 닉네임 수정하기
  const requestUri = API_BASE_URL + USER + '/nickname?nickname=';

  const fetchPutNickname = async (newNickname) => {
    const res = await fetch(requestUri + newNickname, {
      method: 'PUT',
      headers: header,
    });

    if (res.status === 200) {
      console.log('닉네임 변경완료!');
      localStorage.setItem('nick', newNickname);
      setNick(newNickname);
    } else {
      console.error('닉네임 변경실패');
    }
  };

  // 프로필 사진 수정 요청
  const fetchUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('profileImage', $fileTag.current.files[0]);

    const res = await fetch(API_BASE_URL + USER + '/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    if (res.status === 200) {
      console.log('프로필 사진 변경 완료!');
      const newProfileUrl = await res.text();
      console.log('New Profile URL:', newProfileUrl);

      // 프로필 이미지 URL을 로컬 스토리지에 저장
      localStorage.setItem('profileUrl', newProfileUrl);

      // 변경된 프로필 이미지 URL로 상태 업데이트
      setProfileUrl(newProfileUrl);
    } else {
      console.error('프로필 사진 변경 실패');
    }
  };

  // 이미지 수정 핸들러
  const ImageChangeHandler = () => {
    fetchUpdateProfile();
  };

  // 닉네임 수정
  const [change, setChange] = useState(false);

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
    setNick(localStorage.getItem('nick') || user.nickname);
  };

  useEffect(() => {
    localStorage.setItem('nick', nick);
  }, [nick]);

  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.img_box}>
          <img
            src={profileUrl}
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
            ref={$fileTag}
            onChange={ImageChangeHandler}
          />
        </label>
      </div>
      <div>{user.email}</div>
      {!change ? (
        <div className={styles.box}>
          <div>{localStorage.getItem('nick')}</div>
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
            placeholder={localStorage.getItem('nick')}
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
    </div>
  );
};

export default UserInfo;
