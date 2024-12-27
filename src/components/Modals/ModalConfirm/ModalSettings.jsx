import NotebookSheet from "../../NotebookSheet/NotebookSheet";
import styles from './ModalConfirm.module.css';
import RowSelect from "../../RowSelect/RowSelect";
import Header from '../../Header/Header';



export const ModalSettings = ({title='title', subtitle='subtitle', onClickYes, onClickNot, yesText, notText, data=null}) => {
    

   //console.log(data)
    
    return(     
        <div className={styles.overlay}>
            <div className={styles.ModalConfirmContainer }>
                <NotebookSheet 
                >    
                <Header title={title} subtitle={subtitle} />   
                <RowSelect 
                    text='Tema:'
                    nameSelect='theme' 
                    options={data.themes}
                    selectedValue={data.userSettings.themeId}
                    handlerSelect = {data.setThemeHandler}
                />    
                    
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
                
                </NotebookSheet>        
            </div>
        </div>
    )
}