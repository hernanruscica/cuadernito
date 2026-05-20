import { useState, useRef, useEffect } from "react";
import styles from "./ListItem.module.css";
import CheckButton from "../../Buttons/CheckButton";
import NoCheckButton from "../../Buttons/NoCheckButton";
import { FiMenu, FiTrash2 } from "react-icons/fi";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ListItem({ text, id, checked, toggleChecked, onSaveItemName, onDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const inputRef = useRef(null);
  const skipBlurRef = useRef(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = (e) => {
    e.preventDefault();
    setEditValue(text);
    setIsEditing(true);
  };

  const handleFinishEdit = () => {
    if (skipBlurRef.current) {
      skipBlurRef.current = false;
      return;
    }
    if (editValue.trim() !== "" && editValue !== text) {
      onSaveItemName(id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(text);
    setIsEditing(false);
  };

  const handleDeletePointerDown = (e) => {
    e.stopPropagation();
    skipBlurRef.current = true;
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    skipBlurRef.current = false;
    setIsEditing(false);
    onDeleteItem(id);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleFinishEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.listItem} ${checked ? styles.checked : ""}`}
      {...attributes}
      {...listeners}
    >
      <span className={styles.dragHandle}>
        <FiMenu />
      </span>

      {isEditing ? (
        <div className={`${styles.text} ${checked ? styles.checkedText : ""}`}>
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            onPointerDown={handleDeletePointerDown}
          >
            <FiTrash2 />
          </button>
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleFinishEdit}
            onKeyDown={handleKeyDown}
            onPointerDown={(e) => e.stopPropagation()}
            className={styles.editInput}
          />
        </div>
      ) : (
        <div
          className={`${styles.text} ${checked ? styles.checkedText : ""}`}
          onClick={handleStartEdit}
        >
          <p>{text}</p>
        </div>
      )}

      <div className={styles.checkbox} onClick={toggleChecked} id={id}>
        {checked ? <CheckButton /> : <NoCheckButton />}
      </div>
    </div>
  );
}

export default ListItem;
