import React from 'react';
import styles from './button.module.css';
import { FiLogOut  } from "react-icons/fi";
import { Link } from 'react-router-dom';


function LogoutButton({url='/'}) {
  return (
    <Link className={styles.button} to={url}>
      <FiLogOut  />
    </Link>
  );
}

export default LogoutButton;