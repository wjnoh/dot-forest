import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as userActionCreators from '../../store/actionCreators/user';
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActionCreators.fetchCurrentUser());
  }, [])
  
  return (
    <header className="header">
      <div className="global-container">
        <ul className="header-items">
          <li className="header-item">
            <Link to="/" className="logo">
              <h1>도트의 숲</h1>
            </Link>
          </li>
          <li className="header-item">
            <Link to="/auth" className="header-button">
              로그인
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
