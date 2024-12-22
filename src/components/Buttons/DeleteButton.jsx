import React from 'react';
import styles from './button.module.css';
import { FiTrash2   } from "react-icons/fi";

function DeleteButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiTrash2   />
    </button>
  );
}

export default DeleteButton;