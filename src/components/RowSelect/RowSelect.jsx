import React from 'react';
import styles from './RowSelect.module.css'

function RowSelect({ text = '', nameSelect = 'default',  options=[], selectedValue, handlerSelect=null }) {
  return (
    <div className={styles.RowSelectContainer}>
      
      <label htmlFor={nameSelect} className={styles.RowSelectText}>{text}</label>      
      <select name={nameSelect} id={nameSelect} value={selectedValue} onChange={handlerSelect} className={styles.select}>
        {
          options.map((option, index) => (
            <option value={option.id} key={`${index}-${option.name}` } 
              className={styles.option}
            >{option.name}</option>
          ))
        }        
      </select>
      
     <div ></div>
    </div>
  );
}

export default RowSelect;