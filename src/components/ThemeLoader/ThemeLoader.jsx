import { useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

function ThemeLoader() {
  const { userSettings, themes, isDataLoaded } = useContext(DataContext);

  const publicUrl = import.meta.env.VITE_APP_URL;

  useEffect(() => {   
    
    if (!isDataLoaded) return;    
   
    const currentTheme = themes.find(
      (theme) => theme.id == userSettings.themeId
    );
    
    if (currentTheme) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = `${publicUrl}/themes/${currentTheme.name.toLowerCase()}_theme.css`; 
      link.id = "theme-stylesheet";      
      
      // Verifica si ya existe un enlace de tema y reemplázalo
      const existingLink = document.getElementById("theme-stylesheet");
      if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
      }

      // Agrega el nuevo enlace al <head>
      document.head.appendChild(link);
    }
  }, [userSettings.themeId, themes, isDataLoaded]);


  return null; 
}

export default ThemeLoader;
