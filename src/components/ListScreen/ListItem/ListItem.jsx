import React, { useState } from "react";
import styles from "./ListItem.module.css";
import ShowButton from "../../Buttons/ShowButton";

function ListItem({ text, url }) {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked(!checked);

  return (
    <div className={`${styles.listItem} ${checked ? styles.checked : ""}`}>
      <div 
        className={`${styles.checkbox} ${checked ? styles.checkedBox : ""}`} 
        onClick={toggleChecked}
      >
        {checked && <span className={styles.checkmark}>✔</span>}
      </div>
      <span className={`${styles.text} ${checked ? styles.checkedText : ""}`}
        onClick={toggleChecked}>
        {text}
      </span>
      <ShowButton url={url}/>      
    </div>
  );
}

export default ListItem;
