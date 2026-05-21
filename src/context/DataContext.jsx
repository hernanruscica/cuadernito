import React, { createContext, useState, useEffect } from 'react';
import categoriesColors from '../categoriesColors.json';
import defaultThemes from '../themes.json';
import translationsSrc from '../translations.json';

const initialState = {
  lists: [],
  items: [],
  categoriesColors: categoriesColors,
  userSettings: {language: "es", themeId:0},
  themes: defaultThemes,
  userTemplates: []
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

  const migrateListCategories = (lists) => {
    return lists.map(list => {
      if (!list.categories || !list.templateId) {
        return {
          ...list,
          templateId: list.templateId ?? null,
          categories: list.categories || [
            { id: 0, name: 'Sin categoría', nameEn: 'No category', colorId: '0' }
          ]
        };
      }
      return list;
    });
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
        parsedData.lists = migrateListCategories(parsedData.lists);
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
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editList = (listId, updatedListData) => {
    setData(prev => {
      const updatedLists = prev.lists.map((list) =>
        list.id == listId
          ? { ...list, ...updatedListData }
          : list
      );
      const updatedData = { ...prev, lists: updatedLists };
      localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
      return updatedData;
    });
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
        const filteredItems = list.items.filter((item) => item.id != itemId);
        return { ...list, items: filteredItems };
      }
      return list;
    });
    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editUserSetting = (updatedSettings) => {
    const updatedData = {
      ...data,
      userSettings: {
        ...data.userSettings,
        ...updatedSettings,
      },
    };
    setLocale(updatedSettings.language);
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const addUserTemplate = (template) => {
    setData(prev => {
      const updatedData = { ...prev, userTemplates: [...(prev.userTemplates || []), template] };
      localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const updateUserTemplate = (templateId, updatedFields) => {
    setData(prev => {
      const updatedData = {
        ...prev,
        userTemplates: (prev.userTemplates || []).map(tpl =>
          tpl.id === templateId ? { ...tpl, ...updatedFields } : tpl
        ),
      };
      localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const addListCategory = (listId, newCategory) => {
    const updatedLists = data.lists.map(list => {
      if (list.id != listId) return list;
      return {
        ...list,
        categories: [...(list.categories || []), newCategory]
      };
    });
    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const editListCategory = (listId, categoryId, updatedFields) => {
    const updatedLists = data.lists.map(list => {
      if (list.id != listId) return list;
      return {
        ...list,
        categories: (list.categories || []).map(cat =>
          cat.id === categoryId ? { ...cat, ...updatedFields } : cat
        )
      };
    });
    const updatedData = { ...data, lists: updatedLists };
    setData(updatedData);
    localStorage.setItem(localStorageDataName, JSON.stringify(updatedData));
  };

  const deleteListCategory = (listId, categoryId) => {
    const updatedLists = data.lists.map(list => {
      if (list.id != listId) return list;
      const updatedItems = (list.items || []).map(item =>
        item.categoryId == categoryId
          ? { ...item, categoryId: 0 }
          : item
      );
      reassignPositions(updatedItems, 0);
      reassignPositions(updatedItems, categoryId);
      return {
        ...list,
        items: updatedItems,
        categories: (list.categories || []).filter(cat => cat.id !== categoryId)
      };
    });
    const updatedData = { ...data, lists: updatedLists };
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

  /* ENDS CRUD SECTION */

  return (
    <DataContext.Provider value={{
      lists: data.lists.sort((a,b)=> {return b.id - a.id}),
      items: data.items,
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
      addItemToList,
      editItemFromList,
      deleteItemFromList,
      deleteListFromContext,
      editUserSetting,
      reorderItems,
      moveItemToCategory,
      moveItemsFromCategory,
      addListCategory,
      editListCategory,
      deleteListCategory,
      userTemplates: data.userTemplates || [],
      addUserTemplate,
      updateUserTemplate,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
