import React from 'react';
import styles from './button.module.css';
import { FiSquare } from "react-icons/fi";

function NoCheckButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiSquare  />
    </button>
  );
}

export default NoCheckButton;