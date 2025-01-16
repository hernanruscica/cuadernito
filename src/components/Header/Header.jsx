import React from 'react';
import styles from './Header.module.css'

function Header({ title, subtitle }) {  
  
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>
        <h1 className={styles.headerTitle}>{title}</h1>        
        <p className={styles.headerSubtitle}>{subtitle}</p>     
      </div>
     
    </div>
  );
}

export default Header;