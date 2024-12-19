import { Link } from "react-router-dom";
import styles from "./HeaderAppButton.module.css";

const HeaderAppButton = ({ url = "/", text = "", side = "left", children }) => {
  return (
    <Link to={url} className={styles.linkContainer}>
      {
        (side == 'left') ?      
        <>{children}{text}</>
        : <>{text}{children}</>
      }
    </Link>
  );
};
export default HeaderAppButton;
