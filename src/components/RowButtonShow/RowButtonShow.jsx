import React from 'react';
//import {Link} from 'react-router-dom';
import styles from './RowButtonShow.module.css';
import ShowButton from '../Buttons/ShowButton';

function RowButtonShow({ info, details }) {
  return (
    <div  className={styles.container}>
      <div className={styles.info}>
        <span>{info}</span>
        <span className={styles.infoDetails}>{details}</span>
      </div>
      {/* Aca deberia hacer un RowBotton generico que dentro pueda pasarle info, details, icon */}
        <ShowButton />
    </div>
  );
}

export default RowButtonShow;