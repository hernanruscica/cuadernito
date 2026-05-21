import React, { createContext, useState, useEffect } from 'react';
import defaultCategories from '../categories.json/';
import defaultCategoriesEng from '../categoriesEng.json/'; //no implemented yet, due the need to changed it in other components
import categoriesColors from '../categoriesColors.json';
import defaultThemes from '../themes.json';
import translationsSrc from '../translations.json';

const initialState = {
  lists: [],
  items: [],
  categories: defaultCategories,
  categoriesColors: categoriesColors,
  userSettings: {language: "es", themeId:0},
  themes: defaultThemes
};

const DataContext = createContext(initialState);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const localStorageDataName = 'cuadernito-data04';
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [translations, setTranslations] = useState(translationsSrc);
  const [locale, setLocale] = useState(initialState.userSettings.language);
  const [currentTrans, setCurrentTrans] = useState({});
  const [toasts, setToasts] = useState([]);
  const addToast = (message) => setToasts((prev) => [...prev, message]);
  const removeToast = (closedToast) => setToasts((prev) => prev.filter((t) => t !== closedToast)); 

  const migratePositions = (lists) => {
    let migrated = false;
    for (const list of lists) {
      const itemsByCategory = {};
      for (const item of list.items) {
        if (item.position === undefined) {
          migrated = true;
          const catId = item.categoryId ?? 0;
          if (!itemsByCategory[catId]) itemsByCategory[catId] = [];
          itemsByCategory[catId].push(item);
        }
      }
      if (migrated) {
        for (const catId in itemsByCategory) {
          itemsByCategory[catId]
            .sort((a, b) => b.id - a.id)
            .forEach((item, index) => { item.position = index; });
        }
      }
    }
    return migrated;
  };

  const reassignPositions = (items, categoryId) => {
    const categoryItems = items
      .filter(i => i.categoryId == categoryId)
      .sort((a, b) => a.position - b.position);
    categoryItems.forEach((item, index) => { item.position = index; });
  };

  useEffect(() => {
    setIsDataLoaded(false);
    const storedData = localStorage.getItem(localStorageDataName);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const needsMigration = migratePositions(parsedData.lists);
        if (needsMigration) {
          localStorage.setItem(localStorageDataName, JSON.stringify(parsedData));
        }
        setData(parsedData);        
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
    //console.log('additem', listId,newItem)
    const updatedLists = data.lists.map((list) =>
      list.id === listId
    ? { ...list, items: [...list.items, newItem] }
    : list
  );
  const updatedData = { ...data, lists: updatedLists };    
  //console.log(updatedData)
  setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editItemFromList = (listId, itemId, editedItem) => {
    let oldCategoryId = null;
    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.id == itemId) {
              oldCategoryId = item.categoryId;
              return { ...item, ...editedItem };
            }
            return item;
          }),
        };
      }
      return list;
    });

    if (oldCategoryId !== null && editedItem.categoryId !== undefined && oldCategoryId !== editedItem.categoryId) {
      const list = updatedLists.find(l => l.id == listId);
      if (list) {
        reassignPositions(list.items, oldCategoryId);
        reassignPositions(list.items, editedItem.categoryId);
      }
    }

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

  const editCategory = (categoryId, updatedFields) => {
    const updatedData = {
      ...data,
      categories: data.categories.map(cat =>
        cat.id === categoryId ? { ...cat, ...updatedFields } : cat
      ),
    };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const deleteCategory = (categoryId) => {
    const updatedLists = data.lists.map(list => ({
      ...list,
      items: list.items.map(item =>
        item.categoryId == categoryId
          ? { ...item, categoryId: 0 }
          : item
      ),
    }));
    updatedLists.forEach(list => {
      reassignPositions(list.items, 0);
      reassignPositions(list.items, categoryId);
    });
    const updatedData = {
      ...data,
      lists: updatedLists,
      categories: data.categories.filter(cat => cat.id !== categoryId),
    };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  /* DND FUNCTIONS: Reorder items and move items between categories */

  const reorderItems = (listId, activeId, overId) => {
    const updatedLists = data.lists.map((list) => {
      if (list.id != listId || activeId == overId) return list;

      const items = [...list.items];
      const activeItem = items.find(i => i.id == activeId);
      const overItem = items.find(i => i.id == overId);
      if (!activeItem || !overItem) return list;
      if (activeItem.categoryId != overItem.categoryId) return list;

      const categoryId = activeItem.categoryId;
      const sorted = items
        .filter(i => i.categoryId == categoryId)
        .sort((a, b) => a.position - b.position);

      const oldIdx = sorted.findIndex(i => i.id == activeId);
      const newIdx = sorted.findIndex(i => i.id == overId);

      sorted.splice(oldIdx, 1);
      sorted.splice(newIdx, 0, activeItem);
      sorted.forEach((item, index) => { item.position = index; });

      return { ...list, items };
    });

    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const moveItemToCategory = (listId, activeId, newCategoryId, overId) => {
    const updatedLists = data.lists.map((list) => {
      if (list.id != listId) return list;

      const items = [...list.items];
      const activeItem = items.find(i => i.id == activeId);
      if (!activeItem) return list;

      activeItem.categoryId = newCategoryId;

      reassignPositions(items, activeItem.categoryId);

      const newCategoryItems = items
        .filter(i => i.categoryId == newCategoryId)
        .sort((a, b) => a.position - b.position);

      const overIdx = overId
        ? newCategoryItems.findIndex(i => i.id == overId)
        : newCategoryItems.length;

      const reordered = newCategoryItems.filter(i => i.id != activeId);
      reordered.splice(overIdx, 0, activeItem);
      reordered.forEach((item, index) => { item.position = index; });

      return { ...list, items };
    });

    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const moveItemsFromCategory = (listId, fromCategoryId, toCategoryId) => {
    if (fromCategoryId === toCategoryId) return;

    const updatedLists = data.lists.map((list) => {
      if (list.id == listId) {
        return {
          ...list,
          items: list.items.map((item) => {
            if (item.categoryId == fromCategoryId) {
              return { ...item, categoryId: toCategoryId };
            }
            return item;
          }),
        };
      }
      return list;
    });

    const list = updatedLists.find(l => l.id == listId);
    if (list) {
      reassignPositions(list.items, fromCategoryId);
      reassignPositions(list.items, toCategoryId);
    }

    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  /* ENDS CRUD SECTION: For each action, each function update the context value and save it to the local storage  */

  return (
    <DataContext.Provider value={{
      lists: data.lists.sort((a,b)=> {return b.id - a.id}),
      items: data.items,
      categories: data.categories,
      categoriesColors: data.categoriesColors,
      isDataLoaded: isDataLoaded,
      translations: currentTrans,
      toasts,
      addToast,
      removeToast,
      userSettings: data.userSettings,
      themes: data.themes,
      addList,
      editList,
      addItem,
      addCategory,
      editCategory,
      deleteCategory,
      addItemToList, 
      editItemFromList,
      deleteItemFromList,
      deleteListFromContext,
      editUserSetting,
      reorderItems,
      moveItemToCategory,
      moveItemsFromCategory,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
