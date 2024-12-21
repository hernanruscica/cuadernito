import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import PreviousButton from "../Buttons/PreviousButton";
import CategorySelector from "../ListScreen/ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";



function ModalViewItem() {
  const {lists, categories, isDataLoaded, editItemFromList} = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]);
  const [currentItemCategory, setCurrentItemCategory] =useState([]);
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueNote, setInputValueNote] = useState('');
  const inputValueNameRef = useRef(null);
  const inputValueNoteRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () =>{
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
    updateData();
    if (inputValueNameRef.current)
    {inputValueNameRef.current.focus();}
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
      title={currentItem.name}
      subtitle="Actions for this item:"
    >         
      
      <RowButtonInput 
          placeholder="Edit item name" 
          textValue={inputValueName} 
          setTextValue={setInputValueName} 
          button={<EditButton onClick={handlerEditName}/>} 
          handleAction = {handlerEditName}
          ref={inputValueNameRef}
          >
          
        <CategorySelector text={currentItemCategory} onClick={handleClick} />
      </RowButtonInput >

      <RowButtonInput 
        placeholder="Edit item note"
        textValue={inputValueNote} 
        setTextValue={setInputValueNote}
        button={<EditButton onClick={handlerEditNote}/>} 
        handleAction={handlerEditNote}
        ref={inputValueNoteRef}
        >        
      </RowButtonInput >

      <RowButton info="Save and send to another list">
        <NextButton />
      </RowButton>      
      <RowButton info="Save and back to list"  onClick={goBack}>
        <PreviousButton onClick={goBack}/>
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
