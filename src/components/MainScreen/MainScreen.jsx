import React, {useState, useEffect, useContext} from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import ShowButton from "../Buttons/ShowButton";

import { DataContext } from '../../context/DataContext';

function MainScreen() {
  const { lists, items, categories, addList, addItem, addCategory } = useContext(DataContext);
  
  const [inputValue, setInputValue] = useState("");

  const handleAddNewlist = () => {
    if (!inputValue.trim()) {
      console.error('Input value is empty. Please enter a name for the list.');
      return;
    }
  
    const newList = {
      id: Date.now(), // Usar timestamp como ID único
      name: inputValue.trim(), // Eliminar espacios innecesarios
      items: [],
      createdDate: new Date().toISOString(), // Usar formato ISO para consistencia
    };
  
    addList(newList); // Usar la función de contexto para agregar la lista
    
    setInputValue(''); // Limpiar el campo de entrada
  };
  
 
  return (
    <NotebookSheet 
      title="Cuadernito App"
      subtitle="Your daily friend !"
    >     
        <RowLabel text="Now you can:"  />
        <RowLabel text="Create a new list:" />
        <RowButtonInput
          placeholder="New list name"
          button={<AddButton onClick={handleAddNewlist} />}
          textValue={inputValue}
          setTextValue={setInputValue}
        />
        <RowLabel text="Open your lists:" />
        {(lists.length > 0) ?
          lists.map((list) => (
            <RowButton info={list.name} details={list.createdDate} key={list.id} url={`/lists/${list.id}`}>
              <ShowButton/>
            </RowButton>
          )) :
          <RowLabel text="You don't have any list yet..." />
        }        
    </NotebookSheet>
  );
}

export default MainScreen;
