import React, {useState, useContext, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DataContext } from '../../context/DataContext';
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowLabel from "../RowLabel/RowLabel";
import RowButton from "../RowButton/RowButton";
import AddButton from "../Buttons/AddButton";
import NotebookButton from "../Buttons/NotebookButton";
import Header from "../Header/Header";
import Toast from "../Toast/Toast";
import { GetNewName } from "../../utils/GetNewName";

function Home() {
  const { lists, addList, translations } = useContext(DataContext);    
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toastMessage = queryParams.get("toast");
  
  useEffect(() => {
    if (toastMessage) {
      addToast(toastMessage)
    }
  }, [])

  const addToast = (message) => {    
    setToasts((prevToasts) => [...prevToasts, message]);
  };
  const handleToastClose = (closedToast) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast !== closedToast));
  };

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

    const newName = GetNewName(translations.listName, lists.map(list=>list.name), 99);    

    if (newName !== -1){  
      const newList = {
        id: Date.now(), // Use timestamp as unique ID
        name: newName,
        items: [],
        createdDate: formatDate(new Date()), // Fecha en el formato deseado
      };    
      addList(newList);       
      navigate(`/lists/${newList.id}`);
    }else{
      addToast(translations.toastNameRepeat);
    }
  };
  
  return (
    <NotebookSheet >     
      <Toast messages={toasts} onClose={handleToastClose} />
      
        <Header title={translations.appName} subtitle={translations.subtitle} />        

        <RowLabel text={translations.welcome}  />       

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
