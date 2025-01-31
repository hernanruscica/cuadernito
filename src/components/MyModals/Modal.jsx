
import "./Modal.css";
import { FiXCircle } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children }) => {

  return (
    <div className={`modal-backdrop ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${isOpen ? "slide-in" : "slide-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
            <FiXCircle onClick={onClose}/>
        </button>

        {children}        
        
      </div>
    </div>
  );
};

export default Modal;
