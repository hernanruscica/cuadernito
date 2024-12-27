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
   
    const handlerSettings = (e) => {
        e.preventDefault();
        console.log('click on settings button !');
        setShowSettingsModal(!showSettingsModal);
    }

    const handlerSelectThemeChange = (e) => {
        console.log(`click en el select theme - Value: ${e.target.value}`);
        setCurrentUserSettings(
            {
                ...currentUserSettings,
                themeId: e.target.value
            }
        )
        //editUserSetting(updatedSetting);
    }
    const handlerSaveSettings = () => {
        console.log('Click on save settings button', currentUserSettings);
        editUserSetting(currentUserSettings);
        setShowSettingsModal(!showSettingsModal);
    }

    const handlerCancelSettings = () => {
        setCurrentUserSettings(userSettings);
        setShowSettingsModal(false);
    }
    
    
    useEffect(() => {
        if (isDataLoaded){
            setCurrentUserSettings(userSettings);
        }
    }, [isDataLoaded]);
    
    if (!isDataLoaded){
        return (
          <div>cargando...</div>
        )
      }

    

    const data = {
        themes: themes,
        userSettings: currentUserSettings,
        setThemeHandler: handlerSelectThemeChange
    }
    
    return(
        <header className={styles.container}>

            {
                (showSettingsModal)
                ? <ModalSettings 
                    title='Preferencias'
                    subtitle='Aquí puedes editar tus preferencias de aplicación.'
                    yesText='Guardar'
                    notText='Cancelar'
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