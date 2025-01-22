import React from 'react'
import { Link } from 'react-router-dom';
import styles from './MiniList.module.css';

const MiniList = ({children, id, subtitle01='empty', subtitle02='', onClick}) => {
  return (
    <Link to={`/lists/${id}`} onClick={onClick} className={styles.mainScreenContainer}>                
        <div className={styles.listHeader}>{children}</div>
        <div className={styles.listSection}>{subtitle01}</div>
        {(subtitle02 !== '') ? <div className={styles.listSection}>{subtitle02}</div>
          : ''}
    </Link>    
  )
}

export default MiniList