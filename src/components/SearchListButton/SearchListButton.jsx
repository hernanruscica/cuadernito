import { useRef } from "react";
import React from "react";
import styles from "./SearchListButton.module.css";

import { FaArrowsUpDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

const SearchListButton = ({ placeholder = "", value, onChange }) => {
  const inputRef = useRef(null);

  const handlerClickSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }
 
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value} 
        onChange={onChange}  
        ref={inputRef}       
      />
      <button className={styles.button} onClick={handlerClickSearch}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchListButton;
