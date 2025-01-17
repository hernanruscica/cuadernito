import React from 'react';
import styles from './button.module.css';
import { FiPlusSquare } from "react-icons/fi";
import { FiPlusCircle  } from "react-icons/fi";

function AddButton({variant='square', onClick}) {
  return (
    <button className={styles.button} onClick={onClick}>
      {variant == 'square' ? <FiPlusSquare  /> : <FiPlusCircle  />}
    </button>
  );
}

export default AddButton;