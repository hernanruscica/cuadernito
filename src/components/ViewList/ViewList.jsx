import React, { useContext, useState, useEffect, useRef } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ListItem from "./ListItem/ListItem";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import AddButton from "../Buttons/AddButton";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import RowLabel from "../RowLabel/RowLabel";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import PreviousButton from "../Buttons/PreviousButton";
import DeleteButton from "../Buttons/DeleteButton";
import { ModalConfirm } from "../Modals/ModalConfirm/ModalConfirm";
import Toast from "../Toast/Toast";
import { GetNewName } from "../../utils/GetNewName";

function ViewList() {
  const { lists, isDataLoaded, editList, addItemToList, editItemFromList, deleteListFromContext, translations  } = useContext(DataContext);
  const { listId} = useParams();
  
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(null);  
  const [inputValueListName, setInputValueListName] = useState('');
  const inputNewItemRef = useRef(null);
  const inputEditListRef = useRef(null);
  const [showModalDelete, setShowModalDelete] = useState(false);  
  const [toasts, setToasts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toastMessage = queryParams.get("toast");
  

  const addToast = (message) => {    
    setToasts((prevToasts) => [...prevToasts, message]);
  };

  const handleToastClose = (closedToast) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast !== closedToast));
  };

  const handleAddItem = (e) => {    
    e.preventDefault();
    const listId = currentList.id;  

    const newName = GetNewName(translations.itemName, currentList.items.map(item=>item.name), 99);  

    const newItem = {
      id: Date.now(),
      name: newName,    
      categoryId: 1,
      note: translations.placeholderNote , 
      checked: false,
      photo: '',
    };

    addItemToList(listId, newItem);
    navigate(`/lists/${listId}/items/${newItem.id}`);
  };

  const handlerToggleChecked = (e) => {
    const parentDiv = e.currentTarget; // Always capture the checkbox div    
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
  const handlerConfirmEditListName = () => {
   
    const updatedNameList = {
      ...currentList,
      name: inputValueListName
    }  
    if (inputValueListName !== null && inputValueListName !== ''){
      editList(currentList.id, updatedNameList);        
      addToast(translations.toastListEdited);   
    }else{
      addToast(translations.toastListWithoutName); 
    }
  }

  useEffect(() => {
    if (isDataLoaded) {
      const foundList = lists.find((list) => list.id == listId);
      const orderedItems = (foundList) ? foundList.items.sort((a,b) => { return b.id  - a.id}) : null;

      const listWithOrdenedItems = {
        ...foundList,
        items: orderedItems
      }
      
      setCurrentList(listWithOrdenedItems || null);   
      setInputValueListName(foundList?.name || null);  
      
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
    return <div>List not found</div>;
  } 

  return (
    <NotebookSheet  >     
        <Toast messages={toasts} onClose={handleToastClose} />
        <RowButtonInput 
          placeholder={translations.placeholderEditList}
          button={<EditButton 
          onClick={handleEditList}/>} 
          textValue={inputValueListName || ''} 
          setTextValue={setInputValueListName} 
          handleAction={handlerConfirmEditListName}      
          ref={inputEditListRef}/>
        <RowLabel text={currentList.createdDate}/>
      
    {
      (showModalDelete)
      ? <ModalConfirm 
          title={`"${currentList.name}"`} subtitle={translations.deleteListConfirmMsg}  yesText={translations.deleteListYesText} notText={translations.deleteListNotText}
          onClickNot={() => setShowModalDelete(false)}
          onClickYes={deleteList}
        />
      : ''
    } 

      <RowButton info={translations.placeholderNewItem} onClick={handleAddItem} ref={inputNewItemRef}>
        <AddButton />
      </RowButton>      

      {
      currentList && currentList.items?.length > 0 ? (
        currentList.items.map((item) => (
          <ListItem
            text={item.name}
            url={`/lists/${currentList.id}/items/${item.id}`}
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
