import React from 'react';
import styles from './button.module.css';
import { FiPlusSquare  } from "react-icons/fi";

function AddButton() {
  return (
    <button className={styles.button}>
      <FiPlusSquare  />
    </button>
  );
}

export default AddButton;