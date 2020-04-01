import React from 'react';
import './Modal.scss';

function Modal({ children, size, onClose }) {
  return (
    <div className="modal-wrapper">
      <div className={`modal ${size}`}>
        <div className="modal-content">
          {children}
        </div>
      </div>
      <div className="modal-dim" onClick={onClose} />
    </div>
  )
}

export default Modal
