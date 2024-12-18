import React from 'react';
import styles from './button.module.css';
import { FiArrowRight  } from "react-icons/fi";

function NextButton() {
  return (
    <button className={styles.button}>
      <FiArrowRight  />
    </button>
  );
}

export default NextButton;