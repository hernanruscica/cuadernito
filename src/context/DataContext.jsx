import React, { createContext, useState, useEffect } from 'react';
import defaultCategories from '../categories.json/';
import defaultThemes from '../themes.json';
import translationsSrc from '../translations.json';

const initialState = {
  lists: [],
  items: [],
  categories: defaultCategories,
  userSettings: {language: "es", themeId:0},
  themes: defaultThemes
};

const DataContext = createContext(initialState);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState); // Use a single state for all data
  const localStorageDataName = 'cuadernito-data';
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [translations, setTranslations] = useState(translationsSrc);
  const [locale, setLocale] = useState(initialState.userSettings.language);
  const [currentTrans, setCurrentTrans] = useState({}); 

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
    setCurrentTrans(translations[locale] || translations);        
    setIsDataLoaded(true);
  }, [locale]);

  /* STARTS CRUD SECTION: For each action, each function update the context value and save it to the local storage  */

  const addList = (newList) => {
    const updatedData = { ...data, lists: [...data.lists, newList] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData)); // Save changes on local storage
  };

  const editList = (listId, updatedListData) => {
    const updatedLists = data.lists.map((list) =>
      list.id == listId
        ? { ...list, ...updatedListData } // Update the list with the found id
        : list
    );  
    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData)); // Save changes on local storage
  };  

  const deleteListFromContext = (listId) => {
    const updatedData = {
      ...data,
      lists: data.lists.filter(list => list.id != listId), 
    };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };  

  const addItem = (newItem) => {
    const updatedData = { ...data, items: [...data.items, newItem] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };
  
  const addItemToList = (listId, newItem) => {
    const updatedLists = data.lists.map((list) =>
      list.id === listId
    ? { ...list, items: [...list.items, newItem] }
    : list
  );
  const updatedData = { ...data, lists: updatedLists };    
  setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editItemFromList = (listId, itemId, editedItem) => {    
    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {        
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.id == itemId) {              
              return { ...item, ...editedItem }; // Update ítem
            }
            return item;
          }),
        };
      }
      return list;
    });      
    const updatedData = { ...data, lists: updatedLists };    
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const deleteItemFromList = (listId, itemId) => {        
    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {
        const filteredItems = list.items.filter((item) => item.id != itemId); // Delete item        
        return { ...list, items: filteredItems };
      }
      return list; // Other lists remains the same
    });  
    const updatedData = { ...data, lists: updatedLists };  
    setData(updatedData); // Update data state
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData)); // Save changes on local storage
  };
  
  const editUserSetting = (updatedSettings) => {
    const updatedData = {
      ...data,
      userSettings: {
        ...data.userSettings, // Keep the current data 
        ...updatedSettings,   // Override the incomming changes
      },
    };  
    setLocale(updatedSettings.language);
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };  
  
  const addCategory = (newCategory) => {
    const updatedData = { ...data, categories: [...data.categories, newCategory] };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  /* ENDS CRUD SECTION: For each action, each function update the context value and save it to the local storage  */

  return (
    <DataContext.Provider value={{
      lists: data.lists.sort((a,b)=> {return b.id - a.id}),
      items: data.items,
      categories: data.categories,
      isDataLoaded: isDataLoaded,
      translations: currentTrans,
      userSettings: data.userSettings,
      themes: data.themes,
      addList,
      editList,
      addItem,
      addCategory,
      addItemToList, 
      editItemFromList,
      deleteItemFromList,
      deleteListFromContext,
      editUserSetting,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
