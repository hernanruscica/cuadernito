import React, { useContext, useState, useEffect, useRef } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ListItem from "./ListItem/ListItem";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import RowLabel from "../RowLabel/RowLabel";

import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

import Toast from "../Toast/Toast";
import AddItemButton from "../AddItemButton/AddItemButton";

import ModalViewItem from "../MyModals/ModalViewItem";
import { ModalConfirm } from "../MyModals/ModalConfirm";
import CategoryTag from "../CategoryTag/CategoryTag";



function ViewList() {
  const { lists, isDataLoaded, editList, addItemToList, editItemFromList, deleteListFromContext, translations  } = useContext(DataContext);
  const { listId  } = useParams(); 
  
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(null);  
  const [inputValueListName, setInputValueListName] = useState('');  
  const inputEditListRef = useRef(null);
  const [showModalDelete, setShowModalDelete] = useState(false);  
  const [toasts, setToasts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toastMessage = queryParams.get("toast");
  
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() === "") {
      
      addToast(translations.emptyItemConfirmMsg); 
      return;
    }
    const listId = currentList.id;  
    const newItem = {
      id: Date.now(),
      name: inputValue,    
      categoryId: 1,
      note: translations.placeholderNote , 
      checked: false,
      photo: '',
    };
    addItemToList(listId,  newItem );
    setInputValue(""); // Limpia el input después de añadir
    addToast(translations.toastNewItem); 
  };

  const addToast = (message) => {    
    setToasts((prevToasts) => [...prevToasts, message]);
  };

  const handleToastClose = (closedToast) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast !== closedToast));
  };

  const handlerToggleChecked = (e) => {
    const parentDiv = e.currentTarget;
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
    deleteListFromContext(listId);    
    navigate(`/?toast=${translations.toastListDeleted}`);    
  }

  const handleEditList = () => {   
    if (inputEditListRef.current){
      inputEditListRef.current.focus();
       inputEditListRef.current.select();      
    }
  }

  const handlerConfirmEditListName = (e) => {   
    //console.log('input change', e.target.value)
    setInputValueListName(e.target.value);
    const updatedNameList = {
      ...currentList,
      name: e.target.value
    }  
    if (e.target.value !== null && e.target.value !== ''){
      editList(currentList.id, updatedNameList);        
      //addToast(translations.toastListEdited);   
    }else{
      //addToast(translations.toastListWithoutName); 
    }
  }

  const handleView = (e, itemId) => {
    e.preventDefault();    
    const currentItem = currentList.items.find(item=>item.id==parseInt(itemId))
    setClickedItem(currentItem);
    setIsModalOpen(true);   
  }

  const handleCloseModal = () => {
    
    setIsModalOpen(false);
  }

  const handleCloseModalConfirm = (e) => {
    e.preventDefault();
    setShowModalDelete(false); 
  }
  const handleChooseCategory = () => {
    console.log('click on Change Category');
  }

  useEffect(() => {
    if (isDataLoaded) {
      const foundList = lists.find((list) => list.id == listId);
      const orderedItems = (foundList) ? foundList.items.sort((a,b) => { return b.id  - a.id}) : null;

      const listWithOrdenedItems = {
        ...foundList,
        items: orderedItems
      }
      
      setCurrentList(listWithOrdenedItems || "");   
      setInputValueListName(foundList?.name || "");  
      
      const isNewList =  (foundList && isDataLoaded) ? (Date.now() - foundList.id) < 250 : false;      
      if (isNewList) {
          addToast(translations.toastNewList); 
        }     

    }       
    
  }, [isDataLoaded, lists, listId]);

    useEffect(() => {
      if (toastMessage) {
        addToast(toastMessage)
      }
    }, [])
  
  if (!currentList) {    
    return <div>Cargando...</div>;
  } 

  return (
    <NotebookSheet  >     

      <Toast messages={toasts} onClose={handleToastClose} />        
      <ModalViewItem isOpen={isModalOpen} onClose={handleCloseModal} item={clickedItem} listId={listId} addToast={addToast}/>           
      <ModalConfirm 
         isOpen={showModalDelete} onClose={handleCloseModalConfirm}
         itemName={`"${currentList?.name}"`} title={translations.deleteListConfirmMsg}  yesText={translations.deleteListYesText} notText={translations.deleteListNotText}
         onClickNot={handleCloseModalConfirm}
         onClickYes={deleteList}
       />
      
        <RowButtonInput 
          placeholder={translations.placeholderEditList}
          button={<EditButton 
          onClick={handleEditList}/>} 
          textValue={inputValueListName || ''} 
          setTextValue={setInputValueListName} 
          handleAction={handlerConfirmEditListName}      
          ref={inputEditListRef}/>
        <RowLabel text={currentList?.createdDate} info={`${currentList?.items?.length} items`}>
          <DeleteButton onClick={handleDeleteList}/>
        </RowLabel>    
        

          <AddItemButton
          placeholder={translations.placeholderNewItem}
          value={inputValue} // Estado controlado por el padre
          onChange={handleInputChange} // Actualiza el estado en el padre
          onAdd={handleAddItem} // Lógica para manejar el clic o el Enter
          />      



         
      <CategoryTag 
        text="Category name" 
        color='#C1FFC5' />


      {
      currentList && currentList.items?.length > 0 ? (
        currentList.items.map((item) => (
          <ListItem
            text={item.name}
            url={`/lists/${currentList.id}/items/${item.id}`}
            handleView={(e) => handleView(e, item.id)}
            key={item.id}
            id={item.id}
            checked={item.checked}
            toggleChecked={handlerToggleChecked}
          />
        ))
      ) : currentList ? (
        <RowLabel text={translations.noItemMessage} />
      ) : null
    }     

      
    </NotebookSheet>
  );
}

export default ViewList;
