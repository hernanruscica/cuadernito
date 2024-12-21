import React, {useState, useEffect, useContext} from "react";

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
  const {lists, isDataLoaded} = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () =>{
    alert("Select clicked");
  }
  const handlerEditName = () => {
    console.log('edit item name', inputValue);
  }

useEffect(() => {

  if (isDataLoaded) {
    const currentListItems = lists.find(list => list.id == listId).items;    
    setCurrentItem(currentListItems.find(item => item.id == itemId));
    setInputValue(currentListItems.find(item => item.id == itemId).name)
    //console.log(currentItem);
}
}, [isDataLoaded]);  
  
  return (
    <NotebookSheet
      title={currentItem.name}
      subtitle="Actions for this item:"
    >         
      
      <RowButtonInput 
          placeholder="Edit item name" 
          textValue={inputValue} 
          setTextValue={setInputValue} 
          button={<EditButton/>} 
          handleAction = {handlerEditName}>
        <CategorySelector text="Dry goods" onClick={handleClick} />
      </RowButtonInput >

      <RowButtonInput placeholder="Note for dries tomatoes" button={<EditButton/>} >        
      </RowButtonInput >

      <RowButton info="Send to another list">
        <NextButton />
      </RowButton>      
      <RowButton info="Back to list">
        <PreviousButton />
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
