import React from 'react';
import styles from './RowLabel.module.css'

function RowLabel({ text = '', info = '', children=null }) {
  return (
    <div className={styles.RowLabelContainer}>
      <h1 className={styles.RowLabelText}>{text}</h1>
      <p className={styles.RowLabelInfo}>{info}</p>
      {children}
     <div ></div>
    </div>
  );
}

export default RowLabel;