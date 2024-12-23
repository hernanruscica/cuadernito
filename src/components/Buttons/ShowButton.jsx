import React from 'react';
import styles from './button.module.css';
import { FiEye } from "react-icons/fi";

function ShowButton() {
  return (
    <button className={styles.button} >
      <FiEye />
    </button>
  );
}

export default ShowButton;