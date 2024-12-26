import React from 'react';
import styles from './HeaderList.module.css'

function HeaderList({children, subtitle='Fecha de creacion'}) {
  
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>
        {children}        
        
        <p className={styles.headerSubtitle}>{subtitle}</p>     
      </div>
      
    </div>
  );
}

export default HeaderList;