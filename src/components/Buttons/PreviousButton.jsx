import React from 'react';
import styles from './button.module.css';
import { FiArrowLeft  } from "react-icons/fi";

function PreviousButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiArrowLeft  />
    </button>
  );
}

export default PreviousButton;