import styles from './RowNormal.module.css';
export const RowNormal = ({children}) => {   
    return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

 