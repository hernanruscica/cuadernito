import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import Modal from '../MyModals/Modal';
import styles from './ModalSelectTemplate.module.css';
import { FiFileText, FiShoppingCart, FiBriefcase, FiCheckSquare, FiCode, FiHome, FiBook, FiSun, FiTruck, FiUsers, FiHeart } from 'react-icons/fi';

const iconMap = {
  'list': FiFileText,
  'shopping-cart': FiShoppingCart,
  'suitcase': FiBriefcase,
  'checklist': FiCheckSquare,
  'code': FiCode,
  'home': FiHome,
  'book': FiBook,
  'party': FiSun,
  'truck': FiTruck,
  'office': FiUsers,
  'health': FiHeart,
};

const ModalSelectTemplate = ({ isOpen, onClose, onSelectTemplate, onStartFromScratch }) => {
  const { translations, userSettings, userTemplates } = useContext(DataContext);
  const [showTemplates, setShowTemplates] = useState(false);
  const lang = userSettings.language || 'es';

  const plantillas = [
    { id: 0, name: 'Genérica (en blanco)', nameEn: 'Generic (blank)', icon: 'list' },
    { id: 1, name: 'Lista de compras (supermercado)', nameEn: 'Shopping list (supermarket)', icon: 'shopping-cart', filename: 'supermercado-categorias.json' },
    { id: 2, name: 'Lista de viaje / valija', nameEn: 'Travel list / suitcase', icon: 'suitcase', filename: 'viaje-categorias.json' },
    { id: 3, name: 'Tareas diarias', nameEn: 'Daily tasks', icon: 'checklist', filename: 'tareas-diarias-categorias.json' },
    { id: 4, name: 'Proyecto (software o general)', nameEn: 'Project (software or general)', icon: 'code', filename: 'proyecto-categorias.json' },
    { id: 5, name: 'Limpieza del hogar', nameEn: 'Home cleaning', icon: 'home', filename: 'limpieza-hogar-categorias.json' },
    { id: 6, name: 'Estudio / universidad', nameEn: 'Study / university', icon: 'book', filename: 'estudio-categorias.json' },
    { id: 7, name: 'Organización de evento', nameEn: 'Event planning', icon: 'party', filename: 'evento-categorias.json' },
    { id: 8, name: 'Mudanza', nameEn: 'Moving', icon: 'truck', filename: 'mudanza-categorias.json' },
    { id: 9, name: 'Oficina / librería', nameEn: 'Office / stationery', icon: 'office', filename: 'oficina-categorias.json' },
    { id: 10, name: 'Hábitos y salud', nameEn: 'Habits and health', icon: 'health', filename: 'habitos-salud-categorias.json' },
  ];

  const handleStartFromScratch = () => {
    onStartFromScratch();
    onClose();
  };

  const handleSelectTemplate = (tpl) => {
    onSelectTemplate(tpl);
    onClose();
  };

  const handleBack = () => {
    setShowTemplates(false);
  };

  const t = (key) => translations[key] || key;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!showTemplates ? (
        <>
          <p className="modal-content-paragraph">{t('selectTemplateTitle')}</p>
          <p className={styles.description}>{t('selectTemplateDescription')}</p>
          <div className={styles.choices}>
            <button
              className={`${styles.choiceButton} ${styles.primary}`}
              onClick={handleStartFromScratch}
            >
              <FiFileText className={styles.choiceIcon} />
              <span className={styles.choiceLabel}>{t('startFromScratch')}</span>
            </button>
            <button
              className={`${styles.choiceButton} ${styles.secondary}`}
              onClick={() => setShowTemplates(true)}
            >
              <FiShoppingCart className={styles.choiceIcon} />
              <span className={styles.choiceLabel}>{t('useTemplate')}</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <button className={styles.backButton} onClick={handleBack}>
            ← {translations.backButton || 'Back'}
          </button>
          <p className="modal-content-paragraph">{t('useTemplate')}</p>
          <div className={styles.templateGrid}>
            {plantillas.map(tpl => {
              const Icon = iconMap[tpl.icon] || FiFileText;
              const displayName = lang === 'en' ? tpl.nameEn : tpl.name;
              return (
                <button
                  key={tpl.id}
                  className={styles.templateCard}
                  onClick={() => handleSelectTemplate(tpl)}
                >
                  <Icon className={styles.templateIcon} />
                  <span className={styles.templateName}>{displayName}</span>
                </button>
              );
            })}
          </div>
          {userTemplates.length > 0 && (
            <>
              <p className={styles.sectionTitle}>{t('myTemplates')}</p>
              <div className={styles.templateGrid}>
                {userTemplates.map(tpl => {
                  const Icon = iconMap[tpl.icon] || FiFileText;
                  const displayName = lang === 'en' ? (tpl.nameEn || tpl.name) : tpl.name;
                  return (
                    <button
                      key={tpl.id}
                      className={styles.templateCard}
                      onClick={() => handleSelectTemplate(tpl)}
                    >
                      <Icon className={styles.templateIcon} />
                      <span className={styles.templateName}>{displayName}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalSelectTemplate;
