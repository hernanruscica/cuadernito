import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import Modal from '../MyModals/Modal';
import ModalButton from '../ModalButton/ModalButton';
import { FiSave, FiXCircle, FiFileText, FiShoppingCart, FiBriefcase, FiCheckSquare, FiCode, FiHome, FiBook, FiSun, FiTruck, FiUsers, FiHeart } from 'react-icons/fi';
import styles from './SaveTemplateModal.module.css';

const iconOptions = [
  { key: 'list', icon: FiFileText },
  { key: 'shopping-cart', icon: FiShoppingCart },
  { key: 'suitcase', icon: FiBriefcase },
  { key: 'checklist', icon: FiCheckSquare },
  { key: 'code', icon: FiCode },
  { key: 'home', icon: FiHome },
  { key: 'book', icon: FiBook },
  { key: 'party', icon: FiSun },
  { key: 'truck', icon: FiTruck },
  { key: 'office', icon: FiUsers },
  { key: 'health', icon: FiHeart },
];

const SaveTemplateModal = ({ isOpen, onClose, listCategories, currentTemplateId }) => {
  const { translations, userSettings, userTemplates, addUserTemplate, updateUserTemplate, addToast } = useContext(DataContext);
  const lang = userSettings.language || 'es';

  const existingTemplate = userTemplates.find(t => t.id === currentTemplateId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('list');

  useEffect(() => {
    if (isOpen && existingTemplate) {
      setName(lang === 'en' ? (existingTemplate.nameEn || existingTemplate.name) : existingTemplate.name);
      setDescription(lang === 'en' ? (existingTemplate.descriptionEn || existingTemplate.description || '') : (existingTemplate.description || ''));
      setSelectedIcon(existingTemplate.icon || 'list');
    } else if (isOpen) {
      setName('');
      setDescription('');
      setSelectedIcon('list');
    }
  }, [isOpen, existingTemplate, lang]);

  const buildTemplate = () => ({
    id: Date.now(),
    name: name.trim(),
    nameEn: lang === 'en' ? name.trim() : '',
    description: lang === 'es' ? description.trim() : '',
    descriptionEn: lang === 'en' ? description.trim() : '',
    icon: selectedIcon,
    categories: listCategories.map(c => ({ ...c })),
  });

  const handleSaveAsNew = () => {
    if (name.trim() === '') return;
    addUserTemplate(buildTemplate());
    addToast(translations.toastTemplateSaved);
    reset();
  };

  const handleUpdate = () => {
    if (name.trim() === '' || !existingTemplate) return;
    const updated = buildTemplate();
    updated.id = existingTemplate.id;
    updateUserTemplate(existingTemplate.id, updated);
    addToast(translations.toastTemplateUpdated);
    reset();
  };

  const reset = () => {
    setName('');
    setDescription('');
    setSelectedIcon('list');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="modal-content-paragraph">{translations.saveTemplateTitle}</p>

      <p className={styles.info}>
        {listCategories.length} {translations.saveTemplateCategoriesCount}
      </p>

      <label className={styles.label}>{translations.saveTemplateNameLabel}</label>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={translations.saveTemplateNameLabel}
      />

      <label className={styles.label}>{translations.saveTemplateDescriptionLabel}</label>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={translations.saveTemplateDescriptionLabel}
        rows={3}
      />

      <label className={styles.label}>Icono / Icon</label>
      <div className={styles.iconGrid}>
        {iconOptions.map(({ key, icon: Icon }) => (
          <button
            key={key}
            className={`${styles.iconBtn} ${selectedIcon === key ? styles.iconBtnSelected : ''}`}
            onClick={() => setSelectedIcon(key)}
          >
            <Icon className={styles.iconSvg} />
          </button>
        ))}
      </div>

      <div className="buttons-container">
        <ModalButton onClickHandler={onClose} text="cancelar">
          <FiXCircle />
        </ModalButton>
        {existingTemplate ? (
          <>
            <ModalButton onClickHandler={handleUpdate} text={translations.updateTemplate}>
              <FiSave />
            </ModalButton>
            <ModalButton onClickHandler={handleSaveAsNew} text={translations.saveAsNewTemplate}>
              <FiSave />
            </ModalButton>
          </>
        ) : (
          <ModalButton onClickHandler={handleSaveAsNew} text={translations.saveTemplateButton}>
            <FiSave />
          </ModalButton>
        )}
      </div>
    </Modal>
  );
};

export default SaveTemplateModal;
