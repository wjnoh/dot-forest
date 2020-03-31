import React from 'react';
import './Navigation.scss';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="global-container">
        <ul className="navigation-items">
          <li className="navigation-item">
            <a href="#" className="selected">전체</a>
          </li>
          <li className="navigation-item">
            <a href="#">모자</a>
          </li>
          <li className="navigation-item">
            <a href="#">상의</a>
          </li>
          <li className="navigation-item">
            <a href="#">하의</a>
          </li>
          <li className="navigation-item">
            <a href="#">원피스</a>
          </li>
          <li className="navigation-item">
            <a href="#">신발/양말</a>
          </li>
          <li className="navigation-item">
            <a href="#">액세서리</a>
          </li>
          <li className="navigation-item">
            <a href="#">우산</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
