import React, { forwardRef } from "react";
import styles from "./RowButtonInput.module.css";

const RowButtonInput = forwardRef(({ placeholder = "", children, button, textValue='', setTextValue, handleAction, onFocus, onKeyDown, onBlur }, ref) => {


  return (
    <div className={styles.RowButtonInputContainer}>
      <div className={styles.RowButtonInputItem}>
        <input
          type="text"
          maxLength="24"          
          placeholder={placeholder}
          value={textValue}
          className={styles.RowButtonInputInput}
          onChange={handleAction}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          ref={ref} 
        />
        {button}
      </div>
      {children && <div className={styles.RowButtonInputItem}>{children}</div>}
    </div>
  );
});

export default RowButtonInput;
