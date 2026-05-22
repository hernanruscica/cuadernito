import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./HelpPage.module.css";

function HelpPage() {
  const { translations, userSettings } = useContext(DataContext);
  const lang = userSettings.language || "es";
  const t = translations[lang] || translations;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.helpTutorialTitle}</h2>
        <div className={styles.content}>
          {lang === "es" ? (
            <>
              <p><strong>Crear una lista:</strong> Presioná el botón "Nueva lista" en la pantalla de listas y elegí una plantilla o empezá desde cero.</p>
              <p><strong>Agregar items:</strong> Dentro de una lista, escribí el nombre del item y presioná Enter o el botón +.</p>
              <p><strong>Editar items:</strong> Hacé clic en el nombre del item para editarlo directamente.</p>
              <p><strong>Reordenar:</strong> Arrastrá los items para cambiar su orden.</p>
              <p><strong>Categorías:</strong> Arrastrá un item sobre el área de categorías para cambiarla.</p>
              <p><strong>Eliminar:</strong> Arrastrá un item al área de papelera o usá el botón de eliminar.</p>
            </>
          ) : (
            <>
              <p><strong>Create a list:</strong> Press the "New list" button on the lists screen and choose a template or start from scratch.</p>
              <p><strong>Add items:</strong> Inside a list, type the item name and press Enter or the + button.</p>
              <p><strong>Edit items:</strong> Click on the item name to edit it inline.</p>
              <p><strong>Reorder:</strong> Drag items to change their order.</p>
              <p><strong>Categories:</strong> Drag an item over the category area to change it.</p>
              <p><strong>Delete:</strong> Drag an item to the trash area or use the delete button.</p>
            </>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.helpFAQTitle}</h2>
        <div className={styles.content}>
          {lang === "es" ? (
            <>
              <p><strong>¿Cómo cambio el tema?</strong> Andá a Ajustes (engranaje) en la barra inferior y seleccioná un tema.</p>
              <p><strong>¿Cómo cambio el idioma?</strong> En Ajustes podés cambiar entre Español e Inglés.</p>
              <p><strong>¿Se guardan mis datos?</strong> Sí, todo se guarda automáticamente en tu navegador.</p>
              <p><strong>¿Puedo usar plantillas?</strong> Sí, al crear una lista nueva podés elegir entre varias plantillas.</p>
            </>
          ) : (
            <>
              <p><strong>How do I change the theme?</strong> Go to Settings (gear icon) in the bottom bar and select a theme.</p>
              <p><strong>How do I change the language?</strong> In Settings you can switch between English and Spanish.</p>
              <p><strong>Is my data saved?</strong> Yes, everything is saved automatically in your browser.</p>
              <p><strong>Can I use templates?</strong> Yes, when creating a new list you can choose from several templates.</p>
            </>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.helpVersionTitle}</h2>
        <p className={styles.versionText}>Cuadernito App v1.0.0</p>
      </section>
    </div>
  );
}

export default HelpPage;
