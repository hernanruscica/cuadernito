import React from 'react';
import styles from './button.module.css';
import { FiSave } from "react-icons/fi";

function SaveButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiSave   />
    </button>
  );
}

export default SaveButton;