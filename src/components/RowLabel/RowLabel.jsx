import React from 'react';
import styles from './RowLabel.module.css'

function RowLabel({ text = '', info = '', children=null }) {
  return (
    <div className={styles.RowLabelContainer}>
      {children}
      <h1 className={styles.RowLabelText}>{text}</h1>
      <p className={styles.RowLabelInfo}>{info}</p>
     <div ></div>
    </div>
  );
}

export default RowLabel;