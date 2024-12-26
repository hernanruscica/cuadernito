import React from "react";
import styles from "./NotebookSheet.module.css";


function NotebookSheet({ children }) {
  return (
    <div className={styles.mainScreenContainer}>      
      
      <div className={styles.listSection}>{children}</div>
    </div>
  );
}

export default NotebookSheet;
