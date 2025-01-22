import React, {useState, useContext, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DataContext } from '../../context/DataContext';
import { FiPlus  } from "react-icons/fi";
import Toast from "../Toast/Toast";
import { GetNewName } from "../../utils/GetNewName";
import MiniList from "../MiniList/MiniList";
import styles from './Home.module.css';
import SearchNavBar from "../SearchNavBar/SearchNavBar";

function Home() {
  const { lists, addList, translations } = useContext(DataContext);    
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toastMessage = queryParams.get("toast");
  const [searchInputText, setSearchInputText] = useState('');
  const [filteredLists, setfilteredLists] = useState(lists);
  
  
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

  const handleChangeInputText = (e) => {    
    const inputValue = e.target.value.toLowerCase();
    setSearchInputText(inputValue);    
    setfilteredLists(lists.filter(list=>list.name.toLowerCase().includes(inputValue)))   
  }

  
  
  return (    
    <div className={styles.MiniListContainer}>
      <Toast messages={toasts} onClose={handleToastClose} />

      <SearchNavBar  value={searchInputText} onChange={handleChangeInputText} listsQty={filteredLists?.length}/>

      <MiniList onClick={handleAddNewList}  subtitle01='Clik to create and open a new item'  key='CreateList'>
        <div style={{display: "Flex", alignItems: "center", justifyContent: "space-around", gap: "5px"}}>
          <span>{translations.listName}</span>
          <FiPlus />
        </div>
      </MiniList>

      {(filteredLists.length > 0) ?  
        filteredLists.map((list, index) => (
          <MiniList id={list.id} 
            subtitle01={list.createdDate} 
            subtitle02={`${list.items.length} items`} 
            key={`list_${index}_${list.id}`}>    
            <span>{list.name}</span>         
          </MiniList>
        ))
        : <div>No lists</div>  
      }      
    </div>
  
    
  );
}

export default Home;
