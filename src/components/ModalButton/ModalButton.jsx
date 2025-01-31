import { Link } from "react-router-dom";
import styles from "./ModalButton.module.css";

const ModalButton = ({ url = "/", text = "", children, onClickHandler=null }) => {
  return (
    <button to={url} className={styles.NavBarBtn} onClick={onClickHandler}>        
      {children}
        {text}      
    </button>
  );
};
export default ModalButton;
