import React, { useContext, useState, useEffect, useRef } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ItemCategory from "./ItemCategory/ItemCategory";
import CategorySelector from "./ItemCategory/CategorySelector/CategorySelector";
import ListItem from "./ListItem/ListItem";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import RowLabel from "../RowLabel/RowLabel";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import PreviousButton from "../Buttons/PreviousButton";
import DeleteButton from "../Buttons/DeleteButton";
import { ModalConfirm } from "../Modals/ModalConfirm/ModalConfirm";
import HeaderList from "../HeaderList/HeaderList";


function ViewList() {
  const { lists, isDataLoaded, editList, addItemToList, editItemFromList, deleteListFromContext, translations  } = useContext(DataContext);
  const { listId} = useParams();
  
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValueListName, setInputValueListName] = useState('');
  const inputNewItemRef = useRef(null);
  const inputEditListRef = useRef(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleAddItem = () => {
    if (!inputValue.trim()) {
      alert('Input value is empty. Please enter a name for the item.');
      return;
    }
    const listId = currentList.id; // ID de la lista a la que quieres agregar el ítem
    const newItem = {
      id: Date.now(),
      name: inputValue,    
      categoryId: 1,
      note: translations.placeholderNote + inputValue, 
      checked: false,
      photo: '',
    };

    const existingtItem = currentList.items.find(item => item.name.toLowerCase() === newItem.name.toLowerCase());
    if(existingtItem) {
        alert("A Item with this name already exists.")
        return;
    }

    addItemToList(listId, newItem);
    setInputValue(''); // Limpiar el campo de entrada   
    //console.log('Item added to list:', listId, newItem);
  };

  const handlerToggleChecked = (e) => {
    const parentDiv = e.currentTarget; // Siempre captura el div con la clase checkbox
    //console.log("item id:", parentDiv.id);
    const itemId = parentDiv.id;
    
    editItemFromList(listId, itemId, {
      checked: !currentList.items.find(item => item.id == itemId).checked
    });
    
  };

  const handleDeleteList = (e) => {  
    e.preventDefault();      
    setShowModalDelete(!showModalDelete);    
  }

  const deleteList = () => {
    navigate('/');
    deleteListFromContext(listId);
  }

  const handleEditList = () => {
    // console.log('edit list')
    if (inputEditListRef.current){
      inputEditListRef.current.focus();
      //console.log(inputEditListRef)
    }
  }
  const handlerConfirmEditListName = () => {
    const updatedNameList = {
      ...currentList,
      name: inputValueListName
    }
    console.log('confirm edit list name', updatedNameList);

    editList(currentList.id, updatedNameList);
    if (inputNewItemRef.current){
      inputNewItemRef.current.focus();
    }


  }

  useEffect(() => {
    if (isDataLoaded) {
      const foundList = lists.find((list) => list.id == listId);
      setCurrentList(foundList || null);   
      setInputValueListName(foundList?.name || null);            
    }    
  }, [isDataLoaded, lists, listId]);

  if (!isDataLoaded) {    
    return <div>Loading...</div>;
  }
  //console.log(currentList.items)
  
  if (!currentList) {    
    return <div>List not found</div>;
  } 

  return (
    <NotebookSheet  >     
      <HeaderList subtitle={currentList.createdDate} >        
        <RowButtonInput 
          placeholder={translations.placeholderEditList}
          button={<EditButton 
          onClick={handleEditList}/>} 
          textValue={inputValueListName} 
          setTextValue={setInputValueListName} 
          handleAction={handlerConfirmEditListName}      
          ref={inputEditListRef}/>    
      </HeaderList>
    {
      (showModalDelete)
      ? <ModalConfirm 
          title={`"${currentList.name}"`} subtitle={translations.deleteListConfirmMsg}  yesText={translations.deleteListYesText} notText={translations.deleteListNotText}
          onClickNot={() => setShowModalDelete(false)}
          onClickYes={deleteList}
        />
      : ''
    } 
      {(currentList.items.length > 0) ?
        currentList.items.map((item) => (
          <ListItem 
              text={item.name} 
              url={`/lists/${currentList.id}/items/${item.id}`} 
              key={item.id}
              id={item.id}
              checked={item.checked}
              toggleChecked={handlerToggleChecked}/>
        )):
        <RowLabel text={translations.noItemMessage}/>
      }
    
      <RowButtonInput
          placeholder={translations.placeholderNewItem}
          button={<AddButton onClick={handleAddItem} />}
          textValue={inputValue}          
          setTextValue={setInputValue}
          handleAction={handleAddItem}
          ref={inputNewItemRef}
        >
          {/*
          <CategorySelector text="Click to select Category" onClick={() => alert("Select clicked")} />
          */}
      </RowButtonInput >

      <RowButton info={translations.rowButtonDeleteList} onClick={handleDeleteList}>
        <DeleteButton />
      </RowButton>

      <RowButton info={translations.backButton} onClick={handlerConfirmEditListName}>
        <PreviousButton />
      </RowButton>
    </NotebookSheet>
  );
}

export default ViewList;
