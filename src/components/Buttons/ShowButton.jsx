import React from 'react';
import styles from './button.module.css';
import { FiEye } from "react-icons/fi";
import { Link } from 'react-router-dom';


function ShowButton({url='/'}) {
  return (
    <Link className={styles.button} to={url}>
      <FiEye />
    </Link>
  );
}

export default ShowButton;