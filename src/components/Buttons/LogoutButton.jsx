import React from 'react';
import styles from './button.module.css';
import { FiLogOut  } from "react-icons/fi";

function LogoutButton() {
  return (
    <button className={styles.button} >
      <FiLogOut  />
    </button>
  );
}

export default LogoutButton;