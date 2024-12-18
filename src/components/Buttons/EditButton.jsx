import React from 'react';
import styles from './button.module.css';
import { FiEdit   } from "react-icons/fi";

function EditButton() {
  return (
    <button className={styles.button}>
      <FiEdit   />
    </button>
  );
}

export default EditButton;