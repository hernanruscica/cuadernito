import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import NotebookSheet from "../NotebookSheet/NotebookSheet";
import ListItem from "./ListItem/ListItem";
import RowButtonInput from "../RowButtonInput/RowButtonInput";
import RowLabel from "../RowLabel/RowLabel";

import DeleteButton from "../Buttons/DeleteButton";

import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

import AddItemButton from "../AddItemButton/AddItemButton";
import { FiSave, FiRefreshCw } from 'react-icons/fi';
import SaveTemplateModal from "../SaveTemplateModal/SaveTemplateModal";

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
  const { lists, isDataLoaded, editList, addItemToList, editItemFromList, deleteListFromContext, deleteItemFromList, translations, categoriesColors, reorderItems, moveItemToCategory, moveItemsFromCategory, addToast, userSettings, userTemplates, updateUserTemplate } = useContext(DataContext);
  const { listId } = useParams();

  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(null);
  const [inputValueListName, setInputValueListName] = useState('');
  const inputEditListRef = useRef(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [groupCategoryModal, setGroupCategoryModal] = useState(null);

  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [categoryDropItem, setCategoryDropItem] = useState(null);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);

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

  const catName = (cat) => {
    const lang = userSettings.language || 'es';
    return lang === 'en' ? (cat.nameEn || cat.name) : cat.name;
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

  const handlerToggleChecked = (e) => {
    const parentDiv = e.currentTarget;
    const itemId = parentDiv.id;
    const wasChecked = currentList.items.find(item => item.id == itemId).checked;
    editItemFromList(listId, itemId, { checked: !wasChecked });
    addToast(wasChecked ? translations.toastItemUnchecked : translations.toastItemChecked);
  };

  const handleDeleteList = (e) => {
    e.preventDefault();
    setShowModalDelete(!showModalDelete);
  };

  const deleteList = () => {
    deleteListFromContext(listId);
    addToast(translations.toastListDeleted);
    navigate('/', { replace: true });
  };

  const listNameRef = useRef('');
  const handleChangeListName = (e) => {
    setInputValueListName(e.target.value);
  };

  const handleConfirmListName = () => {
    if (inputValueListName !== '' && inputValueListName !== listNameRef.current) {
      const updatedNameList = { ...currentList, name: inputValueListName };
      editList(currentList.id, updatedNameList);
      addToast(translations.toastListEdited);
      listNameRef.current = inputValueListName;
    }
  };

  const handleSaveItemName = (itemId, newName) => {
    editItemFromList(listId, itemId, { name: newName });
    addToast(translations.toastItemNameEdited);
  };

  const handleFocusListName = (e) => e.target.select();

  const handleKeyDownListName = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleDeleteItem = (itemId) => {
    setDeleteCandidateId(itemId);
  };

  const handleGroupCategoryClick = (category) => {
    setGroupCategoryModal(category);
  };

  const handleOpenSaveAsNew = () => {
    setShowSaveTemplateModal(true);
  };

  const handleSaveAsNewTemplate = (newTemplateId) => {
    editList(currentList.id, {
      templateId: newTemplateId,
      _originalCategories: JSON.parse(JSON.stringify(currentList.categories))
    });
  };

  const handleUpdateTemplate = () => {
    const template = userTemplates.find(t => t.id === currentList.templateId);
    if (!template) return;
    updateUserTemplate(currentList.templateId, {
      categories: currentList.categories.map(c => ({ ...c }))
    });
    editList(currentList.id, {
      _originalCategories: JSON.parse(JSON.stringify(currentList.categories))
    });
    addToast(translations.toastTemplateUpdated);
  };

  const handleGroupCategorySave = (selectedCategory) => {
    if (!groupCategoryModal || !currentList) return;
    const listCategories = currentList.categories || [];
    const sourceId = listCategories.some(c => c.id === groupCategoryModal.id)
      ? groupCategoryModal.id
      : 0;
    moveItemsFromCategory(listId, sourceId, selectedCategory.id);
    addToast(translations.toastCategoryChanged);
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
          addToast(translations.toastCategoryChanged);
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
      if (!foundList) {
        setCurrentList(null);
        return;
      }
      const orderedItems = [...foundList.items].sort((a, b) => (a.position ?? a.id) - (b.position ?? b.id));
      const listWithOrdenedItems = { ...foundList, items: orderedItems };
      setCurrentList(listWithOrdenedItems);
      setInputValueListName(foundList.name || "");
      listNameRef.current = foundList?.name || '';

      const isNewList = (foundList && isDataLoaded) ? (Date.now() - foundList.id) < 250 : false;
      if (isNewList) {
        addToast(translations.toastNewList);
      }
    }
  }, [isDataLoaded, lists, listId]);

  const groupedCategories = useMemo(() => {
    if (!currentList?.items || !currentList?.categories) return [];
    return currentList.categories.filter(cat =>
      currentList.items.some(item => item.categoryId === cat.id)
    );
  }, [currentList]);

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
          listCategories={currentList?.categories || []}
        />

        <ModalChangeCategory
          isOpen={!!categoryDropItem}
          onClose={() => setCategoryDropItem(null)}
          item={categoryDropItem}
          listId={listId}
          itemCategory={categoryDropItem ? (currentList?.categories || []).find(cat => cat.id === categoryDropItem.categoryId) : null}
          setItemCategory={() => {}}
          listCategories={currentList?.categories || []}
        />

        <RowButtonInput
          placeholder={translations.placeholderEditList}
          textValue={inputValueListName || ''}
          setTextValue={setInputValueListName}
          handleAction={handleChangeListName}
          ref={inputEditListRef}
          onFocus={handleFocusListName}
          onKeyDown={handleKeyDownListName}
          onBlur={handleConfirmListName}
        />
        <RowLabel text={currentList?.createdDate} info={`${currentList?.items?.length} items`}>
          <DeleteButton onClick={handleDeleteList} />
        </RowLabel>

        <SaveTemplateModal
          isOpen={showSaveTemplateModal}
          onClose={() => setShowSaveTemplateModal(false)}
          listCategories={currentList?.categories || []}
          currentTemplateId={null}
          onSaveAsNew={handleSaveAsNewTemplate}
        />

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
                    text={catName(category)}
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

        {(() => {
          const hasChanges = JSON.stringify(currentList?.categories) !==
                             JSON.stringify(currentList?._originalCategories);
          if (!hasChanges) return null;
          const existingTemplate = currentList?.templateId
            ? userTemplates.find(t => t.id === currentList.templateId)
            : null;
          if (!existingTemplate) {
            return (
              <div className={styles.saveRow}>
                <button className={styles.saveButton} onClick={handleOpenSaveAsNew}>
                  <FiSave /> {translations.saveAsNewTemplate}
                </button>
              </div>
            );
          }
          const lang = userSettings.language || 'es';
          const templateName = lang === 'en'
            ? (existingTemplate.nameEn || existingTemplate.name)
            : existingTemplate.name;
          return (
            <>
              <div className={styles.saveRow}>
                <button className={styles.updateButton} onClick={handleUpdateTemplate}>
                  <FiRefreshCw /> {translations.updateTemplate}: {templateName}
                </button>
              </div>
              <div className={styles.saveRow}>
                <button className={styles.saveButton} onClick={handleOpenSaveAsNew}>
                  <FiSave /> {translations.saveAsNewTemplate}
                </button>
              </div>
            </>
          );
        })()}
      </NotebookSheet>

      {!!activeId && (
        <div className={styles.dropZones}>
          <TrashDropZone show />
          <CategoryDropZone show />
        </div>
      )}
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
