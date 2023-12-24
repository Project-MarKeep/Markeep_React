import React from "react";
import styles from "../styles/Input.module.scss";

const Input = ({ children }) => {
  const [icon1, icon2] = children;
  console.log(icon1, icon2);

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon_box}>{icon1}</div>
      <input type="text" placeholder=""></input>
      <div className={styles.icon_box}>{icon2}</div>
    </div>
  );
};

export default Input;
