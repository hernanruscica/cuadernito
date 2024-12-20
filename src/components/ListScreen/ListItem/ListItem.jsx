import React, { useState } from "react";
import styles from "./ListItem.module.css";
import ShowButton from "../../Buttons/ShowButton";

function ListItem({ text, url, id,  checked, toggleChecked }) {
  

  return (
    <div className={`${styles.listItem} ${checked ? styles.checked : ""}`} >
      <div onClick={toggleChecked} id={id}
        className={`${styles.checkbox} ${checked ? styles.checkedBox : ""}`}        
      >
        {checked && <span className={styles.checkmark}  id={id}  >✔</span>}
      </div>
      <span        
        id={id}
        className={`${styles.text} ${checked ? styles.checkedText : ""}`}
        onClick={toggleChecked}
      >
        {text}
      </span>
      <ShowButton url={url} />
    </div>
  );
}

export default ListItem;
