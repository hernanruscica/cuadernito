import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import styles from "./SplashHome.module.css";

function SplashHome() {
  const { translations, userSettings } = useContext(DataContext);
  const navigate = useNavigate();
  const imageSiteUrl = import.meta.env.VITE_IMAGE_DIRECTORY;
  const lang = userSettings.language || "es";
  const t = translations[lang] || translations;

  return (
    <div className={styles.container}>
      <img
        src={`${imageSiteUrl}/Cuadernitoapp.png`}
        alt="Cuadernito app"
        className={styles.logo}
      />
      <h1 className={styles.title}>{t.appName}</h1>
      <p className={styles.description}>{t.splashDescription}</p>
      <button
        className={styles.startButton}
        onClick={() => navigate("/lists")}
      >
        {t.splashButton}
      </button>
      <a
        className={styles.helpLink}
        href={lang === "es" ? "/ayuda" : "/help"}
        onClick={(e) => {
          e.preventDefault();
          navigate(lang === "es" ? "/ayuda" : "/help");
        }}
      >
        {lang === "es" ? "¿Cómo usar Cuadernito?" : "How to use Cuadernito?"}
      </a>
    </div>
  );
}

export default SplashHome;
