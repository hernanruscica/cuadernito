import React, { useContext, useState, useEffect } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ItemCategory from "./ItemCategory/ItemCategory";
import ListItem from "./ListItem/ListItem";
import CategorySelector from "./ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";

import RowButton from "../RowButton/RowButton";
import HideButton from "../Buttons/HideButton";
import RowLabel from "../RowLabel/RowLabel";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";


function ListScreen() {
  const { lists, isDataLoaded, addItemToList  } = useContext(DataContext);
  const { listId } = useParams();

  const [currentList, setCurrentList] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    const listId = currentList.id; // ID de la lista a la que quieres agregar el ítem
    const newItem = {
      id: Date.now(),
      name: inputValue,      
    };

    addItemToList(listId, newItem);
    console.log('Item added to list:', listId, newItem);
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
  //console.log(currentList.items.length > 0)

  if (!currentList) {    
    return <div>List not found</div>;
  }

  return (
    <NotebookSheet title={currentList.name} subtitle={currentList.createdDate}>      
      {(currentList.items.length > 0) ?
        currentList.items.map((item) => (
          <ListItem text={item.name} url={"/modal"} key={item.id}/>
        )):
        <RowLabel text="You don't any item yet"/>
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
          placeholder="New Item name"
          button={<AddButton onClick={handleAddItem} />}
          textValue={inputValue}
          setTextValue={setInputValue}
        >
          <CategorySelector text="Click to select Category" onClick={() => alert("Select clicked")} />
      </RowButtonInput >
      <RowButton info="Hide list">
        <HideButton />
      </RowButton>
    </NotebookSheet>
  );
}

export default ListScreen;
