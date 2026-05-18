import { useDroppable } from '@dnd-kit/core';
import styles from './HomeDropZone.module.css';
import { FiTrash2, FiExternalLink } from 'react-icons/fi';

function DroppableAction({ id, icon: Icon, label }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.action} ${isOver ? styles.actionOver : ''}`}
    >
      <Icon className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

function HomeDropZone({ show, activeId }) {
  if (!show) return null;

  return (
    <div className={styles.container}>
      <DroppableAction
        id="home-action-open"
        icon={FiExternalLink}
        label="Open"
      />
      <DroppableAction
        id="home-action-delete"
        icon={FiTrash2}
        label="Delete"
      />
    </div>
  );
}

export default HomeDropZone;
