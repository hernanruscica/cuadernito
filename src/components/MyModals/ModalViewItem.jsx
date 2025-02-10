import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ModalButton from "../ModalButton/ModalButton";
import EditButton from "../Buttons/EditButton";
import { FiTrash2, FiSave   } from "react-icons/fi";
import Modal from './Modal';
import "./Modal.css";
import { ModalConfirm } from "./ModalConfirm";

import ChangeCategoryButton from "../ChangeCategoryButton/ChangeCategoryButton";
import { ModalChangeCategory } from "./ModalChangeCategory";

const ModalViewItem = ({ isOpen, onClose, item, listId, addToast=null }) => {
  const {editItemFromList, deleteItemFromList, translations } = useContext(DataContext);
  const [inputValueName, setInputValueName] = useState('');
  const inputValueNameRef = useRef(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);  
  const [isChangeCategoryOpen, setIsChangeCategoryOpen] = useState(false);
  
  // Focus and select text on modal open (adjusted to handle re-renders)
  useEffect(() => {
    if (isOpen && inputValueNameRef.current) {
      setTimeout(() => {
        inputValueNameRef.current.focus();
        // inputValueNameRef.current.select();
      }, 0);
    }
    setInputValueName(item?.name);
  }, [isOpen]);

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
    console.log('click change category');
    e.preventDefault();
    setIsChangeCategoryOpen(true);
  }
  const handleCancelChangeCategory = (e) => {
    e.preventDefault();
    setIsChangeCategoryOpen(false);
  }
  
  const handleSave = () => {
    // console.log('click en guardar')    
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
    }
    editItemFromList(listId, item.id, editedItem);
  }



  useEffect(() => {
    setInputValueName(item?.name);
  }, [item]);

  

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <ChangeCategoryButton 
              text={'Change Category'}
              onClick={handleClickChangeCategory}
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

    {/* Delete Confirmation Modal */}        
    <ModalConfirm 
      title={translations.deleteItemConfirmMsg}
      itemName={item?.name}
      onClickNot={handleCancelDelete}
      onClickYes={handleConfirmDelete}
      notText={translations.deleteItemNotText}
      yesText={translations.deleteItemYesText}
      isOpen={isDeleteConfirmationOpen} onClose={handleCancelDelete}
    />
    {/* Change category Modal */}        
    <ModalChangeCategory 
      title="Change Category modal"
      isOpen={isChangeCategoryOpen}
      onClose={handleCancelChangeCategory}
    />
    </>
  );
};

export default ModalViewItem;