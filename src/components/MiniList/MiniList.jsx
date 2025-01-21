import React from 'react'
import { Link } from 'react-router-dom';
import styles from './MiniList.module.css';

const MiniList = ({children, id, date='Fecha de creacion', itemQty, onClick}) => {
  return (
    <Link to={`/lists/${id}`} onClick={onClick} className={styles.mainScreenContainer}>                
        <div className={styles.listHeader}>{children}</div>
        <div className={styles.listSection}>{`${date}`}</div>
        <div className={styles.listSection}>{`${itemQty} items`}</div>
    </Link>    
  )
}

export default MiniList