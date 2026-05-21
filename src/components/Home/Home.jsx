import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from '../../context/DataContext';

import { GetNewName } from "../../utils/GetNewName";
import MiniList from "../MiniList/MiniList";
import styles from './Home.module.css';
import SearchNavBar from "../SearchNavBar/SearchNavBar";
import AddListButton from '../AddListButton/AddListButton';
import ModalSelectTemplate from '../ModalSelectTemplate/ModalSelectTemplate';

import plantillas from '../../plantillas.json';
import supermercadoCat from '../../supermercado-categorias.json';
import viajeCat from '../../viaje-categorias.json';
import tareasDiariasCat from '../../tareas-diarias-categorias.json';
import proyectoCat from '../../proyecto-categorias.json';
import limpiezaHogarCat from '../../limpieza-hogar-categorias.json';
import estudioCat from '../../estudio-categorias.json';
import eventoCat from '../../evento-categorias.json';
import mudanzaCat from '../../mudanza-categorias.json';
import oficinaCat from '../../oficina-categorias.json';
import habitosSaludCat from '../../habitos-salud-categorias.json';

const categoryFiles = {
  'supermercado-categorias.json': supermercadoCat,
  'viaje-categorias.json': viajeCat,
  'tareas-diarias-categorias.json': tareasDiariasCat,
  'proyecto-categorias.json': proyectoCat,
  'limpieza-hogar-categorias.json': limpiezaHogarCat,
  'estudio-categorias.json': estudioCat,
  'evento-categorias.json': eventoCat,
  'mudanza-categorias.json': mudanzaCat,
  'oficina-categorias.json': oficinaCat,
  'habitos-salud-categorias.json': habitosSaludCat,
};

import { ModalConfirm } from "../MyModals/ModalConfirm";

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core";
import HomeDropZone from "../HomeDropZone/HomeDropZone";

function Home() {
  const { lists, addList, deleteListFromContext, translations, addToast, userSettings } = useContext(DataContext);
  const navigate = useNavigate();
  const [searchInputText, setSearchInputText] = useState('');

  const [activeId, setActiveId] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchInputText)
  );

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  const handleAddNewList = (e) => {
    e.preventDefault();
    setShowTemplateModal(true);
  };

  const handleStartFromScratch = () => {
    const lang = userSettings.language || 'es';
    const genericTpl = plantillas[0];
    const baseName = lang === 'en' ? genericTpl.defaultNameEn : genericTpl.defaultName;
    const newName = GetNewName(baseName, lists.map(list => list.name), 99);
    if (newName === -1) {
      addToast(translations.toastNameRepeat);
      return;
    }
    const newList = {
      id: Date.now(),
      name: newName,
      items: [],
      createdDate: formatDate(new Date()),
      templateId: null,
      categories: [
        { id: 0, name: 'Sin categoría', nameEn: 'No category', colorId: '0' }
      ],
      _originalCategories: [
        { id: 0, name: 'Sin categoría', nameEn: 'No category', colorId: '0' }
      ],
    };
    addList(newList);
    navigate(`/lists/${newList.id}`);
  };

  const handleSelectTemplate = (tpl) => {
    const lang = userSettings.language || 'es';
    const baseName = lang === 'en' ? (tpl.defaultNameEn || tpl.nameEn) : (tpl.defaultName || tpl.name);
    const newName = GetNewName(baseName, lists.map(list => list.name), 99);
    if (newName === -1) {
      addToast(translations.toastNameRepeat);
      return;
    }
    let categories = [];

    if (tpl.categories) {
      categories = tpl.categories.map(cat => ({ ...cat }));
    } else if (tpl.filename) {
      const rawCategories = categoryFiles[tpl.filename] || [];
      categories = rawCategories.map(cat => ({ ...cat }));
    } else {
      categories = [
        { id: 0, name: 'Sin categoría', nameEn: 'No category', colorId: '0' }
      ];
    }

    const newList = {
      id: Date.now(),
      name: newName,
      items: [],
      createdDate: formatDate(new Date()),
      templateId: tpl.id,
      categories: categories,
      _originalCategories: JSON.parse(JSON.stringify(categories)),
    };
    addList(newList);
    navigate(`/lists/${newList.id}`);
  };

  const handleChangeInputText = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInputText(inputValue);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const list = lists.find(l => l.id.toString() === active.id);
    setActiveId(active.id);
    setActiveList(list);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      if (over.id === 'home-action-open') {
        navigate(`/lists/${active.id}`);
      } else if (over.id === 'home-action-delete') {
        setDeleteCandidateId(active.id);
        setShowDeleteConfirm(true);
      }
    }

    setActiveId(null);
    setActiveList(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveList(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidateId) {
      deleteListFromContext(deleteCandidateId);
      addToast(translations.toastListDeleted);
    }
    setDeleteCandidateId(null);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setDeleteCandidateId(null);
    setShowDeleteConfirm(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={styles.MiniListContainer}>
        <ModalConfirm
          isOpen={showDeleteConfirm}
          onClose={handleCancelDelete}
          itemName={activeList?.name || ''}
          title={translations.deleteListConfirmMsg}
          yesText={translations.deleteListYesText}
          notText={translations.deleteListNotText}
          onClickNot={handleCancelDelete}
          onClickYes={handleConfirmDelete}
        />

        <ModalSelectTemplate
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          onStartFromScratch={handleStartFromScratch}
          onSelectTemplate={handleSelectTemplate}
        />
        <SearchNavBar value={searchInputText} onChange={handleChangeInputText} listsQty={filteredLists?.length} />
        <AddListButton
          textNewList={translations.listName}
          onClick={handleAddNewList} />

        {filteredLists.length > 0 ? (
          filteredLists.map((list, index) => (
            <MiniList id={list.id}
              subtitle01={list.createdDate}
              subtitle02={`${list.items.length} items`}
              key={`list_${index}_${list.id}`}>
              <span>{list.name}</span>
            </MiniList>
          ))
        ) : null}
      </div>

      <HomeDropZone show={!!activeId} activeId={activeId} />
      <DragOverlay dropAnimation={null}>
        {activeList ? (
          <div className={styles.dragOverlayList}>
            <span>{activeList.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Home;
