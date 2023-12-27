import React from "react";
import styles from "../styles/UserInfo.module.scss";
import { ReactComponent as Pencil } from "../assets/icons/pencil.svg";

const UserInfo = () => {
  const user = {
    profile:
      "https://i.pinimg.com/236x/3f/cf/87/3fcf870d7e9eaba4df4857e0f641d084.jpg",
    nickname: "녹차",
    email: "greentea@google.com",
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.img_box}>
          <img src={user.profile} alt="프로필 사진" />
        </div>
        <div className={styles.icon_box}>
          <Pencil className={styles.icon} />
        </div>
      </div>
      <div className={styles.box}>
        <input name="nickname" value={user.nickname} />
        <div className={styles.icon_box}>
          <Pencil className={styles.icon} />
        </div>
      </div>
      <div className={styles.box}>
        <input name="email" value={user.email} />
        <div className={styles.icon_box}>
          <Pencil className={styles.icon} />
        </div>
      </div>
      <button>비밀번호 변경</button>
    </div>
  );
};

export default UserInfo;
