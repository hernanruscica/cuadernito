import './Modal.css';
import RowSelect from "../RowSelect/RowSelect";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { FiXCircle } from "react-icons/fi";
import HeaderAppButton from '../HeaderApp/HeaderAppButton';
import SaveButton from '../Buttons/SaveButton';
import PreviousButton from '../Buttons/PreviousButton';


export const ModalSettings = ({isOpen, onClose, title='title', subtitle='subtitle', onClickYes, onClickNot, yesText, notText, data=null}) => {
    const { translations} = useContext(DataContext);

   //console.log(data)
    
    return(     
        <div className={`modal-backdrop ${isOpen ? "show" : ""}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? "slide-in" : "slide-out"}`}
                    onClick={(e) => e.stopPropagation()} >
                <button className="close-button" onClick={onClose}>
                    <FiXCircle />
                </button>                     
                
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
                    <HeaderAppButton onClickHandler={onClose}
                        text={translations.backButton} >
                        <PreviousButton />
                    </HeaderAppButton>
                    <HeaderAppButton onClickHandler={onClickYes}
                        text={translations.rowButtonSave} >
                        <SaveButton />
                    </HeaderAppButton>
                </div>
                
                       
            </div>
        </div>
    )
}