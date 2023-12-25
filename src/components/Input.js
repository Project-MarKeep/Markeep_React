import React from 'react';
import styles from '../styles/Input.module.scss';

const Input = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Input;
