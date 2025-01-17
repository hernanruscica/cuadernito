import React from "react";
import styles from "./AddItemButton.module.css";
import { FiPlusCircle } from "react-icons/fi";

const AddItemButton = ({ placeholder = "Type a new item", value, onChange, onAdd }) => {
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
      <button className={styles.button} onClick={onAdd}>
        <FiPlusCircle />
      </button>
    </div>
  );
};

export default AddItemButton;
