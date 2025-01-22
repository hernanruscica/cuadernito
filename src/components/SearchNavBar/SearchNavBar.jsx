import React from 'react'
import styles from './SearchNavBar.module.css';
import SearchListButton from '../SearchListButton/SearchListButton';

const SearchNavBar = () => {
  return (
    <div className={styles.MainContainer}>
        <div className={styles.SearchNavBarResults}>
            <p>Mostrando 3 listas</p>
        </div>
        <div className={styles.SearchNavBarButtons}>
        <SearchListButton />
        <SearchListButton />
        </div>
    </div>
  )
}

export default SearchNavBar