import { useState, useEffect, useContext, useRef } from 'react';
import ModalButton from '../ModalButton/ModalButton';
import { FiXCircle, FiTag, FiSave } from 'react-icons/fi';
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
  setItemCategory
}) => {
  const { translations, addCategory, editItemFromList, categories, categoriesColors } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(categoriesColors[0]);
  const [selectedColorId, setSelectedColorId] = useState(categoriesColors[1]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const listRef = useRef(null);

  // Al montar, si existe una categoría asignada, se la toma como categoría actual y el input inicia en blanco.
  useEffect(() => {
    if (itemCategory) {
      setSelectedCategory(itemCategory);
      setSearchTerm('');
    }
  }, [itemCategory]);

  // Reordena las categorías: las que coinciden con la búsqueda aparecen primero, pero el resto permanece visible.
  const sortedCategories = searchTerm
    ? [
        ...categories.filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...categories.filter(
          (cat) =>
            !cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ]
    : categories;

    const handleClickNewCatColor = ({key, data}) => {    
        setSelectedColorId(key);    
        setSelectedColor(data);       
    }

  // Crear nueva categoría
  const handleCreateCategory = () => {
    if (newCategoryName.trim() === '') return;
    const newCat = {
      id: Date.now(),  
      name: newCategoryName,
      colorId: selectedColorId
    };
    addCategory(newCat);
    setSelectedCategory(newCat);
    setSearchTerm(newCat.name);
    setShowNewCategory(false);
    setNewCategoryName('');
    setSelectedColor('#ffffff');
    // Hacer scroll al tope de la lista
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  // Al hacer click en una categoría existente, se selecciona y se hace scroll hacia arriba
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category.name);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  const updateData = () => {    
    const editedItem = {
      ...item,
      categoryId: selectedCategory.id,      
    }
    editItemFromList(listId, item.id, editedItem);    
    setItemCategory(selectedCategory);
    console.log(listId, item.id, editedItem);
  }

  const handleSave = () => {
    console.log('Update categoryId from item:', selectedCategory.id);
    updateData();
    onClose();
  };

const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)    
    if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
} 


  // La categoría actual es la seleccionada o la asignada inicialmente.
  const currentCategory = selectedCategory || itemCategory;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="modal-content-paragraph">Change category</p>

      {/* Input de búsqueda que inicia en blanco */}
      <input
        className={styles.modalChangeCatInput}
        type="text"
        placeholder="Buscar categoría"
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />

      {/* Lista de categorías reordenada: las que coinciden aparecen primero */}
      <ul className={styles.modalChangeCatCategoriesDropdown} ref={listRef}>
        {sortedCategories.map((category, index) => (
          <li
            key={index}
            style={{
              backgroundColor: categoriesColors[category.colorId],
              border:
                currentCategory && category.name === currentCategory.name
                  ? '3px solid black'
                  : 'none',
            }}
            onClick={() => handleSelectCategory(category)}
          >
            <FiTag /> {category.name}
          </li>
        ))}
      </ul>

      <label className={styles.modalChangeCatLabel} htmlFor='showNewCategory'>
        Do you want to create a new category?
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
          <input
            className={styles.modalChangeCatNewInput}
            type="text"
            placeholder="Input a new category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            style={{backgroundColor: selectedColor}}
          />

          <FiTag className={styles.modalChangeCatNewInputIcon}/>

          <div className={styles.modalChangeCatColors}>
          {/* Object.entries(courseTypes).map(([key, data])  */}
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
            Create new category
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
    </Modal>
  );
};
