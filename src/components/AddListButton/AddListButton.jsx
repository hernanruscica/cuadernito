import React from "react";
import styles from "./AddListButton.module.css";
import { FiPlusCircle } from "react-icons/fi";

const AddListButton = ({ textNewList, onClick }) => {  

  return (
    <div className={styles.container} onClick={onClick}>
      <label htmlFor="btn_add">
        {textNewList}
      </label>
      <button className={styles.button} onClick={onClick} id="btn_add" name="btn_add">
        <FiPlusCircle />
      </button>
    </div>
  );
};

export default AddListButton;
