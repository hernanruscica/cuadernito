import { useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

function ThemeLoader() {
  const { userSettings, themes, isDataLoaded } = useContext(DataContext);

  const publicUrl = 'https://cuadernito.onrender.com';
  //const publicUrl = 'http://localhost:5173';

  useEffect(() => {
   
    
    if (!isDataLoaded) return;
    
    // Busca el tema actual en función del `themeId`
    const currentTheme = themes.find(
      (theme) => theme.id == userSettings.themeId
    );
    
    if (currentTheme) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = `${publicUrl}/themes/${currentTheme.name.toLowerCase()}_theme.css`; // Ajusta la ruta según tus archivos
      link.id = "theme-stylesheet";
      
      console.log(link.href)
      // Verifica si ya existe un enlace de tema y reemplázalo
      const existingLink = document.getElementById("theme-stylesheet");
      if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
      }

      // Agrega el nuevo enlace al <head>
      document.head.appendChild(link);
    }
  }, [userSettings.themeId, themes, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    console.log("Datos cargados, aplicando tema:", userSettings.themeId);
  }, [isDataLoaded]);

  return null; // Este componente no renderiza nada
}

export default ThemeLoader;
