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
        <ul className="header-items">
          <li className="header-item">
            <Link to="/" className="logo">
              <h1>도트의 숲</h1>
            </Link>
          </li>
          <li className="header-item">
            { user
             ? <span className="header-button" onClick={handleSignOut}>로그아웃</span>
             : <Link to="/auth" className="header-button">로그인</Link>
            }
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
