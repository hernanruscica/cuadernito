import ModalButton from '../ModalButton/ModalButton';
import DeleteButton from '../Buttons/DeleteButton';
import { FiXCircle } from "react-icons/fi";
import { FiTrash2   } from "react-icons/fi";
import Modal from './Modal';
import './Modal.css';


export const ModalConfirm = ({isOpen, onClose, title='confirm the action?', itemName='item name', onClickYes, onClickNot, yesText, notText}) => {
    return(     
        <Modal isOpen={isOpen} onClose={onClose} >            
            <p className='modal-content-paragraph'>
              {title} <br/><strong><em>{itemName}</em></strong>
            </p>
            <div className="buttons-container">              

              <ModalButton onClickHandler={onClose}
                text={notText || 'Cancel'} >                
                <FiXCircle /> 
              </ModalButton>

              <ModalButton onClickHandler={onClickYes}
                text={yesText || 'Yes'} >
                <FiTrash2  />
              </ModalButton>

            </div>
        </Modal>
    )
}