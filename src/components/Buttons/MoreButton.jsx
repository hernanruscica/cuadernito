import React from 'react';
import styles from './button.module.css';
import { FiMoreVertical } from "react-icons/fi";

function MoreButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiMoreVertical  style={{height: "25px", width: "25px"}}/>
    </button>
  );
}

export default MoreButton;