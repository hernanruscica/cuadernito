import React from 'react';
import {Link} from 'react-router-dom';
import styles from './RowButton.module.css';
import { FiCornerDownRight } from "react-icons/fi";

function RowButton({ info='info', details='', url='/', onClick=null, children }) {
  return (
    <Link to={url} className={styles.container} onClick={onClick}>
      <div className={styles.info}>
        <span> {info}</span>
        {(details !== '') ? <span className={styles.infoDetails}>{details}</span> : ''}
      </div>
      {children}
    </Link>
  );
}

export default RowButton;