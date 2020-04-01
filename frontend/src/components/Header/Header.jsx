import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';
import "./Header.scss";

function Header() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowModal(true);
  }
  const handleCloseModal = () => {
    setIsShowModal(false);
  }

  return (
    <header className="header">
      <div className="global-container">
        <ul className="header-items">
          <li className="header-item">
            <h1 className="logo">도트의 숲</h1>
          </li>
          <li className="header-item">
            <span className="header-button" onClick={handleOpenModal}>
              로그인
            </span>
          </li>
        </ul>
      </div>
      {isShowModal && <Modal title="제목" onClose={handleCloseModal} />}
    </header>
  )
}

export default Header
