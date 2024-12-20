import React from 'react';
import styles from './button.module.css';
import { FiLogIn  } from "react-icons/fi";
import { Link } from 'react-router-dom';


function LoginButton({url='/'}) {
  return (
    <Link className={styles.button} to={url}>
      <FiLogIn  />
    </Link>
  );
}

export default LoginButton;