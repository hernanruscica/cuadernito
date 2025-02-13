import React from "react";
import styles from "./ChangeCategoryButton.module.css";
import { FiTag } from "react-icons/fi";

const ChangeCategoryButton = ({ text, onClick=null }) => {  

  return (
    <div className={styles.container} onClick={onClick} >
      
        {text}
      
      <button className={styles.button}  id="btn_add" name="btn_add">
        <FiTag />
      </button>
    </div>
  );
};

export default ChangeCategoryButton;
