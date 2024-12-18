import React from 'react';
import styles from './CategorySelector.module.css';
import { FiTag } from "react-icons/fi";

function CategorySelector({ text = '', onClick }) {
  return (
    <div className={styles.ItemCategoryContainer} onClick={onClick}>
      <FiTag />
      <div className={styles.ItemCategoryText}>{text}</div>
    </div>
  );
}

export default CategorySelector;