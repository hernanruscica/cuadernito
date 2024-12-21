import React, { useState } from "react";
import styles from "./RowButtonInput.module.css";

function RowButtonInput({ placeholder = "", children, button, textValue, setTextValue, handleAction }) {
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
   
  };

  const handlerKeyUp = (e) => {
    if (e.key == "Enter"){
      console.log('Enter pressed !', textValue);      
      handleAction(textValue);           
    }
  }

 

  return (
    <div className={styles.RowButtonInputContainer}>
      <div className={styles.RowButtonInputItem}>
        <input
          type="text"
          maxLength="24"
          placeholder={placeholder}
          value={textValue}  //El input ahora usa textValue como valor
          className={styles.RowButtonInputInput}
          onChange={handleInputChange} // Se dispara cada vez que el texto cambia   
          onKeyUp={handlerKeyUp}       
        />
        {button}
      </div>
      {children ? (
        <div className={styles.RowButtonInputItem}>{children}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default RowButtonInput;

