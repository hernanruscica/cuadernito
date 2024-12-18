import React from 'react';
import styles from './Header.module.css'

function Header({ title, subtitle }) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerSubtitle}>{subtitle}</p>     
    </div>
  );
}

export default Header;