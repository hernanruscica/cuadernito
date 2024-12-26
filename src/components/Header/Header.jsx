import React from 'react';
import styles from './Header.module.css'

function Header({ title, subtitle }) {
  //const imageSiteUrl = 'http://localhost:5173/images';
  const imageSiteUrl = 'https://cuadernito.onrender.com/images';
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>
        <h1 className={styles.headerTitle}>{title}</h1>        
        <p className={styles.headerSubtitle}>{subtitle}</p>     
      </div>
      <img src={`${imageSiteUrl}/Cuadernitoapp.png`} alt="Cuadernito app" title="Cuadernito app"  className={styles.headerImage}/>
    </div>
  );
}

export default Header;