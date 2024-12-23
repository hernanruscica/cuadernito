import React from 'react';
import styles from './button.module.css';
import { FiLogIn  } from "react-icons/fi";


function LoginButton() {
  return (
    <button  className={styles.button} >
      <FiLogIn  />
    </button>
  );
}

export default LoginButton;