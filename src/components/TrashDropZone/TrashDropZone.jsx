import { useDroppable } from '@dnd-kit/core';
import styles from './TrashDropZone.module.css';
import { FiTrash2 } from 'react-icons/fi';

function TrashDropZone({ show }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'trash-dropzone' });

  if (!show) return null;

  return (
    <div
      ref={setNodeRef}
      className={`${styles.trashZone} ${isOver ? styles.over : ''}`}
    >
      <FiTrash2 className={styles.icon} />
      <span className={styles.label}>Eliminar</span>
    </div>
  );
}

export default TrashDropZone;
