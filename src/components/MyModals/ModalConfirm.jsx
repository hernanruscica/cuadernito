

import Modal from './Modal';


export const ModalConfirm = ({isOpen, onClose, title='confirm the action?', itemName='item name', onClickYes, onClickNot, yesText, notText}) => {
    return(     
        <Modal isOpen={isOpen} onClose={onClose} style={{fontSize: "2em"}}>            
            <p style={{fontSize: "1.5em", textAlign: "center"}}>{title} <strong><em>{itemName}</em></strong></p>
            <div className="buttons-container">
              <button onClick={onClickNot} >
                <p  style={{fontSize: "1.5em"}}>{notText || 'Cancel'} </p>
              </button>
              <button onClick={onClickYes} >
              <p  style={{fontSize: "1.5em"}}>{yesText || 'Confirm'}  </p>               
              </button>
            </div>
        </Modal>
    )
}