import React from 'react';
import styles from './button.module.css';
import { FiXCircle } from "react-icons/fi";

function CloseButton(onClick=null) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiXCircle />
    </button>
  );
}

export default CloseButton;