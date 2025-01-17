import "./Modal.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { FiXCircle } from "react-icons/fi";
import SaveButton from '../Buttons/SaveButton';
import DeleteButton from "../Buttons/DeleteButton";
import HeaderAppButton from "../HeaderApp/HeaderAppButton";
import EditButton from "../Buttons/EditButton";
import Modal from './Modal';

const ModalViewItem = ({ isOpen, onClose, item, listId, addToast=null }) => {
  const { lists, isDataLoaded, editItemFromList, deleteItemFromList, translations } = useContext(DataContext);
  const [inputValueName, setInputValueName] = useState(item?.name);
  const inputValueNameRef = useRef(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const navigate = useNavigate();
  // Focus and select text on modal open (adjusted to handle re-renders)
  useEffect(() => {
    if (isOpen && inputValueNameRef.current) {
      setTimeout(() => {
        inputValueNameRef.current.focus();
        inputValueNameRef.current.select();
      }, 0);
    }
  }, [isOpen]);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('delete?')
    setIsDeleteConfirmationOpen(true);
  }

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    //console.log('Deleting item:', item?.name);
    // Here you would typically call the deleteItemFromList function
    deleteItem()
    setIsDeleteConfirmationOpen(false);
    onClose(); // Close the main modal after deletion
  }

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setIsDeleteConfirmationOpen(false);
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (inputValueName && inputValueName.trim() !== "") {
      console.log('Saving item with name:', inputValueName);
      // Here you would typically call the editItemFromList function
    } 
    updateData();
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
      console.log(`se presiono enter`);     
      updateData();
      onClose(); 
    }
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

  const handleInputClick = (e) => {
    e.target.select();
  };

  return (
    <>
      <div className={`modal-backdrop ${isOpen ? "show" : ""}`} onClick={onClose}>
        <div
          className={`modal-content ${isOpen ? "slide-in" : "slide-out"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
              <FiXCircle />
          </button>

          <div className="inputs-container">
            <div className="input-button">
              <EditButton onClick={handlerEditName}/>
              <input
                type="text"
                className="input"
                value={inputValueName}
                onChange={(e) => setInputValueName(e.target.value)}
                onClick={handleInputClick}
                onKeyUp={handleKeyUp}
                ref={inputValueNameRef}
              />
            </div>
          </div>

          <div className="buttons-container">
            <HeaderAppButton onClickHandler={handleDelete}
                text={translations.rowButtonDelete} >
                <DeleteButton />
            </HeaderAppButton>
            <HeaderAppButton onClickHandler={handleSave}
                text={translations.rowButtonSave} >
                <SaveButton />
            </HeaderAppButton>
          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
       <Modal isOpen={isDeleteConfirmationOpen} onClose={handleCancelDelete} style={{fontSize: "2em"}}>            
            <p style={{fontSize: "1.5em", textAlign: "center"}}>{translations.deleteItemConfirmMsg} <strong><em>{item.name}</em></strong></p>
            <div className="buttons-container">
              <HeaderAppButton onClickHandler={handleCancelDelete} >
                <p  style={{fontSize: "1.5em"}}>{translations.deleteItemNotText || 'Cancel'} </p>
              </HeaderAppButton>
              <HeaderAppButton onClickHandler={handleConfirmDelete} >
              <p  style={{fontSize: "1.5em"}}>{translations.deleteItemYesText || 'Delete'}  </p>               
              </HeaderAppButton>
            </div>
        </Modal>
      )}
    </>
  );
};

export default ModalViewItem;