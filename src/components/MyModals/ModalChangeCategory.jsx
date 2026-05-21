import { useState, useEffect, useContext, useRef } from 'react';
import ModalButton from '../ModalButton/ModalButton';
import { FiXCircle, FiTag, FiSave, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import './Modal.css';
import styles from './ModalChangeCategory.module.css';
import { DataContext } from "../../context/DataContext";

export const ModalChangeCategory = ({
  isOpen,
  onClose,
  item,
  listId,
  itemCategory = null,
  setItemCategory,
  onSave,
  listCategories = []
}) => {
  const { translations, addListCategory, editListCategory, deleteListCategory, editItemFromList, categoriesColors, addToast, userSettings } = useContext(DataContext);

  const catName = (cat) => {
    const lang = userSettings.language || 'es';
    return lang === 'en' ? (cat.nameEn || cat.name) : cat.name;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(categoriesColors[0]);
  const [selectedColorId, setSelectedColorId] = useState(categoriesColors[1]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryColorId, setEditCategoryColorId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const listRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (showNewCategory && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }, [showNewCategory]);

  useEffect(() => {
    if (isOpen) {
      setShowNewCategory(false);
      setNewCategoryName('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (itemCategory) {
      setSelectedCategory(itemCategory);
      setSearchTerm('');
    }
  }, [itemCategory]);

  const sortedCategories = searchTerm
  ? listCategories
      .filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.nameEn && cat.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => catName(a).localeCompare(catName(b)))
  : [...listCategories].sort((a, b) => catName(a).localeCompare(catName(b)));

const currentValid = (selectedCategory && listCategories.some(c => c.id === selectedCategory.id) ? selectedCategory : null)
  || (itemCategory && listCategories.some(c => c.id === itemCategory.id) ? itemCategory : null);
const finalCategories = currentValid
  ? [currentValid, ...sortedCategories.filter(cat => cat.id !== currentValid.id)]
  : sortedCategories;

    const handleClickNewCatColor = ({key, data}) => {
        setSelectedColorId(key);
        setSelectedColor(data);
    }

  const handleCreateCategory = () => {
    if (newCategoryName.trim() === '') return;
    const newCat = {
      id: Date.now(),
      name: newCategoryName,
      colorId: selectedColorId
    };
    addListCategory(listId, newCat);
    addToast(translations.toastCategoryCreated);
    setSelectedCategory(newCat);
    setSearchTerm(catName(newCat));
    setShowNewCategory(false);
    setNewCategoryName('');
    setSelectedColor('#ffffff');
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(catName(category));
    setShowNewCategory(false);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  const handleStartEdit = (category) => {
    setEditingCategory(category);
    setEditCategoryName(catName(category));
    setEditCategoryColorId(category.colorId);
    setShowNewCategory(false);
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
    setEditCategoryColorId(null);
    setShowEditModal(false);
  };

  const handleSaveEditCategory = () => {
    if (editCategoryName.trim() === '') return;
    const lang = userSettings.language || 'es';
    const updates = { colorId: editCategoryColorId };
    if (lang === 'en') {
      updates.nameEn = editCategoryName.trim();
    } else {
      updates.name = editCategoryName.trim();
    }
    editListCategory(listId, editingCategory.id, updates);
    addToast(translations.toastCategoryEdited);
    setSelectedCategory({ ...editingCategory, ...updates });
    setSearchTerm(editCategoryName.trim());
    handleCancelEdit();
  };

  const handleDeleteCategory = () => {
    deleteListCategory(listId, editingCategory.id);
    addToast(translations.toastCategoryDeleted);
    const sinCategoria = listCategories.find(c => c.id === 0) || { id: 0, name: 'Sin categoría', colorId: '0' };
    if (selectedCategory && selectedCategory.id === editingCategory.id) {
      setSelectedCategory(sinCategoria);
      setSearchTerm('');
    }
    if (itemCategory && itemCategory.id === editingCategory.id && setItemCategory) {
      setItemCategory(sinCategoria);
    }
    handleCancelEdit();
  };

  const updateData = () => {
    const editedItem = {
      categoryId: selectedCategory.id,
    }
    editItemFromList(listId, item.id, editedItem);
    addToast(translations.toastCategoryChanged);
    setItemCategory(selectedCategory);
  }

  const handleSave = () => {
    if (onSave) {
      onSave(selectedCategory);
    } else {
      updateData();
    }
    onClose();
  };

const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
    if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
}

  const currentCategory = currentValid;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="modal-content-paragraph">{translations.changeCategoryTitle}</p>

      <label className={styles.modalChangeCatLabelSearch}>{translations.searchCategoryPlaceholder}</label>
      <input
        className={styles.modalChangeCatInput}
        type="text"
        placeholder={translations.searchCategoryPlaceholder}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />

      <ul className={styles.modalChangeCatCategoriesDropdown} ref={listRef}>
        {finalCategories.map((category, index) => (
          <li
            key={index}
            style={{
              backgroundColor: categoriesColors[category.colorId],
              border:
                currentCategory && category.id === currentCategory.id
                  ? '3px solid black'
                  : 'none',
            }}
            onClick={() => handleSelectCategory(category)}
          >
            <FiTag /> <span style={{ flex: 1 }}>{catName(category)}</span>
            {category.id !== 0 && (
              <button
                className={styles.editCatBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartEdit(category);
                }}
              >
                <FiEdit2 />
              </button>
            )}
          </li>
        ))}
      </ul>

      {showEditModal && editingCategory && (
        <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
          <p className="modal-content-paragraph">{translations.editCategoryTitle}</p>

          <div style={{ position: 'relative' }}>
            <input
              className={styles.modalChangeCatEditInput}
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              style={{ backgroundColor: categoriesColors[editCategoryColorId] }}
            />
            <FiTag className={styles.modalChangeCatNewInputIcon} />
          </div>

          <div className={styles.modalChangeCatColors}>
            {Object.entries(categoriesColors).map(([key, data]) => (
              <button
                key={key}
                className={styles.modalChangeCatColorBtn}
                style={{
                  backgroundColor: data,
                  border: editCategoryColorId == key ? '2px solid #333' : 'none',
                }}
                onClick={() => setEditCategoryColorId(key)}
              />
            ))}
          </div>
          <div className={styles.modalChangeCatEditButtons}>
            <button
              className={styles.modalChangeCatCreateBtn}
              onClick={handleSaveEditCategory}
            >
              {translations.editCategorySaveButton}
            </button>
            <button
              className={styles.modalChangeCatDeleteBtn}
              onClick={handleDeleteCategory}
            >
              <FiTrash2 /> {translations.editCategoryDeleteButton}
            </button>
          </div>
        </Modal>
      )}

      <label className={styles.modalChangeCatLabel} htmlFor='showNewCategory'>
        {translations.createNewCategoryAnswer}
        <input
          id='showNewCategory'
          type="checkbox"
          checked={showNewCategory}
          className={styles.modalChangeCatLabelCheckbox}
          onChange={() => setShowNewCategory(!showNewCategory)}
        />
      </label>

      {showNewCategory && (
        <div className={styles.modalChangeCatNewWrapper}>
          <label className={styles.modalChangeCatLabelSearch}>{translations.inputNewCategoryNamePlaceholder}</label>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.modalChangeCatNewInput}
              type="text"
              placeholder={translations.inputNewCategoryNamePlaceholder}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{backgroundColor: selectedColor}}
            />
            <FiTag className={styles.modalChangeCatNewInputIcon}/>
          </div>

          <div className={styles.modalChangeCatColors}>
            {Object.entries(categoriesColors).map(([key, data]) => (
              <button
                key={key}
                className={styles.modalChangeCatColorBtn}
                style={{
                  backgroundColor: data,
                  border: selectedColor === data ? '2px solid #333' : 'none',
                }}
                onClick={() => handleClickNewCatColor({key, data})}
              />
            ))}
          </div>
          <button
            className={styles.modalChangeCatCreateBtn}
            onClick={handleCreateCategory}
          >
           {translations.createNewCategoryButton}
          </button>
        </div>
      )}

      <div className="buttons-container">
        <ModalButton onClickHandler={onClose} text="cancelar">
          <FiXCircle />
        </ModalButton>
        <ModalButton onClickHandler={handleSave} text={translations.rowButtonSave}>
          <FiSave />
        </ModalButton>
      </div>
      <div ref={bottomRef} />
    </Modal>
  );
};
