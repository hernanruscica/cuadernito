import React, { createContext, useState, useEffect } from 'react';
import defaultCategories from '../categories.json/';

const initialState = {
  lists: [],
  items: [],
  categories: defaultCategories,
};

const DataContext = createContext(initialState);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState); // Use a single state for all data
  const localStorageDataName = 'cuadernito-data';
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
    setIsDataLoaded(true);
  }, []); // Run only once on mount

  const addList = (newList) => {
    const updatedData = { ...data, lists: [...data.lists, newList] };
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
  
  

  return (
    <DataContext.Provider value={{
      lists: data.lists.sort((a,b)=> {return b.id - a.id}),
      items: data.items,
      categories: data.categories,
      isDataLoaded: isDataLoaded,
      addList,
      addItem,
      addCategory,
      addItemToList, 
      editItemFromList,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
