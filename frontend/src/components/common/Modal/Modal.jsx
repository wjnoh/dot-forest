import React from 'react';
import './Modal.scss';

function Modal({ children, width, minHeight, onClose }) {
  return (
    <div className="modal-wrapper">
      <div className="modal" style={{ width, minHeight }}>
        <div className="modal-content">
          {children}
        </div>
      </div>
      <div className="modal-dim" onClick={onClose} />
    </div>
  )
}

export default Modal
