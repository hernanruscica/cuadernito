import React from "react";
import styles from "./SearchListButton.module.css";

import { FaArrowsUpDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

const SearchListButton = ({ placeholder = "Type a new item", value, onChange, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAdd(); // Llama a la función para agregar el ítem cuando se presione Enter
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value} // El valor viene del padre
        onChange={onChange} // El manejador también viene del padre
        onKeyDown={handleKeyDown} // Maneja el evento Enter
      />
      <button className={styles.button} onClick={onClick}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchListButton;
