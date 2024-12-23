import React, {useState, useEffect, useContext} from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import ShowButton from "../Buttons/ShowButton";
import HideButton from "../Buttons/HideButton";
import NotebookButton from "../Buttons/NotebookButton";


import { useNavigate } from "react-router-dom";

import { DataContext } from '../../context/DataContext';

function Home() {
  const { lists, items, categories, addList, addItem, addCategory, translations, isDataLoaded } = useContext(DataContext);  

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  //const [currentLists, setCurrentLists] = useState(lists)
  const navigate = useNavigate();

  const handleAddNewlist = () => {
    if (!inputValue.trim()) {
      alert('Input value is empty. Please enter a name for the list.');
      return;
    }
    
  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Formato de 24 horas
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };
  
  const newList = {
    id: Date.now(), // Usar timestamp como ID único
    name: inputValue.trim(), // Eliminar espacios innecesarios
    items: [],
    createdDate: formatDate(new Date()), // Fecha en el formato deseado
  };

  const existingList = lists.find(list => list.name.toLowerCase() === newList.name.toLowerCase());
    if(existingList) {
        alert("A list with this name already exists.")
        return;
    }
  
    addList(newList); // Usar la función de contexto para agregar la lista    
    setInputValue(''); // Limpiar el campo de entrada    
    navigate(`/lists/${newList.id}`);
  };

  const handlerClickShow = (e) => {
    e.preventDefault();
    setShowList(!showList);
  }

  if (!isDataLoaded){
    return (
      <div>cargando...</div>
    )
  }
  
  //const currentTrans = translations[locale] || translations;
  //console.log(translations)

  return (
    <NotebookSheet 
      title="Cuadernito App"
      subtitle={translations.subtitle}
    >     
        <RowLabel text={translations.welcome}  />
        {/* <RowLabel text={translations.newListText} /> */}

        <RowButtonInput
          placeholder={translations.placeholderNewList}
          button={<AddButton onClick={handleAddNewlist} />}
          textValue={inputValue}
          setTextValue={setInputValue}
          handleAction={handleAddNewlist}
        />

        {/* <RowLabel text="Open your lists:" /> */}        

        {(lists.length > 0) ?
          <RowButton info={(showList) ? translations.hideListText : translations.showListText} 
            onClick={handlerClickShow}>
              {(showList) ? <HideButton /> :<ShowButton />}
          </RowButton>          
          :<RowLabel text={translations.noListsMessage} />
        }
        {(showList && lists.length > 0) ?  
          lists.map((list) => (
            <RowButton info={list.name} details={`${list.createdDate} - ${list.items.length} items`} key={list.id} url={`/lists/${list.id}`}>
              <NotebookButton/>
            </RowButton>
          )) 
          :<></>
        }        
    </NotebookSheet>
  );
}

export default Home;
