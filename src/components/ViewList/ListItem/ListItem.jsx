import React, { useState } from "react";
import styles from "./ListItem.module.css";
import NotebookButton from "../../Buttons/NotebookButton";
import CheckButton from "../../Buttons/CheckButton";
import NoCheckButton from "../../Buttons/NoCheckButton";
import MoreButton from "../../Buttons/MoreButton";
import { Link } from "react-router-dom";

function ListItem({ text, url, id,  checked, toggleChecked }) {
  
  //console.log(id, checked)
  return (
    <div className={`${styles.listItem} ${checked ? styles.checked : ""}`} >      
      
      <Link        
        id={id}
        to={url}
        className={`${styles.text} ${checked ? styles.checkedText : ""}`}
        
      >
        {text}
        <MoreButton />
      </Link>
      <div className={styles.checkbox} onClick={toggleChecked} id={id}>
        {(checked) ?      
        <CheckButton />
        : <NoCheckButton />}
      </div>

    </div>
  );
}

export default ListItem;
