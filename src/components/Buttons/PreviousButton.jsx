import React from 'react';
import styles from './button.module.css';
import { FiArrowLeft  } from "react-icons/fi";

function PreviousButton() {
  return (
    <button className={styles.button}>
      <FiArrowLeft  />
    </button>
  );
}

export default PreviousButton;