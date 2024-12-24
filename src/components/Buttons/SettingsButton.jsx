import React from 'react';
import styles from './button.module.css';
import { FiSettings } from "react-icons/fi";

function SettingsButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiSettings   />
    </button>
  );
}

export default SettingsButton;