import React from 'react';
import {Link} from 'react-router-dom';
import styles from './RowButton.module.css';

function RowButton({ info='info', details='', children }) {
  return (
    <Link to='/' className={styles.container}>
      <div className={styles.info}>
        <span>{info}</span>
        {(details !== '') ? <span className={styles.infoDetails}>{details}</span> : ''}
      </div>
      {children}
    </Link>
  );
}

export default RowButton;