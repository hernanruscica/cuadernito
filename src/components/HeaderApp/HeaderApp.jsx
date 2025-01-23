import styles from './HeaderApp.module.css';
import SettingsButton from "../Buttons/SettingsButton";
import NotebookButton from '../Buttons/NotebookButton';
import PreviousButton from '../Buttons/PreviousButton';
import HeaderAppButton from "./HeaderAppButton";
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { ModalSettings } from '../MyModals/ModalSettings';
import { useNavigate } from 'react-router-dom';

const HeaderApp = () => {
    const imageSiteUrl = import.meta.env.VITE_IMAGE_DIRECTORY;  
    const { translations, isDataLoaded, userSettings, editUserSetting, themes } = useContext(DataContext);  
    const [ showSettingsModal, setShowSettingsModal] = useState(false);
    const [ currentUserSettings, setCurrentUserSettings] = useState({});
    const [ backupUserSettings, setBackupUserSettings] = useState({});
    const navigate =  useNavigate();
   
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

    const GoBack = (e) => {
        e.preventDefault();        
        navigate(-1);
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
            
                 <ModalSettings 
                    isOpen={showSettingsModal}
                    onClose={handlerCancelSettings}
                    title={translations.modalSettingsTitle}
                    subtitle={translations.modalSettingsSubtitle}
                    yesText={translations.modalSettingsYesText}
                    notText={translations.modalSettingsNotText}
                    onClickYes={handlerSaveSettings}
                    onClickNot={handlerCancelSettings}
                    data={data}
                    />
               
            
            
            <img src={`${imageSiteUrl}/Cuadernitoapp50opacity.png`} alt="Cuadernito app" title="Cuadernito app"  className={styles.headerImage}/>

            <HeaderAppButton onClickHandler={GoBack} 
                text={translations.backButton} >
                <PreviousButton />
            </HeaderAppButton>

            <HeaderAppButton url="/" 
                text={translations.headerSettingsButton} 
                onClickHandler = {handlerSettings}>
                <SettingsButton />
            </HeaderAppButton>

            <HeaderAppButton url="/" 
                text={translations.headerListButton} >
                <NotebookButton />
            </HeaderAppButton>
            
            
        </header>
    )
}
export default HeaderApp;