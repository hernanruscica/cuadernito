import React, {useContext} from 'react'
import styles from './SearchNavBar.module.css';
import SearchListButton from '../SearchListButton/SearchListButton';
import { DataContext } from "../../context/DataContext";

const SearchNavBar = ( {value, onChange, listsQty} ) => {

  const {translations } = useContext(DataContext);
    
  return (
    <div className={styles.MainContainer}>
        <div className={styles.SearchNavBarButtons}>
          <SearchListButton value={value} onChange={onChange} placeholder={translations.inputSearchList}/>        
        </div>
        <div className={styles.SearchNavBarResults}>
            <p>{`${translations.foundedList} : ${listsQty}`}</p>
        </div>
    </div>
  )
}

export default SearchNavBar