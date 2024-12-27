import React, {useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import RowButton from "../RowButton/RowButton";
import EditButton from "../Buttons/EditButton";
import NextButton from "../Buttons/NextButton";
import DeleteButton from "../Buttons/DeleteButton";
import PreviousButton from "../Buttons/PreviousButton";
import CategorySelector from "../ViewList/ItemCategory/CategorySelector/CategorySelector";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { ModalConfirm } from "../Modals/ModalConfirm/ModalConfirm";
import Header from "../Header/Header";

function ModalViewItem() {
  const {lists, categories, isDataLoaded, editItemFromList, deleteItemFromList, translations, themes} = useContext(DataContext);
  const { listId, itemId} = useParams();
  const [currentItem, setCurrentItem] =useState([]);
  const [currentItemCategory, setCurrentItemCategory] =useState([]);
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueNote, setInputValueNote] = useState('');
  const inputValueNameRef = useRef(null);
  const inputValueNoteRef = useRef(null);
  const navigate = useNavigate();  
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEmptyName, setShowModalEmptyName] = useState(false);

 
  const updateData = () => {    
    const editedItem = {
      ...currentItem,
      name: inputValueName,
      note: inputValueNote
    }
    editItemFromList(listId, itemId, editedItem);
  }
  const handlerEditName = () => {
  
    if (inputValueNoteRef.current){
      inputValueNoteRef.current.focus();
      inputValueNoteRef.current.select();
    }
  }
  const handlerEditNote = () => {
    
    if (inputValueNameRef.current){
      inputValueNameRef.current.focus();
    }
    goBack();
  }
  const handleDeleteButton = (e) => {    
    e.preventDefault();    
    setShowModalDelete(!showModalDelete);
    console.log(showModalDelete)    
  }
  const deleteItem = () => {
    deleteItemFromList(listId, itemId);
    navigate(`/lists/${listId}`);
  }
  const goBack = (e) => {
    if (inputValueName == ''){
      setShowModalEmptyName(!showModalEmptyName);
      //alert('Tiene que ponerle algun nombre!');          
      if (e) {
        e.preventDefault()}
      return;
    }
    updateData();
    //console.log('Redirigir a la página anterior y guardar', editedItem)
    navigate(-1); 
  };

  useEffect(() => {
    if (isDataLoaded) {
      const currentList = lists.find(list => list.id == listId);
      const currentItem = currentList?.items.find(item => item.id == itemId);
      setCurrentItem(currentItem);
      setInputValueName(currentItem?.name || '');
      setInputValueNote(currentItem?.note || '');
      setCurrentItemCategory(categories.find(cat => cat.id == currentItem?.categoryId)?.name || '');    
      
      if (inputValueNameRef.current) {            
        setTimeout(() => {
          inputValueNameRef.current.focus();
          inputValueNameRef.current.select();
        }, 100); // Pequeño retraso para asegurar que el DOM esté actualizado
      }
    }
  }, [isDataLoaded]);
  
   
    
//console.log(lists)
  
  return (  
    <NotebookSheet>         
    {/* <Header title={(inputValueName == '' ? translations.itemName : inputValueName)} subtitle={translations.actionItemSubtitle} />     */}
      {
      (showModalDelete)
        ? <ModalConfirm title={`"${currentItem.name}"`} subtitle={translations.deleteItemConfirmMsg} yesText={translations.deleteItemYesText} notText={translations.deleteItemNotText}
            onClickNot={() => setShowModalDelete(false)}
            onClickYes={deleteItem}
            />
        : <></>
      }
      {
        (showModalEmptyName)
        ? <ModalConfirm title={`"${currentItem.name}"`} subtitle={translations.emptyItemConfirmMsg} yesText={translations.emptyItemYesText} notText={translations.emptyItemNotText}
            onClickNot={() => {navigate(`/lists/${listId}`)}}
            onClickYes={() => setShowModalEmptyName(false)}
        />
        : <></>
      }
      <RowButtonInput 
          placeholder={inputValueName} 
          textValue={inputValueName}  
          setTextValue={setInputValueName} 
          button={<EditButton onClick={() => {inputValueNameRef.current.focus(); inputValueNameRef.current.select()}}/>} 
          handleAction = {handlerEditName}
          ref={inputValueNameRef}
          >
        {/*  
        <CategorySelector text={currentItemCategory} onClick={handleClickSelector} />
        */}
      </RowButtonInput >

      <RowButtonInput 
        placeholder="Edit item note"
        textValue={inputValueNote} 
        setTextValue={setInputValueNote}
        button={<EditButton onClick={() => {inputValueNoteRef.current.focus(); inputValueNoteRef.current.select()}}/>} 
        handleAction={handlerEditNote}
        ref={inputValueNoteRef}
        >        
      </RowButtonInput >

      <RowButton info={translations.rowButtonDelete}  onClick={handleDeleteButton}>
        <DeleteButton />               
      </RowButton>       
         
      <RowButton info={translations.backButtonList}  onClick={goBack}>
        <PreviousButton />
      </RowButton>      
        
    </NotebookSheet>
  );
}

export default ModalViewItem;
