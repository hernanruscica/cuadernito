import React, { useContext, useState, useEffect } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ItemCategory from "./ItemCategory/ItemCategory";
import ListItem from "./ListItem/ListItem";
import CategorySelector from "./ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";

import RowButton from "../RowButton/RowButton";
import HideButton from "../Buttons/HideButton";
import LogoutButton from "../Buttons/LogoutButton";
import RowLabel from "../RowLabel/RowLabel";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";


function ListScreen() {
  const { lists, isDataLoaded, addItemToList, editItemFromList, translations  } = useContext(DataContext);
  const { listId} = useParams();
  const placeholder = 'New item name';
  const placeholderNote = 'Notes for '
  const [currentList, setCurrentList] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    const listId = currentList.id; // ID de la lista a la que quieres agregar el ítem
    const newItem = {
      id: Date.now(),
      name: inputValue,    
      categoryId: 1,
      note: translations.placeholderNote + inputValue, 
      checked: false,
      photo: '',
    };

    addItemToList(listId, newItem);
    setInputValue(''); // Limpiar el campo de entrada   
    //console.log('Item added to list:', listId, newItem);
  };

  const handlerToggleChecked = (e) => {
    const itemId = e.target.id;
    //console.log(listId, itemId, e.target);
    editItemFromList(listId, itemId, {
      checked: !currentList.items.find(item => item.id == itemId).checked
    });
  };

  useEffect(() => {
    if (isDataLoaded) {
      const foundList = lists.find((list) => list.id == listId);
      setCurrentList(foundList || null); 
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
    <NotebookSheet title={currentList.name} subtitle={currentList.createdDate}>      
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
      {/*
      <ListItem text="Dried Tomatoes" url={"/modal"} />
      <ListItem text="Dried Shiitake Mushrooms" url={"/modal"} />
      <ItemCategory text="Produce" />
      <ListItem text="Strawberries" url={"/modal"} />   
      <RowButtonInput
        placeholder="New item name"
        button={<AddButton />}
      >
        <CategorySelector text="Click to select Category" onClick={() => alert("Select clicked")} />
      </RowButtonInput>
      */}
      <RowButtonInput
          placeholder={translations.placeholderNewItem}
          button={<AddButton onClick={handleAddItem} />}
          textValue={inputValue}
          setTextValue={setInputValue}
          handleAction={handleAddItem}
        >
          {/*
          <CategorySelector text="Click to select Category" onClick={() => alert("Select clicked")} />
          */}
      </RowButtonInput >
      <RowButton info={translations.backButton}>
        <LogoutButton />
      </RowButton>
    </NotebookSheet>
  );
}

export default ListScreen;
