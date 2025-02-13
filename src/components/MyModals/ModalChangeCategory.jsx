import { useState } from 'react';
import ModalButton from '../ModalButton/ModalButton';
import { FiXCircle, FiTrash2, FiTag } from "react-icons/fi";
import Modal from './Modal';
import './Modal.css';
import styles from'./ModalChangeCategory.module.css';

export const ModalChangeCategory = ({ isOpen, onClose, categories, setCategories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [colores, setColores] = useState(["#FFDDC1", "#FFF9C4", "#C8E6C9", "#B2EBF2", "#D1C4E9", "#F8BBD0"]);

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateCategory = () => {
        if (newCategoryName.trim() === '') return;
        const newCategory = { name: newCategoryName, color: selectedColor };
        setCategories([...categories, newCategory]);
        setSelectedCategory(newCategory);
        setShowNewCategory(false);
        setNewCategoryName('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <p className='modal-content-paragraph'>Change category</p>
            
            <input className={styles.modalChangeCatInput}
                type="text" 
                placeholder="Buscar categoría" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul className={styles.modalChangeCatCategoriesDropdown}>
                {filteredCategories.map((category, index) => (
                    <li 
                        key={index} 
                        style={{ backgroundColor: colores[index] }}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <FiTag /> {category.name}
                    </li>
                ))}
            </ul>

            <label>
                Do you want to create a new category?
                <input 
                    type="checkbox" 
                    checked={showNewCategory} 
                    onChange={() => setShowNewCategory(!showNewCategory)}
                />
            </label>

            {showNewCategory && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Input a new category name" 
                        value={newCategoryName} 
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <div>
                        {colores.map(color => (
                            <button 
                                key={color} 
                                style={{ backgroundColor: color, border: selectedColor === color ? '2px solid black' : 'none' }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                    <button onClick={handleCreateCategory}>Create new category</button>
                </div>
            )}
            
            <div className="buttons-container">
                <ModalButton onClickHandler={onClose} text='Cancel'>
                    <FiXCircle />
                </ModalButton>
            </div>
        </Modal>
    );
};
