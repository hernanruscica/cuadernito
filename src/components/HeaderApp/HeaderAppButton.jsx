import { Link } from "react-router-dom";
import styles from "./HeaderAppButton.module.css";

const HeaderAppButton = ({ url = "/", text = "", children, onClickHandler=null }) => {
  return (
    <Link to={url} className={styles.NavBarBtn} onClick={onClickHandler}>        
      {children}
        {text}      
    </Link>
  );
};
export default HeaderAppButton;
