import styles from "./ListItem.module.css";
import CheckButton from "../../Buttons/CheckButton";
import NoCheckButton from "../../Buttons/NoCheckButton";
import MoreButton from "../../Buttons/MoreButton";
import { FiMenu } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ListItem({ text, url, id, checked, toggleChecked, handleView = null }) {
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

      <Link
        id={id}
        to={url}
        onClick={handleView}
        className={`${styles.text} ${checked ? styles.checkedText : ""}`}
      >
        <MoreButton />
        <p>{text}</p>
      </Link>
      <div className={styles.checkbox} onClick={toggleChecked} id={id}>
        {checked ? <CheckButton /> : <NoCheckButton />}
      </div>
    </div>
  );
}

export default ListItem;
