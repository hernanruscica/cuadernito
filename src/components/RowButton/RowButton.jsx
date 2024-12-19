import React from 'react';
import {Link} from 'react-router-dom';
import styles from './RowButton.module.css';
import { FiCornerDownRight } from "react-icons/fi";

function RowButton({ info='info', details='', url='/', children }) {
  return (
    <Link to={url} className={styles.container}>
      <div className={styles.info}>
        <span><FiCornerDownRight /> {info}</span>
        {(details !== '') ? <span className={styles.infoDetails}>{details}</span> : ''}
      </div>
      {children}
    </Link>
  );
}

export default RowButton;