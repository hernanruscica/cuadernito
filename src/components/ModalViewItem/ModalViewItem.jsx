import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import DeleteButton from "../Buttons/DeleteButton";
import PreviousButton from "../Buttons/PreviousButton";
import CategorySelector from "../ListScreen/ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";





function ModalViewItem() {
  const {lists, categories, isDataLoaded, editItemFromList, deleteItemFromList} = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]);
  const [currentItemCategory, setCurrentItemCategory] =useState([]);
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueNote, setInputValueNote] = useState('');
  const inputValueNameRef = useRef(null);
  const inputValueNoteRef = useRef(null);
  const navigate = useNavigate();
  const deleteConfirmMsg = {confirm: 'Confirm delete item ?', yes:'Item deleted!', not: 'Item OK!'}

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
    if (confirm(deleteConfirmMsg.confirm)){
        //console.log(deleteConfirmMsg.yes);        
        deleteItemFromList(listId, itemId);
        //console.log(`Item con ID ${itemId} eliminado de la lista con ID ${listId}`);
        navigate(`/lists/${listId}`);
    } else{
      console.log(deleteConfirmMsg.not);
    }   
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
}
}, [isDataLoaded]);  
  
  return (
    <NotebookSheet
      title={inputValueName}
      subtitle="Actions for this item:"
    >         
      
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


      <RowButton info="Delete this item"    onClick={handleDeleteButton}>
        <DeleteButton />               
      </RowButton>   
      
      
         
      <RowButton info="Back to list"  onClick={goBack}>
        <PreviousButton onClick={goBack}/>
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
