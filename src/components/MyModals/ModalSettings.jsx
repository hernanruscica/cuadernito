import RowSelect from "../RowSelect/RowSelect";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ModalButton from '../ModalButton/ModalButton';
import SaveButton from '../Buttons/SaveButton';
import { FiSave } from "react-icons/fi";
import { FiArrowLeft  } from "react-icons/fi";
import Modal from './Modal';
import './Modal.css';


export const ModalSettings = ({ onClose, title='title', subtitle='subtitle', onClickYes, isOpen, data=null}) => {
    const { translations} = useContext(DataContext); 
    
    return(            
        <Modal isOpen={isOpen} onClose={onClose} >
            <h1 className="modal-content-title">{title}</h1>
                 <p className="modal-content-paragraph">{subtitle}</p>
                 <RowSelect 
                     text={translations.modalSettingsThemeText}
                     nameSelect='theme' 
                     options={data.themes}
                     selectedValue={data.userSettings.themeId}
                     handlerSelect = {data.setThemeHandler}
                 />    
                 <RowSelect 
                     text={translations.modalSettingsLanguageText}
                     nameSelect='language' 
                     options={data.languages}
                     selectedValue={data.userSettings.language}
                     handlerSelect = {data.setLanguageHandler}
                 />                       
                
                 <div className="buttons-container">
                     <ModalButton onClickHandler={onClose}
                         text={translations.backButton} >
                        <FiArrowLeft />                          
                     </ModalButton>
                     <ModalButton onClickHandler={onClickYes}
                         text={translations.rowButtonSave} >
                         <FiSave />
                     </ModalButton>
                 </div>   
        </Modal>        
    )
}