

import Modal from './Modal';
import HeaderAppButton from '../HeaderApp/HeaderAppButton';
import DeleteButton from '../Buttons/DeleteButton';
import { FiXCircle } from "react-icons/fi";


export const ModalConfirm = ({isOpen, onClose, title='confirm the action?', itemName='item name', onClickYes, onClickNot, yesText, notText}) => {
    return(     
        <Modal isOpen={isOpen} onClose={onClose} style={{fontSize: "2em"}}>            
            <p style={{fontSize: "1.5em", textAlign: "center"}}>{title} <strong><em>{itemName}</em></strong></p>
            <div className="buttons-container">              

              <HeaderAppButton onClickHandler={onClickNot}
                text={notText || 'Cancel'} >
                <FiXCircle style={{width:"32px", height: "auto" }}/>
              </HeaderAppButton>

              <HeaderAppButton onClickHandler={onClickYes}
                text={yesText || 'Yes'} >
                <DeleteButton />
              </HeaderAppButton>

            </div>
        </Modal>
    )
}