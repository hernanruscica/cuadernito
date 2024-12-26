import React from 'react';
import styles from './button.module.css';
import { FiMoreHorizontal } from "react-icons/fi";

function MoreButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiMoreHorizontal  />
    </button>
  );
}

export default MoreButton;