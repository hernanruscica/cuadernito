import React from 'react';
import styles from './button.module.css';
import { FiEdit   } from "react-icons/fi";

function EditButton({onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FiEdit   />
    </button>
  );
}

export default EditButton;