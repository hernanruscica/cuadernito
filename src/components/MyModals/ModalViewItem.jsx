import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ModalButton from "../ModalButton/ModalButton";
import EditButton from "../Buttons/EditButton";
import { FiTrash2, FiSave   } from "react-icons/fi";
import Modal from './Modal';
import "./Modal.css";
import { ModalConfirm } from "./ModalConfirm";

import { ModalChangeCategory } from "./ModalChangeCategory";
import CategoryTag from "../CategoryTag/CategoryTag";

const ModalViewItem = ({ isOpen, onClose, item, listId, addToast=null }) => {
  const {editItemFromList, deleteItemFromList, translations, categoriesColors } = useContext(DataContext);
  const [inputValueName, setInputValueName] = useState('');
  const inputValueNameRef = useRef(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);  
  const [isChangeCategoryOpen, setIsChangeCategoryOpen] = useState(false);
  const [itemCategory, setItemCategory] = useState({});
  
  useEffect(() => {
    if (isOpen && inputValueNameRef.current) {
      setTimeout(() => {
        inputValueNameRef.current.focus();
      }, 0);
    }
    setInputValueName(item?.name);
  }, [isOpen]);

  useEffect(() => {
    setInputValueName(item?.name);
    if (item && listId) {
      setItemCategory({ id: item.categoryId, name: '', colorId: '0' });
    }
  }, [item, listId]);

  const handleDelete = (e) => {
    e.preventDefault();    
    setIsDeleteConfirmationOpen(true);
  }

  const handleConfirmDelete = (e) => {
    e.preventDefault();   
    deleteItem()
    setIsDeleteConfirmationOpen(false);
    onClose(); 
  }

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setIsDeleteConfirmationOpen(false);
  }

  const handleClickChangeCategory = (e) => {
    
    e.preventDefault();
    setIsChangeCategoryOpen(true);
  }
  const handleCancelChangeCategory = () => {
    
    setIsChangeCategoryOpen(false);
  }
  
  const handleSave = () => {   
    if (inputValueName && inputValueName.trim() !== "") {      
      updateData();
    } 
      onClose(); 
    }
    
  const handlerEditName = (e) => {
    e.preventDefault();
    if (inputValueNameRef.current){
      inputValueNameRef.current.focus();
      inputValueNameRef.current.select();
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter'){           
      updateData();
      onClose(); 
    }
    
  }

  const handleInputChange = (e) => {
    setInputValueName(e.target.value);
  }

  const deleteItem = () => {
    deleteItemFromList(listId, item.id);        
    onClose();    
    addToast(translations.toastItemDeleted);
  }

  const updateData = () => {    
    const editedItem = {
      ...item,
      name: inputValueName,      
      categoryId: itemCategory.id
    }
    editItemFromList(listId, item.id, editedItem);
   
  }  

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="modal-content-paragraph">{translations.ViewItemTitle}</p>
          <div className="inputs-container">
            <div className="input-button">
              <EditButton onClick={handlerEditName}/>
              <input
                type="text"
                className="input"
                value={inputValueName || ''}
                onChange={handleInputChange}                
                onKeyUp={handleKeyUp}
                ref={inputValueNameRef}
              />
            </div>
          </div>
          <div className="inputs-container">                        
            <label htmlFor="change_category_tag" ></label>
            <CategoryTag 
              text={`Cambiar  [${itemCategory.name || 'sin categoría'}]`}
              color={categoriesColors[itemCategory.colorId] || '#fff'}
              onClick={handleClickChangeCategory}
              name="change_category_tag"
            />

          </div>

          <div className="buttons-container">
            <ModalButton onClickHandler={handleDelete}
                text={translations.rowButtonDelete} >
                <FiTrash2 />
            </ModalButton>
            <ModalButton onClickHandler={handleSave}
                text={translations.rowButtonSave} >
                <FiSave />
            </ModalButton>
          </div>            
    </Modal>

    <ModalConfirm 
      title={translations.deleteItemConfirmMsg}
      itemName={item?.name}
      onClickNot={handleCancelDelete}
      onClickYes={handleConfirmDelete}
      notText={translations.deleteItemNotText}
      yesText={translations.deleteItemYesText}
      isOpen={isDeleteConfirmationOpen} onClose={handleCancelDelete}
    />
    <ModalChangeCategory 
      title="Change Category modal"
      isOpen={isChangeCategoryOpen}      
      listId={listId}
      item={item}
      itemCategory={itemCategory}
      setItemCategory={setItemCategory}
      onClose={handleCancelChangeCategory}
    />
    </>
  );
};

export default ModalViewItem;
