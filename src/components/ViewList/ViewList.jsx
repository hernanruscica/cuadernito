import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
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

import { ModalChangeCategory } from "../MyModals/ModalChangeCategory";
import { ModalConfirm } from "../MyModals/ModalConfirm";
import CategoryTag from "../CategoryTag/CategoryTag";
import { RowNormal } from "../RowNormal/RowNormal";

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TrashDropZone from "../TrashDropZone/TrashDropZone";
import CategoryDropZone from "../CategoryDropZone/CategoryDropZone";
import styles from "./ViewList.module.css";

function ViewList() {
  const { lists, isDataLoaded, editList, addItemToList, editItemFromList, deleteListFromContext, deleteItemFromList, translations, categories, categoriesColors, reorderItems, moveItemToCategory, moveItemsFromCategory } = useContext(DataContext);
  const { listId } = useParams();

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
  const [groupCategoryModal, setGroupCategoryModal] = useState(null);

  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [categoryDropItem, setCategoryDropItem] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() === "") {
      addToast(translations.emptyItemConfirmMsg);
      return;
    }
    const listId = currentList.id;
    const uncategorizedItems = currentList.items.filter(i => i.categoryId == 0);
    const maxPosition = uncategorizedItems.length > 0
      ? Math.max(...uncategorizedItems.map(i => i.position ?? 0))
      : -1;
    const newItem = {
      id: Date.now(),
      name: inputValue,
      categoryId: 0,
      position: maxPosition + 1,
      note: translations.placeholderNote,
      checked: false,
      photo: '',
    };
    addItemToList(listId, newItem);
    setInputValue("");
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
  };

  const deleteList = () => {
    deleteListFromContext(listId);
    navigate(`/?toast=${translations.toastListDeleted}`);
  };

  const handleEditList = () => {
    if (inputEditListRef.current) {
      inputEditListRef.current.focus();
      inputEditListRef.current.select();
    }
  };

  const handlerConfirmEditListName = (e) => {
    setInputValueListName(e.target.value);
    const updatedNameList = {
      ...currentList,
      name: e.target.value
    };
    if (e.target.value !== null && e.target.value !== '') {
      editList(currentList.id, updatedNameList);
    }
  };

  const handleSaveItemName = (itemId, newName) => {
    editItemFromList(listId, itemId, { name: newName });
  };

  const handleDeleteItem = (itemId) => {
    setDeleteCandidateId(itemId);
  };

  const handleGroupCategoryClick = (category) => {
    setGroupCategoryModal(category);
  };

  const handleGroupCategorySave = (selectedCategory) => {
    if (!groupCategoryModal) return;
    moveItemsFromCategory(listId, groupCategoryModal.id, selectedCategory.id);
    setGroupCategoryModal(null);
  };

  const handleCloseModalConfirm = (e) => {
    e.preventDefault();
    setShowModalDelete(false);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    const item = currentList.items.find(i => i.id.toString() === active.id);
    setActiveItem(item);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'trash-dropzone') {
      setDeleteCandidateId(active.id);
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    if (over && over.id === 'category-dropzone') {
      setCategoryDropItem(activeItem);
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    if (over && active.id !== over.id) {
      const activeItemData = currentList.items.find(i => i.id.toString() === active.id);
      const overItemData = currentList.items.find(i => i.id.toString() === over.id);

      if (activeItemData && overItemData) {
        if (activeItemData.categoryId === overItemData.categoryId) {
          reorderItems(listId, active.id, over.id);
        } else {
          moveItemToCategory(listId, active.id, overItemData.categoryId, over.id);
        }
      }
    }

    setActiveId(null);
    setActiveItem(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
    setDeleteCandidateId(null);
  };

  const handleConfirmDeleteFromTrash = () => {
    if (deleteCandidateId) {
      deleteItemFromList(listId, deleteCandidateId);
      addToast(translations.toastItemDeleted);
    }
    setDeleteCandidateId(null);
  };

  const handleCancelDeleteFromTrash = () => {
    setDeleteCandidateId(null);
  };

  useEffect(() => {
    if (isDataLoaded) {
      const foundList = lists.find((list) => list.id == listId);
      const orderedItems = foundList
        ? [...foundList.items].sort((a, b) => (a.position ?? a.id) - (b.position ?? b.id))
        : null;
      const listWithOrdenedItems = {
        ...foundList,
        items: orderedItems
      };
      setCurrentList(listWithOrdenedItems || "");
      setInputValueListName(foundList?.name || "");

      const isNewList = (foundList && isDataLoaded) ? (Date.now() - foundList.id) < 250 : false;
      if (isNewList) {
        addToast(translations.toastNewList);
      }
    }
  }, [isDataLoaded, lists, listId]);

  useEffect(() => {
    if (toastMessage) {
      addToast(toastMessage);
    }
  }, []);

  const groupedCategories = useMemo(() => {
    if (!currentList?.items) return [];
    return categories.filter(cat =>
      currentList.items.some(item => item.categoryId === cat.id)
    );
  }, [currentList, categories]);

  if (!currentList) {
    return <div>Cargando...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <NotebookSheet>
        <Toast messages={toasts} onClose={handleToastClose} />
        <ModalConfirm
          isOpen={showModalDelete}
          onClose={handleCloseModalConfirm}
          itemName={`"${currentList?.name}"`}
          title={translations.deleteListConfirmMsg}
          yesText={translations.deleteListYesText}
          notText={translations.deleteListNotText}
          onClickNot={handleCloseModalConfirm}
          onClickYes={deleteList}
        />
        <ModalConfirm
          isOpen={!!deleteCandidateId}
          onClose={handleCancelDeleteFromTrash}
          itemName={currentList.items.find(i => i.id.toString() === deleteCandidateId)?.name || ''}
          title={translations.deleteItemConfirmMsg}
          yesText={translations.deleteItemYesText}
          notText={translations.deleteItemNotText}
          onClickNot={handleCancelDeleteFromTrash}
          onClickYes={handleConfirmDeleteFromTrash}
        />

        <ModalChangeCategory
          isOpen={!!groupCategoryModal}
          onClose={() => setGroupCategoryModal(null)}
          item={null}
          listId={listId}
          itemCategory={groupCategoryModal}
          setItemCategory={() => {}}
          onSave={handleGroupCategorySave}
        />

        <ModalChangeCategory
          isOpen={!!categoryDropItem}
          onClose={() => setCategoryDropItem(null)}
          item={categoryDropItem}
          listId={listId}
          itemCategory={categoryDropItem ? categories.find(cat => cat.id === categoryDropItem.categoryId) : null}
          setItemCategory={() => {}}
        />

        <RowButtonInput
          placeholder={translations.placeholderEditList}
          button={<EditButton onClick={handleEditList} />}
          textValue={inputValueListName || ''}
          setTextValue={setInputValueListName}
          handleAction={handlerConfirmEditListName}
          ref={inputEditListRef}
        />
        <RowLabel text={currentList?.createdDate} info={`${currentList?.items?.length} items`}>
          <DeleteButton onClick={handleDeleteList} />
        </RowLabel>

        <AddItemButton
          placeholder={translations.placeholderNewItem}
          value={inputValue}
          onChange={handleInputChange}
          onAdd={handleAddItem}
        />

        {currentList && currentList.items?.length > 0 ? (
          groupedCategories.map(category => {
            const itemsInCategory = currentList.items
              .filter(item => item.categoryId === category.id)
              .sort((a, b) => a.position - b.position);
            if (itemsInCategory.length === 0) return null;
            return (
              <div key={category.id}>
                <RowNormal>
                  <CategoryTag
                    text={category.name}
                    color={categoriesColors[category.colorId] || '#fff'}
                    onClick={() => handleGroupCategoryClick(category)}
                  />
                </RowNormal>
                <SortableContext
                  items={itemsInCategory.map(i => i.id.toString())}
                  strategy={verticalListSortingStrategy}
                >
                    {itemsInCategory.map(item => (
                      <ListItem
                        text={item.name}
                        key={item.id}
                        id={item.id}
                        checked={item.checked}
                        toggleChecked={handlerToggleChecked}
                        onSaveItemName={handleSaveItemName}
                        onDeleteItem={handleDeleteItem}
                      />
                    ))}
                </SortableContext>
              </div>
            );
          })
        ) : currentList ? (
          <RowLabel text={translations.noItemMessage} />
        ) : null}
      </NotebookSheet>

      <CategoryDropZone show={!!activeId} />
      <TrashDropZone show={!!activeId} />
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <div className={styles.dragOverlayItem}>
            <span>{activeItem.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default ViewList;
