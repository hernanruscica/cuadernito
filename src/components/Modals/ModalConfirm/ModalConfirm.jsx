import NotebookSheet from "../../NotebookSheet/NotebookSheet";
import styles from './ModalConfirm.module.css';
import RowLabel from "../../RowLabel/RowLabel";
import Header from "../../Header/Header"

export const ModalConfirm = ({title='title', subtitle='subtitle', onClickYes, onClickNot, yesText, notText}) => {
    return(     
        <div className={styles.overlay}>
            <div className={styles.ModalConfirmContainer }>
                <NotebookSheet >
                <Header title={title} subtitle={subtitle}/>
                <div className={styles.confirmButtonsContainer}>
                    <button className={styles.confirmButton} 
                        onClick={onClickYes}>   
                        {yesText}                        
                    </button>
                    <button className={styles.confirmButton}
                        onClick={onClickNot}>
                        {notText}
                    </button>
                </div>
                <RowLabel />
                </NotebookSheet>        
            </div>
        </div>
    )
}