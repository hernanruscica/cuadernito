import React from 'react';
import styles from './button.module.css';
import { FiFileText   } from "react-icons/fi";

function NotebookButton() {
  return (
    <button className={styles.button}>
      <FiFileText   />
    </button>
  );
}

export default NotebookButton;