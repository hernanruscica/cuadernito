import { Link } from "react-router-dom";
import styles from "./HeaderAppButton.module.css";

const HeaderAppButton = ({ url = "/", text = "", children, onClickHandler=null }) => {
  return (
    <Link to={url} className={styles.linkContainer} onClick={onClickHandler}>
      
        {text}{children}
      
    </Link>
  );
};
export default HeaderAppButton;
