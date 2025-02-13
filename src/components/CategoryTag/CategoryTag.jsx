import React from "react";
import styles from "./CategoryTag.module.css";
import { FiTag } from "react-icons/fi";
import { RowNormal } from "../RowNormal/RowNormal";


const CategoryTag = ({ text="text", color="#DDD", onClick=null }) => {   
  
  return (    
      <button 
          className={styles.button}   
          style={{ backgroundColor: color }}        
          onClick={onClick}>
        <FiTag />  
        <span className={styles.text}>
          {text}
        </span>
      </button>
    
  );
};

export default CategoryTag;
