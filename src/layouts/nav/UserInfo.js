import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/UserInfo.module.scss';
import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Cancel } from '../../assets/icons/x.svg';
import { ReactComponent as Check } from '../../assets/icons/check.svg';
import {
  getProfile,
  updateNickname,
  updateProfile,
} from '../../services/userApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';

const UserInfo = () => {
  const [change, setChange] = useState(false);
  const [nick, setNick] = useState('');
  const queryClient = useQueryClient();

  const $fileTag = useRef();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return getProfile();
    },
  });

  const { mutate: updateImage } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      console.error('에러');
    },
  });

  const { mutate: updateName } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      console.error('에러');
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>{error}</ErrorPage>;

  const { profileImage, nickname, email, followerCount, followingCount } = data;

  const ImageChangeHandler = () => {
    updateImage($fileTag.current.files[0]);
  };

  const clickChangeHandler = () => {
    setChange(true);
  };

  const clickSaveHandler = () => {
    updateName(nick);
    setChange(false);
    setNick('');
  };

  const getText = (e) => {
    setNick(e.target.value);
  };

  const clickCancelHandler = () => {
    setNick('');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.img_box}>
          <img
            src={profileImage}
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
      <div>{email}</div>
      {!change ? (
        <div className={styles.box}>
          <div>{nickname}</div>
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
            placeholder={nickname}
            onChange={getText}
            value={nick}
          />
          {nick ? (
            <div
              className={styles.cancel}
              onClick={clickCancelHandler}
            >
              <Cancel className={styles.icon} />
            </div>
          ) : null}
          <div
            className={styles.check}
            onClick={clickSaveHandler}
          >
            <Check className={styles.icon} />
          </div>
        </div>
      )}
      <div className={styles.box}>
        <p>팔로워 {followerCount}</p>
        <p>팔로잉 {followingCount}</p>
      </div>

      {/* <button>비밀번호 변경</button> */}
    </div>
  );
};

export default UserInfo;
