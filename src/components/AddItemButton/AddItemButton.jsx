import React from "react";
import styles from "./AddItemButton.module.css";

const AddItemButton = () => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Type a new item"
        className={styles.input}
      />
      <button className={styles.button}>
        <span className={styles.plus}>+</span>
      </button>
    </div>
  );
};

export default AddItemButton;
