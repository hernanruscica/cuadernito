import React from "react";
import styles from "./NotebookSheet.module.css";
import Header from "../Header/Header";

function NotebookSheet({ title, subtitle, children }) {
  return (
    <div className={styles.mainScreenContainer}>      
      <Header title={title} subtitle={subtitle} />
      <div className={styles.listSection}>{children}</div>
    </div>
  );
}

export default NotebookSheet;
