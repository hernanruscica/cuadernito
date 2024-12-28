import styles from './HeaderApp.module.css';
import SettingsButton from "../Buttons/SettingsButton";
import NotebookButton from '../Buttons/NotebookButton';
import HeaderAppButton from "./HeaderAppButton";
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { ModalSettings } from '../Modals/ModalConfirm/ModalSettings';

const HeaderApp = () => {
    const { translations, isDataLoaded, userSettings, editUserSetting, themes } = useContext(DataContext);  
    const [ showSettingsModal, setShowSettingsModal] = useState(false);
    const [ currentUserSettings, setCurrentUserSettings] = useState({});
    const [ backupUserSettings, setBackupUserSettings] = useState({});
   
    const handlerSettings = (e) => {
        e.preventDefault();        
        setBackupUserSettings(userSettings);
        setShowSettingsModal(!showSettingsModal);
    }

    const handlerSelectThemeChange = (e) => {           
        editUserSetting({
            ...currentUserSettings,
            themeId: e.target.value
        });      
    }
    const handlerSelectLanguageChange = (e) => {             
        editUserSetting({
            ...currentUserSettings,
            language: e.target.value
        });
    }

    const handlerSaveSettings = () => {        
        setShowSettingsModal(!showSettingsModal);
    }

    const handlerCancelSettings = () => {        
        editUserSetting(backupUserSettings);
        setShowSettingsModal(false);
    }    
    
    useEffect(() => {
        if (isDataLoaded){
            setCurrentUserSettings(userSettings);
        }
    }, [isDataLoaded, userSettings]);    

    const data = {
        themes: themes,
        languages: [{id: "en", name: "English"}, {id: "es", name: "Español"}],
        userSettings: currentUserSettings,
        setThemeHandler: handlerSelectThemeChange,
        setLanguageHandler: handlerSelectLanguageChange
    }
    
    return(
        <header className={styles.container}>
            {
                (showSettingsModal)
                ? <ModalSettings 
                    title={translations.modalSettingsTitle}
                    subtitle={translations.modalSettingsSubtitle}
                    yesText={translations.modalSettingsYesText}
                    notText={translations.modalSettingsNotText}
                    onClickYes={handlerSaveSettings}
                    onClickNot={handlerCancelSettings}
                    data={data}
                    />
                : ''
            }
            
            <HeaderAppButton url="/" 
                text={translations.headerListButton} >
                <NotebookButton />
            </HeaderAppButton>
            
            <HeaderAppButton url="/" 
                text={translations.headerSettingsButton} 
                onClickHandler = {handlerSettings}>
                <SettingsButton />
            </HeaderAppButton>
            
        </header>
    )
}
export default HeaderApp;