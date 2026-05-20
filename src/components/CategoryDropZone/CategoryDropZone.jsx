import { useDroppable } from '@dnd-kit/core';
import styles from './CategoryDropZone.module.css';
import { FiTag } from 'react-icons/fi';

function CategoryDropZone({ show }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'category-dropzone' });

  if (!show) return null;

  return (
    <div
      ref={setNodeRef}
      className={`${styles.zone} ${isOver ? styles.over : ''}`}
    >
      <FiTag className={styles.icon} />
      <span className={styles.label}>Categoria</span>
    </div>
  );
}

export default CategoryDropZone;
