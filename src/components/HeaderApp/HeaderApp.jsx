import styles from './HeaderApp.module.css';
import SettingsButton from "../Buttons/SettingsButton";
import NotebookButton from '../Buttons/NotebookButton';
import HeaderAppButton from "./HeaderAppButton";
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { ModalSettings } from '../Modals/ModalConfirm/ModalSettings';

const HeaderApp = () => {
    const { translations, isDataLoaded, userSettings, themes } = useContext(DataContext);  
    const [ showSettingsModal, setShowSettingsModal] = useState(false);
   
    const handlerSettings = (e) => {
        e.preventDefault();
        console.log('click on settings button !');
        setShowSettingsModal(!showSettingsModal);
    }

    if (!isDataLoaded){
        return (
          <div>cargando...</div>
        )
      }

      console.log(themes)
    const data = {
        themes: themes,
        userSettings: userSettings
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
                    onClickNot={()=>{setShowSettingsModal(false)}}
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