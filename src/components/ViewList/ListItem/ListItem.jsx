import React, { useState } from "react";
import styles from "./ListItem.module.css";
import NotebookButton from "../../Buttons/NotebookButton";
import CheckButton from "../../Buttons/CheckButton";
import NoCheckButton from "../../Buttons/NoCheckButton";
import ShowButton from "../../Buttons/ShowButton";
import { Link } from "react-router-dom";

function ListItem({ text, url, id,  checked, toggleChecked }) {
  
  //console.log(id, checked)
  return (
    <div className={`${styles.listItem} ${checked ? styles.checked : ""}`} >
      {/* <div onClick={toggleChecked} id={id}
        className={`${styles.checkbox} ${checked ? styles.checkedBox : ""}`}        
      >
        {checked && <span className={styles.checkmark}  id={id}  ></span>}
      </div> */}
      <div className={styles.checkbox} onClick={toggleChecked} id={id}>
        {(checked) ?      
        <CheckButton />
        : <NoCheckButton />}
      </div>
      <Link        
        id={id}
        to={url}
        className={`${styles.text} ${checked ? styles.checkedText : ""}`}
        
      >
        {text}
        <ShowButton />
      </Link>

    </div>
  );
}

export default ListItem;
