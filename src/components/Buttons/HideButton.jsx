import React from 'react';
import styles from './button.module.css';
import { FiEyeOff } from "react-icons/fi";

function HideButton() {
  return (
    <button className={styles.button}>
      <FiEyeOff />
    </button>
  );
}

export default HideButton;