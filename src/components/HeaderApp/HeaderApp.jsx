

import styles from './HeaderApp.module.css';
import PreviousButton from "../Buttons/PreviousButton";
import NextButton from '../Buttons/NextButton';
import HeaderAppButton from "./HeaderAppButton";

const HeaderApp = () => {
    
    return(
        <header className={styles.container}>
            
            <HeaderAppButton url="/" 
                text="Go back" side="left">
                <PreviousButton />
            </HeaderAppButton>
            
            <HeaderAppButton url="/lists" 
                text="Lists" side="right">
                <NextButton />
            </HeaderAppButton>
            
        </header>
    )
}
export default HeaderApp;