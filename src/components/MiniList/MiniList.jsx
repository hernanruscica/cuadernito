import { Link } from 'react-router-dom';
import styles from './MiniList.module.css';
import { FiPlus } from "react-icons/fi";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const MiniList = ({ children, id, subtitle01 = 'empty', subtitle02 = '', onClick, type = 'default', textNewList }) => {
  const isNewList = type === 'newlist';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: id?.toString() ?? 'newlist',
    disabled: isNewList,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  if (isNewList) {
    return (
      <Link to={`/lists/${id}`} onClick={onClick}
        className={`${styles.mainScreenContainer} ${styles.newList}`}>
        <div className={styles.listHeader}>
          <div style={{ display: "Flex", alignItems: "center", justifyContent: "space-around", gap: "5px" }}>
            <span>{textNewList}</span>
            <FiPlus />
          </div>
        </div>
        <div className={styles.listSection}>
          {subtitle01} - <strong>{subtitle02}</strong>
        </div>
      </Link>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.wrapper}
      {...attributes}
      {...listeners}
    >
      <Link to={`/lists/${id}`} onClick={onClick} className={styles.mainScreenContainer}>
        <div className={styles.content}>
          <div className={styles.listHeader}>
            {children}
          </div>
          <div className={styles.listSection}>
            {subtitle01} - <strong>{subtitle02}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MiniList;
