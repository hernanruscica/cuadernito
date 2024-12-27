import React, {useState, useEffect, useContext} from "react";
import RowLabel from "../RowLabel/RowLabel";
import NotebookSheet from "../NotebookSheet/NotebookSheet";

import RowButton from "../RowButton/RowButton";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import ShowButton from "../Buttons/ShowButton";
import HideButton from "../Buttons/HideButton";
import NotebookButton from "../Buttons/NotebookButton";
import Header from "../Header/Header";
import Toast from "../Toast/Toast";


import { useNavigate } from "react-router-dom";

import { DataContext } from '../../context/DataContext';

function Home() {
  const { lists, items, categories, addList, addItem, addCategory, translations, isDataLoaded } = useContext(DataContext);  

 // const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {    
    setToasts((prevToasts) => [...prevToasts, message]);
  };

  const handleToastClose = (closedToast) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast !== closedToast));
  };

  const navigate = useNavigate();

  const handleAddNewList = (e) => {
    e.preventDefault();
  
    const formatDate = (date) => {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Formato de 24 horas
      };
      return new Intl.DateTimeFormat("es-ES", options).format(date);
    };
  
    const baseName = translations.listName; // Nombre base sin índice
    let newName = baseName; // Inicialmente, el nombre sin cambios
    let index = 1; // Iniciar el índice desde 1
  
    // Asegurar que el nombre sea único
    while (
      lists.some((list) => list.name.toLowerCase() === newName.toLowerCase()) &&
      index <= 99
    ) {
      newName = `${baseName} ${index}`;
      index++;
    }
  
    // Si se alcanzó el límite de 99 nombres repetidos
    if (index > 99) {
      alert("No se pueden crear más listas con este nombre.");
      return;
    }
  
    const newList = {
      id: Date.now(), // Usar timestamp como ID único
      name: newName,
      items: [],
      createdDate: formatDate(new Date()), // Fecha en el formato deseado
    };
  
    addList(newList); // Usar la función de contexto para agregar la lista
    //addToast("Lista creada !")
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
    <NotebookSheet >     
      <Header title="Cuadernito App" subtitle={translations.subtitle} />

          <div>         
          <Toast messages={toasts} onClose={handleToastClose} />
        </div>
        <RowLabel text={translations.welcome}  />
        {/* <RowLabel text={translations.newListText} /> 

        <RowButtonInput
          placeholder={translations.placeholderNewList}
          button={<AddButton onClick={handleAddNewlist} />}
          textValue={inputValue}
          setTextValue={setInputValue}
          handleAction={handleAddNewlist}
        />
*/}
        <RowButton
          info={translations.placeholderNewList}
          onClick={handleAddNewList}
        >
          <AddButton />
        </RowButton>

        
        {(lists.length > 0) ?
          <RowLabel text={translations.listsMessage} />
          :<RowLabel text={translations.noListsMessage} />
        }
        {(lists.length > 0) ?  
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
