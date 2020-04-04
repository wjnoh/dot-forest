import React, { useState } from 'react';
import './NewDotButton.scss';

function NewDotButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="new-dot-button" onClick={handleModalOpen} style={isModalOpen ? { right: '-60px' } : {}}>
      <span>&#43;</span>
    </div>
  )
}

export default NewDotButton
