import React from 'react'
import { Link } from 'react-router-dom';
import styles from './MiniList.module.css';
import { FiPlus  } from "react-icons/fi";

const MiniList = ({id, subtitle01='empty', subtitle02='', onClick, type='default', textNewList}) => {
  return (
    <Link to={`/lists/${id}`} onClick={onClick} 
      className={(type=='newlist') ? `${styles.mainScreenContainer} ${styles.newList}` : styles.mainScreenContainer }>                
        {(type=='newlist')?
          <div className={styles.listHeader}>
            <div style={{display: "Flex", alignItems: "center", justifyContent: "space-around", gap: "5px"}}>
              <span>{textNewList}</span>
              <FiPlus />
            </div>
          </div>
          : ''
        }
        <div className={styles.listSection}>{subtitle01}</div>
        {(subtitle02 !== '') ? <div className={styles.listSection}>{subtitle02}</div>
          : ''}
    </Link>    
  )
}

export default MiniList