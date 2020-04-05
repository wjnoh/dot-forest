import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import * as userActionCreators from '../../store/actionCreators/user';
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser, isEqual);

  useEffect(() => {
    dispatch(userActionCreators.fetchCurrentUser());
  }, [])

  const handleSignOut = () => {
    if(user) {
      dispatch(userActionCreators.signOut());
    }
  }
  
  return (
    <header className="header">
      <div className="global-container">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>도트의 숲</h1>
          </Link>
          <ul className="header-items">
            {
              user ? (
                <>
                  <li className="header-item">
                    <Link to="/auth" className="header-button">새 도트</Link>
                  </li>
                  <li className="header-item">
                    <span className="header-button" onClick={handleSignOut}>MY</span>
                  </li>
                </>
              ) : (
                <li className="header-item">
                  <Link to="/auth" className="header-button">로그인</Link>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
