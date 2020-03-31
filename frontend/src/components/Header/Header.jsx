import React from 'react';
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="global-container">
        <ul className="header-items">
          <li className="header-item">
            <span className="logo">도트의 숲</span>
          </li>
          <li className="header-item">
            <span className="header-button">
              로그인
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
