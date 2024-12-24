import React, { createContext, useState, useEffect } from 'react';
import defaultCategories from '../categories.json/';

const initialState = {
  lists: [],
  items: [],
  categories: defaultCategories,
};

const DataContext = createContext(initialState);
const publicUrl = 'https://cuadernito.onrender.com';
//const publicUrl = 'http://localhost:5173';

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState); // Use a single state for all data
  const localStorageDataName = 'cuadernito-data';
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [translations, setTranslations] = useState({});
  const [locale, setLocale] = useState('es');
  const [currentTrans, setCurrentTrans] = useState({});

  const loadTranslations = async () => {
    try {
      const response = await fetch(`${publicUrl}/data/translations.json`);  // Adjust path
      const data = await response.json();
      
      setTranslations(data);
      setCurrentTrans(data[locale] || translations);
    } catch (error) {
      console.error('Error loading translations:', error);
      setTranslations({}); // Empty object in case of failure.
    }
  };

  useEffect(() => {
    setIsDataLoaded(false);
    const storedData = localStorage.getItem(localStorageDataName); // Use a single key

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData); // Directly update the data state
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
    loadTranslations();    
   
    setIsDataLoaded(true);
  }, []); // Run only once on mount

  const addList = (newList) => {
    const updatedData = { ...data, lists: [...data.lists, newList] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const deleteListFromContext = (listId) => {
    const updatedData = {
      ...data,
      lists: data.lists.filter(list => list.id != listId), // Filtrar la lista por ID
    };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };
  

  const addItem = (newItem) => {
    const updatedData = { ...data, items: [...data.items, newItem] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const addCategory = (newCategory) => {
    const updatedData = { ...data, categories: [...data.categories, newCategory] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const addItemToList = (listId, newItem) => {
    const updatedLists = data.lists.map((list) =>
      list.id === listId
        ? { ...list, items: [...list.items, newItem] } // Add the new item to the items array of the matching list
        : list
    );
    const updatedData = { ...data, lists: updatedLists };
    //console.log(updatedData)
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editItemFromList = (listId, itemId, editedItem) => {
    //console.log("Editing item:", { listId, itemId, editedItem });  
    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {
        //console.log("Found matching list:", list);  
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.id == itemId) {
              //console.log("Found matching item:", item);
              return { ...item, ...editedItem }; // Actualizar el ítem
            }
            return item;
          }),
        };
      }
      return list;
    });    
  
    const updatedData = { ...data, lists: updatedLists };
    //console.log("Updated data:", updatedData);
  
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const deleteItemFromList = (listId, itemId) => {    

    //console.log(`Intentando eliminar item con ID: ${itemId} de la lista con ID: ${listId}`);  
    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {
        const filteredItems = list.items.filter((item) => item.id != itemId); // Eliminar el item
        //console.log(`Lista actualizada: `, filteredItems);
        return { ...list, items: filteredItems };
      }
      return list; // Otras listas permanecen sin cambios
    });
  
    const updatedData = { ...data, lists: updatedLists };
    //console.log(`Datos actualizados después de la eliminación: `, updatedData);
  
    setData(updatedData); // Actualizar el estado
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData)); // Guardar cambios en localStorage
  };
  
  

  return (
    <DataContext.Provider value={{
      lists: data.lists.sort((a,b)=> {return b.id - a.id}),
      items: data.items,
      categories: data.categories,
      isDataLoaded: isDataLoaded,
      translations: currentTrans,
      addList,
      addItem,
      addCategory,
      addItemToList, 
      editItemFromList,
      deleteItemFromList,
      deleteListFromContext,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
