import React, { useState } from "react";
import styles from "./RowButtonInput.module.css";

function RowButtonInput({ placeholder = "", children, button, textValue, setTextValue  }) {
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

 

  return (
    <div className={styles.RowButtonInputContainer}>
      <div className={styles.RowButtonInputItem}>
        <input
          type="text"
          maxLength="30"
          value={textValue} // El input ahora usa textValue como valor
          placeholder={placeholder}
          className={styles.RowButtonInputInput}
          onChange={handleInputChange} // Se dispara cada vez que el texto cambia          
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

