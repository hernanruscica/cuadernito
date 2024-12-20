import React, {useState, useEffect, useContext} from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import ShowButton from "../Buttons/ShowButton";
import HideButton from "../Buttons/HideButton";
import LoginButton from "../Buttons/LoginButton";


import { DataContext } from '../../context/DataContext';

function MainScreen() {
  const { lists, items, categories, addList, addItem, addCategory } = useContext(DataContext);
  const placeholder = "New list name";
  const showListText = 'Show my lists...'
  const HideListText = 'Hide my lists...'

  const [inputValue, setInputValue] = useState(placeholder);
  const [showList, setShowList] = useState(true);


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
    
    setInputValue(placeholder); // Limpiar el campo de entrada
  };

  const handlerClickShow = (e) => {
    e.preventDefault();
    setShowList(!showList);
  }
  
 
  return (
    <NotebookSheet 
      title="Cuadernito App"
      subtitle="Your daily friend !"
    >     
        <RowLabel text="Now you can:"  />
        <RowLabel text="Create a new list:" />

        <RowButtonInput
          placeholder={inputValue}
          button={<AddButton onClick={handleAddNewlist} />}
          textValue={inputValue}
          setTextValue={setInputValue}
          handleAddNew={handleAddNewlist}
        />

        {/* <RowLabel text="Open your lists:" /> */}

        

        {(lists.length > 0) ?
          <RowButton info={(showList) ? HideListText : showListText} 
            onClick={handlerClickShow}>
              {(showList) ? <HideButton /> :<ShowButton />}
          </RowButton>          
          :<RowLabel text="You don't have any list yet..." />
        }
        {(showList) ?  
          lists.map((list) => (
            <RowButton info={list.name} details={`${list.createdDate} - ${list.items.length} items`} key={list.id} url={`/lists/${list.id}`}>
              <LoginButton/>
            </RowButton>
          )) 
          :<></>
        }        
    </NotebookSheet>
  );
}

export default MainScreen;
