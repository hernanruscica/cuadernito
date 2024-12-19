import React from 'react';
import styles from './button.module.css';
import { FiPlusSquare  } from "react-icons/fi";

function AddButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiPlusSquare  />
    </button>
  );
}

export default AddButton;