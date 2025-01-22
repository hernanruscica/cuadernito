import React from 'react'
import styles from './SearchNavBar.module.css';
import SearchListButton from '../SearchListButton/SearchListButton';

const SearchNavBar = ( {value, onChange, listsQty} ) => {
    
  return (
    <div className={styles.MainContainer}>
        <div className={styles.SearchNavBarResults}>
            <p>{`Listas encontradas ${listsQty}`}</p>
        </div>
        <div className={styles.SearchNavBarButtons}>
        <SearchListButton value={value} onChange={onChange}/>
        
        </div>
    </div>
  )
}

export default SearchNavBar