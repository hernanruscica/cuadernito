import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import PreviousButton from "../Buttons/PreviousButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { ModalConfirm } from "../MyModals/ModalConfirm";

function ModalViewItem() {
  const {lists, isDataLoaded, editItemFromList, deleteItemFromList, translations, addToast } = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]); 
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueNote, setInputValueNote] = useState('');
  const inputValueNameRef = useRef(null);
  const inputValueNoteRef = useRef(null);
  const navigate = useNavigate();  
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEmptyName, setShowModalEmptyName] = useState(false);

   const updateData = () => {    
    const editedItem = {
      ...currentItem,
      name: inputValueName,
      note: inputValueNote
    }
    editItemFromList(listId, itemId, editedItem);
  }
  const handlerEditName = () => {
  
    if (inputValueNoteRef.current){
      inputValueNoteRef.current.focus();
      inputValueNoteRef.current.select();
    }
  }
  const handlerEditNote = () => {
    
    if (inputValueNameRef.current){
      inputValueNameRef.current.focus();
    }
    goBack();
  }
  const handleDeleteButton = (e) => {    
    e.preventDefault();    
    setShowModalDelete(!showModalDelete);       
  }
  const deleteItem = () => {
    deleteItemFromList(listId, itemId);
    addToast(translations.toastItemDeleted);
    navigate(`/lists/${listId}`, { replace: true })
  }
  const goBack = (e) => {
    if (inputValueName == ''){
      setShowModalEmptyName(!showModalEmptyName);               
      if (e) {
        e.preventDefault()}
      return;
    }
    if (e) {
      e.preventDefault()}
    updateData();
    if (inputValueName !== currentItem?.name) {
      addToast(translations.toastItemNameEdited);
    }
    navigate(`/lists/${listId}`); 
  };

  useEffect(() => {
    if (isDataLoaded) {
      const currentList = lists.find(list => list.id == listId);
      const currentItem = currentList?.items.find(item => item.id == itemId);
      setCurrentItem(currentItem);
      setInputValueName(currentItem?.name || '');
      setInputValueNote(currentItem?.note || '');
      
      
      if (inputValueNameRef.current) {            
        setTimeout(() => {
          inputValueNameRef.current.focus();
          inputValueNameRef.current.select();
        }, 100); // Little delay to wait the DOM have updated
      }

      const isNewItem =  (currentItem ) ? (Date.now() - currentItem.id) < 250 : false;      
      if (isNewItem) {
          addToast(translations.toastNewItem);
        }
    }
  }, [isDataLoaded]);
  
  return (  
    <NotebookSheet>    
      {
      (showModalDelete)
        ? <ModalConfirm title={`"${currentItem.name}"`} subtitle={translations.deleteItemConfirmMsg} yesText={translations.deleteItemYesText} notText={translations.deleteItemNotText}
            onClickNot={() => setShowModalDelete(false)}
            onClickYes={deleteItem}
            />
        : <></>
      }
      {
        (showModalEmptyName)
        ? <ModalConfirm title={`"${currentItem.name}"`} subtitle={translations.emptyItemConfirmMsg} yesText={translations.emptyItemYesText} notText={translations.emptyItemNotText}
            onClickNot={() => {navigate(`/lists/${listId}`)}}
            onClickYes={() => setShowModalEmptyName(false)}
        />
        : <></>
      }
      <RowButtonInput 
          placeholder={inputValueName} 
          textValue={inputValueName}  
          setTextValue={setInputValueName} 
          button={<EditButton onClick={() => {inputValueNameRef.current.focus(); inputValueNameRef.current.select()}}/>} 
          handleAction = {handlerEditName}
          ref={inputValueNameRef}
          >

      </RowButtonInput >

      <RowButtonInput 
        placeholder="Edit item note"
        textValue={inputValueNote} 
        setTextValue={setInputValueNote}
        button={<EditButton onClick={() => {inputValueNoteRef.current.focus(); inputValueNoteRef.current.select()}}/>} 
        handleAction={handlerEditNote}
        ref={inputValueNoteRef}
        >        
      </RowButtonInput >

      <RowButton info={translations.rowButtonDelete}  onClick={handleDeleteButton}>
        <DeleteButton />               
      </RowButton>       
         
      <RowButton info={translations.backButtonList}  onClick={goBack}>
        <PreviousButton />
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
