import React from 'react';
import styles from './button.module.css';
import { FiCheckSquare } from "react-icons/fi";

function CheckButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiCheckSquare  />
    </button>
  );
}

export default CheckButton;