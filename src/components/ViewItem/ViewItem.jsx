import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import DeleteButton from "../Buttons/DeleteButton";
import PreviousButton from "../Buttons/PreviousButton";
import CategorySelector from "../ViewList/ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { ModalConfirm } from "../Modals/ModalConfirm/ModalConfirm";

function ModalViewItem() {
  const {lists, categories, isDataLoaded, editItemFromList, deleteItemFromList, translations, themes} = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]);
  const [currentItemCategory, setCurrentItemCategory] =useState([]);
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueNote, setInputValueNote] = useState('');
  const inputValueNameRef = useRef(null);
  const inputValueNoteRef = useRef(null);
  const navigate = useNavigate();
  const deleteConfirmMsg = {confirm: 'Confirm delete item ?', yes:'Item deleted!', not: 'Item OK!'}
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickSelector = () =>{
    alert("Select clicked");
  }
  const updateData = () => {
    const editedItem = {
      ...currentItem,
      name: inputValueName,
      note: inputValueNote
    }
    editItemFromList(listId, itemId, editedItem);
  }
  const handlerEditName = () => {
    updateData();
    if (inputValueNoteRef.current)
      {inputValueNoteRef.current.focus();}
  }
  const handlerEditNote = () => {
    //updateData();
    if (inputValueNameRef.current){
      inputValueNameRef.current.focus();
    }
    goBack();
  }
  const handleDeleteButton = (e) => {
    e.preventDefault();
    setShowModalDelete(!showModalDelete);
    console.log(showModalDelete)    
  }
  const deleteItem = () => {
    deleteItemFromList(listId, itemId);
    navigate(`/lists/${listId}`);
  }
  const goBack = () => {
    updateData();
    //console.log('Redirigir a la página anterior y guardar', editedItem)
    navigate(-1); 
  };

useEffect(() => {

  if (isDataLoaded) {
    const currentListItems = lists.find(list => list.id == listId).items;    
    const currentItem = currentListItems.find(item => item.id == itemId);
    setCurrentItem(currentItem);
    setInputValueName(currentListItems.find(item => item.id == itemId).name);
    setInputValueNote(currentListItems.find(item => item.id == itemId).note);
    setCurrentItemCategory(categories.find(cat => cat.id == currentItem.categoryId).name)
    //console.log(categories, curren);
    if (inputValueNameRef.current){    
      inputValueNameRef.current.focus();
    }
}
}, [isDataLoaded]);  

console.log(lists)
  
  return (  
    <NotebookSheet
      title={inputValueName}
      subtitle={translations.actionItemSubtitle}
    >         
      {
      (showModalDelete)
        ? <ModalConfirm title={`"${currentItem.name}"`} subtitle={translations.deleteItemConfirmMsg} yesText={translations.deleteItemYesText} notText={translations.deleteItemNotText}
            onClickNot={() => setShowModalDelete(false)}
            onClickYes={deleteItem}
            />
        : <></>
      }
      <RowButtonInput 
          placeholder="Edit item name" 
          textValue={inputValueName} 
          setTextValue={setInputValueName} 
          button={<EditButton onClick={() => {inputValueNameRef.current.focus()}}/>} 
          handleAction = {handlerEditName}
          ref={inputValueNameRef}
          >
        {/*  
        <CategorySelector text={currentItemCategory} onClick={handleClickSelector} />
        */}
      </RowButtonInput >

      <RowButtonInput 
        placeholder="Edit item note"
        textValue={inputValueNote} 
        setTextValue={setInputValueNote}
        button={<EditButton onClick={() => {inputValueNoteRef.current.focus()}}/>} 
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
