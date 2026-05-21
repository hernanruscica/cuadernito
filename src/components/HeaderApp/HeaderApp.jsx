import styles from './HeaderApp.module.css';
import SettingsButton from "../Buttons/SettingsButton";
import NotebookButton from '../Buttons/NotebookButton';
import PreviousButton from '../Buttons/PreviousButton';
import HeaderAppButton from "./HeaderAppButton";
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { ModalSettings } from '../MyModals/ModalSettings';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderApp = () => {
    const imageSiteUrl = import.meta.env.VITE_IMAGE_DIRECTORY;  
    const { translations, isDataLoaded, userSettings, editUserSetting, themes, addToast } = useContext(DataContext);  
    const [ showSettingsModal, setShowSettingsModal] = useState(false);
    const [ currentUserSettings, setCurrentUserSettings] = useState({});
    const [ backupUserSettings, setBackupUserSettings] = useState({});
    const navigate =  useNavigate();
    const location = useLocation();

    const handlerSettings = (e) => {
        e.preventDefault();        
        setBackupUserSettings(userSettings);
        setShowSettingsModal(!showSettingsModal);
    }

    const GoBack = (e) => {
        e.preventDefault();
        const path = location.pathname;

        if (path === '/') return;

        const itemMatch = path.match(/^\/lists\/(\d+)\/items\/\d+$/);
        if (itemMatch) {
            navigate(`/lists/${itemMatch[1]}`);
            return;
        }

        const listMatch = path.match(/^\/lists\/(\d+)$/);
        if (listMatch) {
            navigate('/');
            return;
        }

        navigate(-1);
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

    const handlerSaveSettings = (e) => {        
        e.preventDefault();
        setShowSettingsModal(!showSettingsModal);
        addToast(translations.toastSettingsSaved);
    }

    const handlerCancelSettings = (e) => {    
        e.preventDefault();
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
            <ModalSettings 
            isOpen={showSettingsModal}
            onClose={handlerCancelSettings}
            title={translations.modalSettingsTitle}
            subtitle={translations.modalSettingsSubtitle} 
            onClickYes={handlerSaveSettings}                    
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