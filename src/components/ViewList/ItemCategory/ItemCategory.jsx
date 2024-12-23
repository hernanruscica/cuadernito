import React from 'react';
import styles from './ItemCategory.module.css'
import { FiTag } from "react-icons/fi";



function ItemCategory({ text = '' }) {
  return (
    <div className={styles.ItemCategoryContainer}>        
        <FiTag />
        <h2 className={styles.ItemCategoryText}>{text}</h2>           
    </div>
  );
}

export default ItemCategory;